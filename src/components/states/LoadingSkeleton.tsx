"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

/** Skeleton that mirrors the table/card layout while the API is loading. */
export function LoadingSkeleton({ rows = 8 }: { rows?: number }) {
  const { t } = useI18n();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="border border-line bg-surface"
    >
      <div className="flex items-center gap-3 border-b border-line-strong bg-surface-2 px-4 py-3">
        <span className="size-3.5 spin rounded-full border-2 border-line-strong border-t-amber" />
        <span className="label-mono">{t.states.loading}</span>
      </div>

      <div>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-1 gap-4 border-b border-line px-4 py-4 last:border-b-0 lg:grid-cols-[1fr_1.4fr_1fr_0.8fr_0.7fr]"
          >
            <SkelBlock lines={[60, 90, 40]} />
            <SkelBlock lines={[80, 100, 50]} />
            <SkelBlock lines={[50, 70, 60]} />
            <div className="hidden justify-end lg:flex">
              <SkelBlock lines={[70]} wide />
            </div>
            <div className="hidden justify-end lg:flex">
              <SkelBlock lines={[55]} wide />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkelBlock({ lines, wide = false }: { lines: number[]; wide?: boolean }) {
  return (
    <div className={`space-y-2 ${wide ? "w-24" : ""}`}>
      {lines.map((w, i) => (
        <div
          key={i}
          className="skeleton h-3"
          style={{ width: `${w}%`, minWidth: wide ? "100%" : undefined }}
        />
      ))}
    </div>
  );
}
