export type LeadInput = {
  name: string;
  email?: string;
  company?: string;
  message: string;
};

export async function sendTelegramLead(lead: LeadInput): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[telegram] faltan TELEGRAM_BOT_TOKEN/CHAT_ID; se omite notificación");
    return;
  }

  const text =
    `🟦 *Nuevo lead — jeshuasoftware.com*\n\n` +
    `*Nombre:* ${lead.name}\n` +
    (lead.email ? `*Correo:* ${lead.email}\n` : "") +
    (lead.company ? `*Empresa:* ${lead.company}\n` : "") +
    `*Mensaje:* ${lead.message}`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
  if (!res.ok) {
    console.error("[telegram] sendMessage falló:", res.status, await res.text());
  }
}
