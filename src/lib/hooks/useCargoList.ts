"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CargoApiError, fetchCargoList } from "@/lib/api/cargo";
import type { CargoListResult, CargoStatus } from "@/lib/types/cargo";

export interface CargoListState {
  status: "idle" | "loading" | "success" | "error";
  data: CargoListResult | null;
  error: CargoApiError | null;
}

interface UseCargoListArgs {
  page: number;
  limit: number;
  cargoStatus: CargoStatus;
  sort: string;
  lang: string;
}

/**
 * Fetches a page of cargo whenever a query input changes.
 * Previous in-flight requests are aborted so the latest query always wins.
 */
export function useCargoList({
  page,
  limit,
  cargoStatus,
  sort,
  lang,
}: UseCargoListArgs) {
  const [state, setState] = useState<CargoListState>({
    status: "idle",
    data: null,
    error: null,
  });
  const abortRef = useRef<AbortController | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const refetch = useCallback(() => setReloadToken((n) => n + 1), []);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((prev) => ({
      status: "loading",
      data: prev.data, // keep previous page visible while loading
      error: null,
    }));

    fetchCargoList({
      page,
      limit,
      status: cargoStatus,
      sort,
      lang,
      signal: controller.signal,
    })
      .then((data) => {
        if (controller.signal.aborted) return;
        setState({ status: "success", data, error: null });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        if (err instanceof CargoApiError) {
          setState({ status: "error", data: null, error: err });
        } else if ((err as { code?: string })?.code !== "ERR_CANCELED") {
          setState({
            status: "error",
            data: null,
            error: new CargoApiError("unknown", "Unexpected error."),
          });
        }
      });

    return () => controller.abort();
  }, [page, limit, cargoStatus, sort, lang, reloadToken]);

  return { ...state, refetch };
}
