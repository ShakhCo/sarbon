"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Cargo } from "@/lib/types/cargo";
import {
  cargoTypeName,
  formatVolume,
  formatWeight,
  timeAgo,
} from "@/lib/utils/format";
import { RoutePath } from "./RoutePath";
import { StatusBadge } from "./StatusBadge";
import { CargoBadges } from "./CargoBadges";
import { CargoPayment } from "./CargoPayment";

export function CargoCard({ cargo, index }: { cargo: Cargo; index: number }) {
  const { t, lang } = useI18n();

  return (
    <article
      className="rise border border-line bg-surface"
      style={{ animationDelay: `${Math.min(index, 10) * 35}ms` }}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <div className="font-display text-base font-semibold leading-tight text-ink">
            {cargoTypeName(cargo.cargo_type, lang)}
          </div>
          {(cargo.name || cargo.comment) && (
            <div className="mt-0.5 line-clamp-1 text-xs text-ink-soft">
              {cargo.name || cargo.comment}
            </div>
          )}
        </div>
        <StatusBadge status={cargo.status} />
      </div>

      <div className="border-b border-line px-4 py-4">
        <RoutePath points={cargo.route_points} />
      </div>

      <div className="grid grid-cols-3 divide-x divide-line border-b border-line text-center">
        <Metric label={t.table.weight} value={formatWeight(cargo.weight, lang)} />
        <Metric label={t.table.volume} value={formatVolume(cargo.volume, lang)} />
        <Metric
          label={t.table.vehicle}
          value={cargo.truck_type || "—"}
        />
      </div>

      <div className="flex items-end justify-between gap-3 px-4 py-3">
        <div>
          <CargoBadges cargo={cargo} />
          <div className="data-mono mt-2 text-[11px] text-ink-faint">
            {timeAgo(cargo.created_at, lang)}
          </div>
        </div>
        <CargoPayment payment={cargo.payment} align="right" />
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-2 py-3">
      <div className="label-mono">{label}</div>
      <div className="data-mono mt-1 text-sm font-semibold text-ink">
        {value}
      </div>
    </div>
  );
}
