"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

const LIMITS = [10, 20, 50] as const;

interface Props {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  disabled?: boolean;
}

/** Compact page list with ellipses, e.g. 1 … 4 [5] 6 … 12 */
function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const lo = Math.max(2, current - 1);
  const hi = Math.min(total - 1, current + 1);
  if (lo > 2) out.push("…");
  for (let p = lo; p <= hi; p++) out.push(p);
  if (hi < total - 1) out.push("…");
  out.push(total);
  return out;
}

export function Pagination({
  page,
  totalPages,
  limit,
  total,
  onPageChange,
  onLimitChange,
  disabled = false,
}: Props) {
  const { t } = useI18n();
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-card px-5 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-5">
        <span className="tnum text-sm text-muted">
          {t.pagination.showing(from, to, total)}
        </span>
        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm text-muted">
            {t.pagination.perPage}
          </label>
          <div className="relative">
            <select
              id="limit"
              value={limit}
              disabled={disabled}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="tnum h-9 appearance-none rounded-lg border border-input-line bg-card pl-3 pr-8 text-sm font-semibold text-ink outline-none focus:border-brand disabled:opacity-50"
            >
              {LIMITS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-faint"
              width="10"
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

      <div className="flex items-center gap-1.5">
        <Arrow
          dir="prev"
          label={t.pagination.prev}
          disabled={page <= 1 || disabled}
          onClick={() => onPageChange(page - 1)}
        />
        <div className="flex items-center gap-1">
          {pageList(page, totalPages).map((p, i) =>
            p === "…" ? (
              <span
                key={`e${i}`}
                className="grid size-9 place-items-center text-sm text-faint"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                disabled={disabled}
                aria-current={p === page ? "page" : undefined}
                onClick={() => onPageChange(p)}
                className={`tnum grid size-9 place-items-center rounded-lg text-sm font-semibold transition-colors ${
                  p === page
                    ? "bg-brand text-white"
                    : "text-ink hover:bg-card-2"
                }`}
              >
                {p}
              </button>
            ),
          )}
        </div>
        <Arrow
          dir="next"
          label={t.pagination.next}
          disabled={page >= totalPages || disabled}
          onClick={() => onPageChange(page + 1)}
        />
      </div>
    </nav>
  );
}

function Arrow({
  dir,
  label,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-9 place-items-center rounded-lg border border-input-line bg-card text-ink transition-colors hover:enabled:bg-card-2 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
        className={dir === "prev" ? "rotate-180" : ""}
      >
        <path d="M3 7h8m0 0L7 3m4 4-4 4" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    </button>
  );
}
