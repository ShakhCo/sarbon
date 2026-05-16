"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { CargoApiError } from "@/lib/api/cargo";

export function ErrorState({
  error,
  onRetry,
}: {
  error: CargoApiError | null;
  onRetry: () => void;
}) {
  const { t } = useI18n();
  const message =
    error?.reason === "network"
      ? t.states.errorNetwork
      : t.states.errorUpstream;

  return (
    <div
      role="alert"
      className="flex flex-col items-center border border-red-line bg-red-soft px-6 py-16 text-center"
    >
      <div className="flex size-12 items-center justify-center border border-red-line bg-surface text-red">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 8v5m0 3.5h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.42 0Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="font-display mt-4 text-lg font-semibold text-ink">
        {t.states.errorTitle}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-ink-soft">{message}</p>
      {error?.statusCode && (
        <code className="data-mono mt-2 text-[11px] text-ink-faint">
          HTTP {error.statusCode}
        </code>
      )}
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
      >
        {t.states.retry}
      </button>
    </div>
  );
}
