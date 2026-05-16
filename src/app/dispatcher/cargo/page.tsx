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
import { DataTable } from "@/components/cargo/DataTable";
import { useCargoColumns } from "./columns";
import { CargoCard } from "@/components/cargo/CargoCard";
import { Pagination } from "@/components/cargo/Pagination";
import { LoadingSkeleton } from "@/components/states/LoadingSkeleton";
import { ErrorState } from "@/components/states/ErrorState";
import { EmptyState } from "@/components/states/EmptyState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Search } from "lucide-react";

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
  const columns = useCargoColumns();

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
        <nav className="text-sm text-muted-foreground">
          <span>{t.breadcrumbHome}</span>
          <span className="mx-2 text-muted-foreground/60">/</span>
          <span className="text-foreground">{t.pageTitle}</span>
        </nav>

        <div className="mb-6 mt-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t.pageTitle}
            </h1>
            {status === "success" && (
              <span className="text-sm font-medium tabular-nums text-muted-foreground">
                · {t.found(total)}
              </span>
            )}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="pl-9"
            />
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
              <DataTable columns={columns} data={visible} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
              {visible.map((c) => (
                <CargoCard key={c.id} cargo={c} />
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

      {/* Floating support button */}
      <Button
        size="icon-lg"
        aria-label="support chat"
        className="fixed bottom-6 right-6 z-30 rounded-full shadow-lg"
      >
        <MessageCircle />
      </Button>
    </>
  );
}
