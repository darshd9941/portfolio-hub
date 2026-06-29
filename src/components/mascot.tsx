export function Mascot({ className = "" }: { className?: string }) {
  return (
    <div className={`null-mascot ${className}`} aria-label="Null, Darsh's faceless studio mascot">
      <svg viewBox="0 0 260 300" role="img" aria-hidden="true">
        <path className="null-shadow" d="M53 267c25-17 130-20 161 2-18 20-133 25-161-2Z" />
        <path className="null-arm null-arm-left" d="M74 139C39 151 29 186 46 211" />
        <path className="null-arm null-arm-right" d="M187 140c35 8 47 43 31 69" />
        <path className="null-body" d="M91 47c33-26 80-8 95 31 13 33 17 118-8 161-22 38-83 39-108 2-27-39-25-128-8-168 6-13 15-21 29-26Z" />
        <path className="null-highlight" d="M103 58c-25 20-29 126-8 165" />
        <path className="null-leg" d="M102 231 91 266" />
        <path className="null-leg" d="m157 234 12 32" />
        <path className="null-shoe" d="M55 270c12-10 25-13 39-7l17 14c-17 10-45 10-56-7Z" />
        <path className="null-shoe" d="M151 277c13-13 25-17 39-10l16 10c-11 11-39 13-55 0Z" />
        <path className="null-playhead" d="m205 82 31 18-31 18Z" />
        <path className="null-playhead-line" d="M205 117v92" />
      </svg>
      <span className="null-label">NULL / studio assistant</span>
    </div>
  );
}
