interface LmntlEmblemProps {
  className?: string;
  labelled?: boolean;
}

/** Geometric Earth, Air, Fire, Water emblem with the artist at its center. */
export default function LmntlEmblem({
  className = '',
  labelled = false,
}: LmntlEmblemProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role={labelled ? 'img' : undefined}
      aria-label={
        labelled
          ? 'LMNTL Studios emblem representing Earth, Air, Fire, Water, and the artist as the fifth element'
          : undefined
      }
      aria-hidden={labelled ? undefined : true}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2.25" vectorEffect="non-scaling-stroke">
        {/* Earth — inverted triangle with horizon */}
        <path d="M38 42h66L71 99 38 42Z" />
        <path d="M48 60h46" opacity="0.72" />

        {/* Air — upright triangle with horizon */}
        <path d="M136 99h66l-33-57-33 57Z" />
        <path d="M146 78h46" opacity="0.72" />

        {/* Water — inverted triangle */}
        <path d="M136 141h66l-33 57-33-57Z" />

        {/* Fire — upright triangle */}
        <path d="M38 198h66l-33-57-33 57Z" />
      </g>

      {/* Fifth element — the artist */}
      <path
        d="m120 96 24 24-24 24-24-24 24-24Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="m120 105 15 15-15 15-15-15 15-15Z"
        fill="#0b0b0a"
      />
      <circle cx="120" cy="120" r="3.5" fill="currentColor" />
    </svg>
  );
}
