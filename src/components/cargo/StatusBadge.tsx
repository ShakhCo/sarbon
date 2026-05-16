"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { CargoStatus } from "@/lib/types/cargo";

export function StatusBadge({ status }: { status: CargoStatus }) {
  const { t } = useI18n();

  const map: Record<
    string,
    { label: string; fg: string; bg: string; bd: string; dot: string }
  > = {
    SEARCHING_ALL: {
      label: t.filters.statusSearching,
      fg: "text-amber",
      bg: "bg-amber-soft",
      bd: "border-amber-line",
      dot: "bg-amber",
    },
    COMPLETED: {
      label: t.filters.statusCompleted,
      fg: "text-green",
      bg: "bg-green-soft",
      bd: "border-green-line",
      dot: "bg-green",
    },
  };

  const s = map[status] ?? {
    label: status,
    fg: "text-ink-soft",
    bg: "bg-surface-2",
    bd: "border-line-strong",
    dot: "bg-ink-faint",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border ${s.bd} ${s.bg} ${s.fg} px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider`}
    >
      <span className={`size-1.5 rounded-full ${s.dot}`} aria-hidden />
      {s.label}
    </span>
  );
}
