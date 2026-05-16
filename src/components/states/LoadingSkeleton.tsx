"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

export function LoadingSkeleton({ rows = 8 }: { rows?: number }) {
  const { t } = useI18n();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-card shadow-card"
    >
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
        <span className="size-4 spin rounded-full border-2 border-line-2 border-t-brand" />
        <span className="text-sm font-medium text-muted">
          {t.states.loading}
        </span>
      </div>
      <div>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-2 gap-5 border-b border-line px-5 py-5 last:border-b-0 lg:grid-cols-[1.1fr_1.1fr_0.9fr_1.1fr_1.1fr_1.1fr]"
          >
            <Block lines={[55, 78]} />
            <Block lines={[55, 78]} />
            <Block lines={[60]} />
            <Block lines={[70, 50]} />
            <Block lines={[80, 55]} />
            <div className="flex items-center gap-3">
              <span className="skeleton size-9 !rounded-full" />
              <Block lines={[70, 45]} className="flex-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Block({
  lines,
  className = "",
}: {
  lines: number[];
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {lines.map((w, i) => (
        <div key={i} className="skeleton h-3.5" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}
