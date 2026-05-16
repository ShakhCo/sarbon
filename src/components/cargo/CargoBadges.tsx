"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Cargo } from "@/lib/types/cargo";

/** Small attribute chips: ADR / two drivers / ASAP. */
export function CargoBadges({ cargo }: { cargo: Cargo }) {
  const { t } = useI18n();
  const asap = cargo.route_points.some((p) => p.delivery_asap);

  const chips: { key: string; label: string; cls: string }[] = [];

  if (cargo.adr_enabled) {
    chips.push({
      key: "adr",
      label: `ADR${cargo.adr_class ? ` ${cargo.adr_class}` : ""}`,
      cls: "border-red-line bg-red-soft text-red",
    });
  }
  if (cargo.is_two_drivers_required) {
    chips.push({
      key: "2d",
      label: t.table.twoDrivers,
      cls: "border-blue-soft bg-blue-soft text-blue",
    });
  }
  if (asap) {
    chips.push({
      key: "asap",
      label: t.table.asap,
      cls: "border-amber-line bg-amber-soft text-amber",
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((c) => (
        <span
          key={c.key}
          className={`data-mono border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${c.cls}`}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}
