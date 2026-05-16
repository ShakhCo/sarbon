"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useCargoList } from "@/lib/hooks/useCargoList";
import type { CargoStatus } from "@/lib/types/cargo";
import { cargoSearchIndex } from "@/lib/utils/format";
import { Header } from "@/components/layout/Header";
import { CargoFilters, type SortDir } from "@/components/cargo/CargoFilters";
import { CargoTable } from "@/components/cargo/CargoTable";
import { CargoCard } from "@/components/cargo/CargoCard";
import { Pagination } from "@/components/cargo/Pagination";
import { LoadingSkeleton } from "@/components/states/LoadingSkeleton";
import { ErrorState } from "@/components/states/ErrorState";
import { EmptyState } from "@/components/states/EmptyState";

const DEFAULTS = {
  status: "SEARCHING_ALL" as CargoStatus,
  sort: "created_at:desc" as SortDir,
  limit: 20,
  page: 1,
};

export default function DispatcherCargoPage() {
  const { t, lang } = useI18n();

  // Server-driven query state
  const [page, setPage] = useState(DEFAULTS.page);
  const [limit, setLimit] = useState(DEFAULTS.limit);
  const [cargoStatus, setCargoStatus] = useState<CargoStatus>(DEFAULTS.status);
  const [sort, setSort] = useState<SortDir>(DEFAULTS.sort);
  // Client-side filter state
  const [search, setSearch] = useState("");

  const { status, data, error, refetch } = useCargoList({
    page,
    limit,
    cargoStatus,
    sort,
    lang,
  });

  const isLoading = status === "loading" && !data;
  const isError = status === "error";

  const visibleItems = useMemo(() => {
    const items = data?.items ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((c) => cargoSearchIndex(c, lang).includes(q));
  }, [data?.items, search, lang]);

  const dirty =
    cargoStatus !== DEFAULTS.status ||
    sort !== DEFAULTS.sort ||
    limit !== DEFAULTS.limit ||
    search.trim() !== "";

  function resetFilters() {
    setCargoStatus(DEFAULTS.status);
    setSort(DEFAULTS.sort);
    setLimit(DEFAULTS.limit);
    setSearch("");
    setPage(1);
  }

  function handleStatus(next: CargoStatus) {
    setCargoStatus(next);
    setPage(1);
  }
  function handleSort(next: SortDir) {
    setSort(next);
    setPage(1);
  }
  function handleLimit(next: number) {
    setLimit(next);
    setPage(1);
  }

  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const showEmpty =
    !isLoading && !isError && status === "success" && visibleItems.length === 0;

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {/* Page heading */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="label-mono mb-1.5">/ dispatcher / cargo</div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {t.pageTitle}
            </h1>
          </div>
          {status === "success" && (
            <p className="data-mono text-sm text-ink-soft">
              {t.pageSubtitle(total)}
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="mb-5">
          <CargoFilters
            status={cargoStatus}
            onStatusChange={handleStatus}
            sort={sort}
            onSortChange={handleSort}
            search={search}
            onSearchChange={setSearch}
            onReset={resetFilters}
            dirty={dirty}
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton rows={Math.min(limit, 8)} />
        ) : isError ? (
          <ErrorState error={error} onRetry={refetch} />
        ) : showEmpty ? (
          <EmptyState filtered={search.trim() !== ""} />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden lg:block">
              <CargoTable items={visibleItems} />
            </div>
            {/* Mobile / tablet cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
              {visibleItems.map((c, i) => (
                <CargoCard key={c.id} cargo={c} index={i} />
              ))}
            </div>

            <div className="mt-5">
              <Pagination
                page={page}
                totalPages={totalPages}
                limit={limit}
                total={total}
                onPageChange={setPage}
                onLimitChange={handleLimit}
                disabled={status === "loading"}
              />
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-line-strong px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between">
          <span className="label-mono">SARBON · DISPATCHER CONSOLE</span>
          <span className="label-mono">api.sarbon.me</span>
        </div>
      </footer>
    </>
  );
}
