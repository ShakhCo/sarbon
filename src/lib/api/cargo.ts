import { AxiosError } from "axios";
import { apiClient } from "./client";
import type {
  ApiEnvelope,
  CargoListData,
  CargoListQuery,
  CargoListResult,
} from "@/lib/types/cargo";

/** Error thrown by the cargo service, carrying a stable reason code. */
export class CargoApiError extends Error {
  readonly reason: "network" | "upstream" | "unknown";
  readonly statusCode?: number;

  constructor(
    reason: "network" | "upstream" | "unknown",
    message: string,
    statusCode?: number,
  ) {
    super(message);
    this.name = "CargoApiError";
    this.reason = reason;
    this.statusCode = statusCode;
  }
}

interface FetchCargoListArgs extends CargoListQuery {
  /** UI language — forwarded to the proxy as the upstream `X-Language`. */
  lang: string;
  signal?: AbortSignal;
}

/**
 * Fetch a page of cargos through the same-origin proxy and normalise
 * it into a shape the UI can render directly.
 */
export async function fetchCargoList({
  page,
  limit,
  status,
  sort,
  lang,
  signal,
}: FetchCargoListArgs): Promise<CargoListResult> {
  try {
    const { data } = await apiClient.get<ApiEnvelope<CargoListData>>("/cargo", {
      params: { page, limit, status, sort, lang },
      signal,
    });

    const items = data?.data?.items ?? [];
    const total = data?.data?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return { items, total, page, limit, totalPages };
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.code === "ERR_CANCELED") throw err; // handled by caller
      const statusCode = err.response?.status;
      const payload = err.response?.data as
        | { message?: string; error?: string }
        | undefined;

      if (!err.response) {
        throw new CargoApiError(
          "network",
          payload?.message ?? "Network error while reaching the API.",
        );
      }
      throw new CargoApiError(
        "upstream",
        payload?.message ?? `Request failed with status ${statusCode}.`,
        statusCode,
      );
    }
    throw new CargoApiError("unknown", "An unexpected error occurred.");
  }
}
