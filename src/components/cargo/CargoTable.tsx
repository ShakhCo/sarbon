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

export function CargoTable({ items }: { items: Cargo[] }) {
  const { t, lang } = useI18n();

  return (
    <div className="overflow-hidden border border-line bg-surface">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line-strong bg-surface-2 text-left">
            <Th>{t.table.cargo}</Th>
            <Th className="w-[34%]">{t.table.route}</Th>
            <Th>{t.table.vehicle}</Th>
            <Th className="text-right">{t.table.payment}</Th>
            <Th className="text-right">{t.table.posted}</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((c, idx) => (
            <tr
              key={c.id}
              className="rise group border-b border-line last:border-b-0 transition-colors hover:bg-amber-soft/40"
              style={{ animationDelay: `${Math.min(idx, 12) * 28}ms` }}
            >
              {/* Cargo */}
              <td className="max-w-[230px] border-l-2 border-transparent px-4 py-4 align-top group-hover:border-amber">
                <div className="font-display text-[15px] font-semibold leading-tight text-ink">
                  {cargoTypeName(c.cargo_type, lang)}
                </div>
                {(c.name || c.comment) && (
                  <div className="mt-0.5 line-clamp-1 text-xs text-ink-soft">
                    {c.name || c.comment}
                  </div>
                )}
                <div className="mt-2">
                  <CargoBadges cargo={c} />
                </div>
              </td>

              {/* Route */}
              <td className="px-4 py-4 align-top">
                <RoutePath points={c.route_points} />
              </td>

              {/* Vehicle */}
              <td className="px-4 py-4 align-top">
                <div className="data-mono text-[13px] font-semibold uppercase tracking-wide text-ink">
                  {c.truck_type || "—"}
                </div>
                <dl className="mt-2 space-y-1 text-xs text-ink-soft">
                  <Spec label={t.table.weight} value={formatWeight(c.weight, lang)} />
                  <Spec label={t.table.volume} value={formatVolume(c.volume, lang)} />
                  <Spec
                    label={t.table.vehicles}
                    value={
                      c.vehicles_amount != null
                        ? `${c.vehicles_left ?? c.vehicles_amount}/${c.vehicles_amount}`
                        : "—"
                    }
                  />
                </dl>
              </td>

              {/* Payment */}
              <td className="px-4 py-4 align-top">
                <CargoPayment payment={c.payment} align="right" />
              </td>

              {/* Posted */}
              <td className="px-4 py-4 text-right align-top">
                <StatusBadge status={c.status} />
                <div className="data-mono mt-2 text-[11px] text-ink-faint">
                  {timeAgo(c.created_at, lang)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`label-mono px-4 py-3 font-medium ${className}`}
      scope="col"
    >
      {children}
    </th>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-ink-faint">{label}</dt>
      <dd className="data-mono font-medium text-ink">{value}</dd>
    </div>
  );
}
