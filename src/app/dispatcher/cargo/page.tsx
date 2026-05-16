"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useCargoList } from "@/lib/hooks/useCargoList";
import type { Cargo } from "@/lib/types/cargo";
import {
  cargoSearchIndex,
  routeEndpoints,
  uniqueSorted,
} from "@/lib/utils/format";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import {
  CargoFilters,
  type FilterState,
} from "@/components/cargo/CargoFilters";
import { CargoTable } from "@/components/cargo/CargoTable";
import { CargoCard } from "@/components/cargo/CargoCard";
import { Pagination } from "@/components/cargo/Pagination";
import { LoadingSkeleton } from "@/components/states/LoadingSkeleton";
import { ErrorState } from "@/components/states/ErrorState";
import { EmptyState } from "@/components/states/EmptyState";

const DEFAULT_FILTERS: FilterState = {
  fromCity: "",
  toCity: "",
  transport: "",
  weightMin: "",
  weightMax: "",
  dateStart: "",
  dateEnd: "",
  favorite: false,
  status: "SEARCHING_ALL",
  sort: "created_at:desc",
};

function cityCode(p: { city_code: string; city_name: string } | null) {
  return p ? p.city_code || p.city_name || "" : "";
}

export default function DispatcherCargoPage() {
  const { t, lang } = useI18n();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");

  const { status, data, error, refetch } = useCargoList({
    page,
    limit,
    cargoStatus: filters.status,
    sort: filters.sort,
    lang,
  });

  const isLoading = status === "loading" && !data;
  const isError = status === "error";
  const items = useMemo(() => data?.items ?? [], [data?.items]);

  // Options for the city / transport selects, derived from loaded data.
  const cityOptions = useMemo(() => {
    const codes: string[] = [];
    for (const c of items) {
      const { origin, destination } = routeEndpoints(c.route_points);
      codes.push(cityCode(origin), cityCode(destination));
    }
    return uniqueSorted(codes);
  }, [items]);

  const transportOptions = useMemo(
    () => uniqueSorted(items.map((c) => c.truck_type)),
    [items],
  );

  // Client-side filtering over the loaded page.
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const wMin = filters.weightMin ? Number(filters.weightMin) : null;
    const wMax = filters.weightMax ? Number(filters.weightMax) : null;
    const dStart = filters.dateStart ? new Date(filters.dateStart) : null;
    const dEnd = filters.dateEnd ? new Date(filters.dateEnd) : null;
    if (dEnd) dEnd.setHours(23, 59, 59, 999);

    return items.filter((c: Cargo) => {
      const { origin, destination } = routeEndpoints(c.route_points);
      if (filters.fromCity && cityCode(origin) !== filters.fromCity) return false;
      if (filters.toCity && cityCode(destination) !== filters.toCity) return false;
      if (filters.transport && c.truck_type !== filters.transport) return false;
      if (wMin != null && (c.weight ?? -Infinity) < wMin) return false;
      if (wMax != null && (c.weight ?? Infinity) > wMax) return false;
      if (filters.favorite && !c.is_liked) return false;
      if (dStart || dEnd) {
        const ref = origin?.date ? new Date(origin.date) : null;
        if (!ref) return false;
        if (dStart && ref < dStart) return false;
        if (dEnd && ref > dEnd) return false;
      }
      if (q && !cargoSearchIndex(c, lang).includes(q)) return false;
      return true;
    });
  }, [items, filters, search, lang]);

  const dirty =
    search.trim() !== "" ||
    (Object.keys(DEFAULT_FILTERS) as (keyof FilterState)[]).some(
      (k) => filters[k] !== DEFAULT_FILTERS[k],
    );

  function patch<K extends keyof FilterState>(key: K, v: FilterState[K]) {
    setFilters((prev) => ({ ...prev, [key]: v }));
    // status/sort hit the API → restart at page 1
    if (key === "status" || key === "sort") setPage(1);
  }

  function resetAll() {
    setFilters(DEFAULT_FILTERS);
    setSearch("");
    setPage(1);
  }

  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const showEmpty =
    !isLoading && !isError && status === "success" && visible.length === 0;

  return (
    <>
      <TopNav />

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 lg:px-8 lg:py-8">
        {/* Breadcrumb + title + search */}
        <nav className="text-sm text-muted">
          <span>{t.breadcrumbHome}</span>
          <span className="mx-2 text-faint">/</span>
          <span className="text-ink">{t.pageTitle}</span>
        </nav>

        <div className="mb-6 mt-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink-title sm:text-3xl">
              {t.pageTitle}
            </h1>
            {status === "success" && (
              <span className="tnum text-sm font-medium text-muted">
                · {t.found(total)}
              </span>
            )}
          </div>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="h-11 w-full rounded-[10px] border border-input-line bg-card pl-4 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand"
            />
            <span className="absolute right-1.5 top-1.5 grid size-8 place-items-center rounded-lg bg-brand text-white">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <CargoFilters
            value={filters}
            onChange={patch}
            cityOptions={cityOptions}
            transportOptions={transportOptions}
            onReset={resetAll}
            dirty={dirty}
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton rows={Math.min(limit, 8)} />
        ) : isError ? (
          <ErrorState error={error} onRetry={refetch} />
        ) : showEmpty ? (
          <EmptyState filtered={dirty} />
        ) : (
          <>
            <div className="hidden lg:block">
              <CargoTable items={visible} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
              {visible.map((c, i) => (
                <CargoCard key={c.id} cargo={c} index={i} />
              ))}
            </div>

            <div className="mt-6">
              <Pagination
                page={page}
                totalPages={totalPages}
                limit={limit}
                total={total}
                onPageChange={setPage}
                onLimitChange={(l) => {
                  setLimit(l);
                  setPage(1);
                }}
                disabled={status === "loading"}
              />
            </div>
          </>
        )}
      </main>

      <Footer />

      {/* Floating support button (visual parity with the product) */}
      <button
        type="button"
        aria-label="support chat"
        className="fixed bottom-6 right-6 z-30 grid size-12 place-items-center rounded-full bg-brand text-white shadow-pop transition-transform hover:scale-105"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 5h16v11H8l-4 4V5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
