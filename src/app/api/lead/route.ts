import { NextResponse } from "next/server";
import { sendTelegramLead, type LeadInput } from "@/lib/telegram";
import { sendLeadEvent } from "@/lib/meta-capi";

// Límites de tamaño (evitan payloads gigantes / abuso).
const MAX_NAME = 120;
const MAX_EMAIL = 160;
const MAX_COMPANY = 160;
const MAX_MESSAGE = 4000;

// Tiempo mínimo verosímil para que un humano llene el formulario.
const MIN_FILL_MS = 2500;

// Rate-limit en memoria por IP (best-effort mientras la instancia sigue caliente).
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 min
const RATE_MAX = 4; // envíos permitidos por IP dentro de la ventana
const hits = new Map<string, number[]>();

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Limpieza ocasional para que el Map no crezca sin límite.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX;
}

export async function POST(req: Request) {
  let body: Partial<LeadInput> & {
    event_id?: string;
    website?: string;
    elapsed_ms?: number;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // 1) Honeypot: el campo trampa solo lo llena un bot. Fingimos éxito para no delatarlo.
  if ((body.website ?? "").toString().trim() !== "") {
    console.warn("[lead] descartado por honeypot");
    return NextResponse.json({ ok: true });
  }

  // 2) Time-trap: enviado demasiado rápido para ser un humano real.
  const elapsed = Number(body.elapsed_ms ?? 0);
  if (elapsed > 0 && elapsed < MIN_FILL_MS) {
    console.warn(`[lead] descartado por time-trap (${elapsed}ms)`);
    return NextResponse.json({ ok: true });
  }

  // 3) Rate-limit por IP (frena ráfagas del mismo origen).
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const name = (body.name ?? "").toString().trim();
  const message = (body.message ?? "").toString().trim();
  if (!name || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  // 4) Límites de tamaño.
  if (
    name.length > MAX_NAME ||
    message.length > MAX_MESSAGE ||
    (body.email ?? "").toString().length > MAX_EMAIL ||
    (body.company ?? "").toString().length > MAX_COMPANY
  ) {
    return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });
  }

  const lead: LeadInput = {
    name,
    message,
    email: body.email?.toString().trim() || undefined,
    company: body.company?.toString().trim() || undefined,
  };
  const eventId = (body.event_id ?? crypto.randomUUID()).toString();
  const sourceUrl = req.headers.get("referer") ?? "https://jeshuasoftware.com/";

  await Promise.allSettled([
    sendTelegramLead(lead),
    sendLeadEvent(lead, eventId, sourceUrl),
  ]);

  return NextResponse.json({ ok: true });
}
