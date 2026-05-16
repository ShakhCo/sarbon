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
      className="flex flex-col items-center rounded-[var(--radius-card)] border border-line bg-card px-6 py-16 text-center shadow-card"
    >
      <div className="grid size-14 place-items-center rounded-full bg-red-soft text-red">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 8v5m0 3.5h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.42 0Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="mt-5 text-lg font-bold text-ink-title">
        {t.states.errorTitle}
      </h2>
      <p className="mt-1.5 max-w-sm text-sm text-muted">{message}</p>
      {error?.statusCode && (
        <code className="tnum mt-2 text-xs text-faint">
          HTTP {error.statusCode}
        </code>
      )}
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-[10px] bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
      >
        {t.states.retry}
      </button>
    </div>
  );
}
