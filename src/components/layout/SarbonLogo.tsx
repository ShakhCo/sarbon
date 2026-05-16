export function SarbonLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M16 1.7 28.4 8.85v14.3L16 30.3 3.6 23.15V8.85L16 1.7Z"
          fill="#2F6BFF"
        />
        <path
          d="M20.4 11.6c-1.2-1.1-3-1.8-4.8-1.8-2.8 0-4.9 1.5-4.9 3.8 0 5 8.3 3 8.3 6 0 1-1.1 1.7-2.6 1.7-1.7 0-3.2-.8-4.2-1.9"
          stroke="#fff"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M21.6 19.2c.9 1.6.5 3.6-1 4.9"
          stroke="#27D17F"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[19px] font-extrabold lowercase tracking-tight text-brand">
        sar<span className="text-green-strong">bon</span>
      </span>
    </span>
  );
}
