interface DecorProps {
  variant?: "hero" | "section";
  className?: string;
}

/**
 * Decoración geométrica ligera: círculos outline, signos "+" y un blob suave
 * en azul de marca. Puramente decorativa (aria-hidden, sin interacción).
 * Sin dependencias: SVG inline.
 */
export default function Decor({ variant = "section", className = "" }: DecorProps) {
  const accent = "#4285F4";
  const isHero = variant === "hero";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 400 400"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Blob suave */}
        <circle
          cx={isHero ? 320 : 340}
          cy={isHero ? 90 : 70}
          r={isHero ? 150 : 110}
          fill={accent}
          opacity={isHero ? 0.16 : 0.07}
        />
        {isHero && (
          <circle cx={70} cy={330} r={120} fill={accent} opacity={0.1} />
        )}

        {/* Círculos outline */}
        <circle
          cx={64}
          cy={72}
          r={26}
          stroke={accent}
          strokeWidth={2}
          opacity={isHero ? 0.5 : 0.28}
        />
        <circle
          cx={344}
          cy={300}
          r={16}
          stroke={accent}
          strokeWidth={2}
          opacity={isHero ? 0.45 : 0.24}
        />

        {/* Signos "+" */}
        <g stroke={accent} strokeWidth={2} strokeLinecap="round" opacity={isHero ? 0.55 : 0.3}>
          <path d="M300 60 v18 M291 69 h18" />
          <path d="M120 330 v14 M113 337 h14" />
          {isHero && <path d="M40 180 v14 M33 187 h14" />}
        </g>
      </svg>
    </div>
  );
}
