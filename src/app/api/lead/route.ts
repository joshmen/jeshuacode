import { NextResponse } from "next/server";
import { sendTelegramLead, type LeadInput } from "@/lib/telegram";
import { sendLeadEvent } from "@/lib/meta-capi";

export async function POST(req: Request) {
  let body: Partial<LeadInput> & { event_id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim();
  const message = (body.message ?? "").toString().trim();
  if (!name || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
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
