/**
 * chat-availability.ts — Horario real de atencion humana.
 *
 * Los datos salen del RAG del bot (lunes a viernes 9:00-18:00, hora de Mazatlan), asi que el
 * widget y el bot dicen lo mismo. Se calcula en la zona del NEGOCIO, no en la del visitante:
 * a alguien en Madrid le da igual que en su reloj sean las 5 de la tarde.
 *
 * El bot responde 24/7; esto solo decide si hay humanos despiertos.
 */

const TZ = "America/Mazatlan";
const ABRE = 9; // 9:00
const CIERRA = 18; // 18:00
const DIAS_HABILES = [1, 2, 3, 4, 5]; // lunes a viernes

interface HoraLocal {
  dia: number; // 0 = domingo
  hora: number;
}

function horaEnMazatlan(now: Date): HoraLocal {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);

  const dias: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const weekday = partes.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hourRaw = partes.find((p) => p.type === "hour")?.value ?? "0";

  // Intl puede devolver "24" a la medianoche segun el motor.
  const hora = Number(hourRaw) % 24;

  return { dia: dias[weekday] ?? 1, hora };
}

export function hayHumanos(now: Date = new Date()): boolean {
  const { dia, hora } = horaEnMazatlan(now);
  return DIAS_HABILES.includes(dia) && hora >= ABRE && hora < CIERRA;
}

/** Cuando vuelve a haber alguien. Devuelve una clave de i18n, no texto: el widget es bilingue. */
export type ClaveVuelta = "ahora" | "hoy" | "manana" | "lunes";

export function cuandoVuelven(now: Date = new Date()): ClaveVuelta {
  const { dia, hora } = horaEnMazatlan(now);
  if (hayHumanos(now)) return "ahora";
  if (DIAS_HABILES.includes(dia) && hora < ABRE) return "hoy";
  // viernes despues de hora, sabado o domingo => el lunes
  if (dia === 5 || dia === 6 || dia === 0) return "lunes";
  return "manana";
}
