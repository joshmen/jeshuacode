import { createHash } from "node:crypto";
import type { LeadInput } from "./telegram";

const API_VERSION = "v21.0";

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function sendLeadEvent(
  lead: LeadInput,
  eventId: string,
  sourceUrl: string,
): Promise<void> {
  const pixelId = process.env.META_CAPI_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) {
    console.warn("[capi] faltan META_CAPI_PIXEL_ID/TOKEN; se omite evento server-side");
    return;
  }

  const userData: Record<string, string[]> = {};
  if (lead.email) userData.em = [sha256(lead.email)];

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: sourceUrl,
        user_data: userData,
      },
    ],
  };

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!res.ok) {
    console.error("[capi] evento Lead falló:", res.status, await res.text());
  }
}
