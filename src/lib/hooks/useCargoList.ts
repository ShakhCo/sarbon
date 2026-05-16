"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CargoApiError, fetchCargoList } from "@/lib/api/cargo";
import type { CargoListResult, CargoStatus } from "@/lib/types/cargo";

export interface CargoListState {
  status: "loading" | "success" | "error";
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
 *
 * `status` is derived from which query the latest result/error belongs to,
 * so we never call setState synchronously inside the effect — the loading
 * state falls out automatically when the request key changes.
 */
export function useCargoList({
  page,
  limit,
  cargoStatus,
  sort,
  lang,
}: UseCargoListArgs): CargoListState & { refetch: () => void } {
  const [reloadToken, setReloadToken] = useState(0);
  const requestKey = `${page}|${limit}|${cargoStatus}|${sort}|${lang}|${reloadToken}`;

  const [result, setResult] = useState<{
    key: string;
    data: CargoListResult;
  } | null>(null);
  const [errState, setErrState] = useState<{
    key: string;
    error: CargoApiError;
  } | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const refetch = useCallback(() => setReloadToken((n) => n + 1), []);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

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
        setErrState(null);
        setResult({ key: requestKey, data });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        if (err instanceof CargoApiError) {
          setErrState({ key: requestKey, error: err });
        } else if ((err as { code?: string })?.code !== "ERR_CANCELED") {
          setErrState({
            key: requestKey,
            error: new CargoApiError("unknown", "Unexpected error."),
          });
        }
      });

    return () => controller.abort();
  }, [requestKey, page, limit, cargoStatus, sort, lang]);

  // Keep the last successful page visible while a new one loads.
  const data = result?.data ?? null;
  const error =
    errState && errState.key === requestKey ? errState.error : null;

  let status: CargoListState["status"];
  if (error) status = "error";
  else if (result && result.key === requestKey) status = "success";
  else status = "loading";

  return { status, data, error, refetch };
}
