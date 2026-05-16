"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Lang } from "@/lib/i18n/translations";
import type { RoutePoint } from "@/lib/types/cargo";
import { formatDate, routeEndpoints } from "@/lib/utils/format";

function Endpoint({
  point,
  kind,
  lang,
}: {
  point: RoutePoint | null;
  kind: "from" | "to";
  lang: Lang;
}) {
  const accent = kind === "from" ? "bg-amber" : "bg-green";
  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <span className={`size-2 shrink-0 ${accent}`} aria-hidden />
        <span className="truncate font-semibold text-ink">
          {point?.city_name || "—"}
        </span>
      </div>
      <div className="mt-0.5 truncate pl-4 text-xs text-ink-soft" title={point?.address}>
        {point?.address || "—"}
      </div>
      {point?.date && (
        <div className="data-mono mt-1 pl-4 text-[11px] text-ink-faint">
          {formatDate(point.date, lang)}
        </div>
      )}
    </div>
  );
}

export function RoutePath({ points }: { points: RoutePoint[] }) {
  const { lang } = useI18n();
  const { origin, destination, stops } = routeEndpoints(points);

  return (
    <div className="flex items-stretch gap-3">
      <Endpoint point={origin} kind="from" lang={lang} />
      <div className="flex flex-col items-center pt-1.5 text-ink-faint">
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden>
          <path
            d="M0 5h18m0 0-4-4m4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        {stops > 0 && (
          <span className="data-mono mt-1 text-[10px] text-ink-faint">
            +{stops}
          </span>
        )}
      </div>
      <Endpoint point={destination} kind="to" lang={lang} />
    </div>
  );
}
