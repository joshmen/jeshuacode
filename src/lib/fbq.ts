type FbqOptions = { eventID?: string };

export function fbqTrack(
  event: string,
  params?: Record<string, unknown>,
  options?: FbqOptions,
): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (typeof w.fbq !== "function") return;
  if (options) w.fbq("track", event, params ?? {}, options);
  else w.fbq("track", event, params ?? {});
}
