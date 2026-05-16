"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  Pagination as Pg,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const dim = "pointer-events-none opacity-50";

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
    <div className="flex flex-col gap-4 rounded-xl border bg-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <span className="text-sm tabular-nums text-muted-foreground">
          {t.pagination.showing(from, to, total)}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {t.pagination.perPage}
          </span>
          <Select
            value={String(limit)}
            onValueChange={(v) => onLimitChange(Number(v ?? limit))}
            disabled={disabled}
          >
            <SelectTrigger size="sm" className="w-[72px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LIMITS.map((l) => (
                <SelectItem key={l} value={String(l)}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Pg className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text={t.pagination.prev}
              aria-disabled={page <= 1 || disabled}
              className={page <= 1 || disabled ? dim : undefined}
              onClick={(e) => {
                e.preventDefault();
                if (page > 1 && !disabled) onPageChange(page - 1);
              }}
            />
          </PaginationItem>

          {pageList(page, totalPages).map((p, i) =>
            p === "…" ? (
              <PaginationItem key={`e${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  className={disabled ? dim : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!disabled) onPageChange(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              text={t.pagination.next}
              aria-disabled={page >= totalPages || disabled}
              className={page >= totalPages || disabled ? dim : undefined}
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages && !disabled) onPageChange(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pg>
    </div>
  );
}
