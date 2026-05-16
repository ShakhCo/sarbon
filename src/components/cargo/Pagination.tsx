"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

const LIMITS = [10, 20, 50] as const;

interface PaginationProps {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  disabled?: boolean;
}

export function Pagination({
  page,
  totalPages,
  limit,
  total,
  onPageChange,
  onLimitChange,
  disabled = false,
}: PaginationProps) {
  const { t } = useI18n();

  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const canPrev = page > 1 && !disabled;
  const canNext = page < totalPages && !disabled;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-4 border border-line bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Range + per-page */}
      <div className="flex items-center gap-5">
        <span className="data-mono text-xs text-ink-soft">
          {t.pagination.showing(from, to, total)}
        </span>
        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="label-mono">
            {t.pagination.perPage}
          </label>
          <div className="relative">
            <select
              id="limit"
              value={limit}
              disabled={disabled}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="data-mono appearance-none border border-line-strong bg-surface py-1.5 pl-2.5 pr-7 text-xs font-semibold text-ink hover:bg-surface-2 focus:outline-none disabled:opacity-50"
            >
              {LIMITS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-ink-faint"
              width="9"
              height="6"
              viewBox="0 0 11 7"
              fill="none"
              aria-hidden
            >
              <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Prev / page / Next */}
      <div className="flex items-center gap-2">
        <PageButton
          onClick={() => onPageChange(page - 1)}
          disabled={!canPrev}
          label={t.pagination.prev}
          dir="prev"
        />
        <span className="data-mono px-2 text-sm text-ink">
          <strong className="text-ink">{page}</strong>
          <span className="mx-1.5 text-ink-faint">{t.pagination.of}</span>
          <span className="text-ink-soft">{totalPages}</span>
        </span>
        <PageButton
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
          label={t.pagination.next}
          dir="next"
        />
      </div>
    </nav>
  );
}

function PageButton({
  onClick,
  disabled,
  label,
  dir,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  dir: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1.5 border border-line-strong bg-surface px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:enabled:bg-ink hover:enabled:text-paper disabled:cursor-not-allowed disabled:opacity-40"
    >
      {dir === "prev" && <Arrow dir="prev" />}
      {label}
      {dir === "next" && <Arrow dir="next" />}
    </button>
  );
}

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={dir === "prev" ? "rotate-180" : ""}
    >
      <path d="M2 7h9m0 0L7 3m4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
