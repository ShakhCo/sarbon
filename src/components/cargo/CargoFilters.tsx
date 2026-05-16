"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { CargoStatus } from "@/lib/types/cargo";

export type SortDir = "created_at:desc" | "created_at:asc";

interface CargoFiltersProps {
  status: CargoStatus;
  onStatusChange: (status: CargoStatus) => void;
  sort: SortDir;
  onSortChange: (sort: SortDir) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  dirty: boolean;
}

const STATUSES: CargoStatus[] = ["SEARCHING_ALL", "COMPLETED"];

export function CargoFilters({
  status,
  onStatusChange,
  sort,
  onSortChange,
  search,
  onSearchChange,
  onReset,
  dirty,
}: CargoFiltersProps) {
  const { t } = useI18n();

  const statusLabel: Record<string, string> = {
    SEARCHING_ALL: t.filters.statusSearching,
    COMPLETED: t.filters.statusCompleted,
  };

  return (
    <section
      aria-label={t.filters.title}
      className="border border-line bg-surface"
    >
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4 p-4 sm:p-5">
        {/* Status — drives the API `status` query */}
        <div>
          <label className="label-mono mb-2 block">{t.filters.status}</label>
          <div className="flex border border-line-strong">
            {STATUSES.map((s, i) => {
              const active = s === status;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => onStatusChange(s)}
                  aria-pressed={active}
                  className={[
                    "px-3.5 py-2 text-sm font-semibold transition-colors",
                    i > 0 ? "border-l border-line-strong" : "",
                    active
                      ? "bg-ink text-paper"
                      : "bg-surface text-ink-soft hover:bg-surface-2 hover:text-ink",
                  ].join(" ")}
                >
                  {statusLabel[s]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort — drives the API `sort` query */}
        <div>
          <label htmlFor="sort" className="label-mono mb-2 block">
            {t.filters.sort}
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortDir)}
              className="appearance-none border border-line-strong bg-surface py-2 pl-3.5 pr-9 text-sm font-medium text-ink hover:bg-surface-2 focus:outline-none"
            >
              <option value="created_at:desc">{t.filters.sortNewest}</option>
              <option value="created_at:asc">{t.filters.sortOldest}</option>
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint"
              width="11"
              height="7"
              viewBox="0 0 11 7"
              fill="none"
              aria-hidden
            >
              <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Search — client-side filter over the loaded page */}
        <div className="min-w-[200px] flex-1">
          <label htmlFor="search" className="label-mono mb-2 block">
            {t.filters.search}
          </label>
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 10l4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.filters.searchPlaceholder}
              className="w-full border border-line-strong bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
          </div>
        </div>

        {dirty && (
          <button
            type="button"
            onClick={onReset}
            className="data-mono py-2 text-xs font-semibold uppercase tracking-wide text-amber hover:underline"
          >
            ✕ {t.filters.reset}
          </button>
        )}
      </div>
    </section>
  );
}
