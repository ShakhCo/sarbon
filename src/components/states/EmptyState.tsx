"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

export function EmptyState({ filtered }: { filtered: boolean }) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center border border-dashed border-line-strong bg-surface px-6 py-20 text-center">
      <div className="flex size-14 items-center justify-center border border-line-strong bg-surface-2 text-ink-faint">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="font-display mt-4 text-lg font-semibold text-ink">
        {t.states.emptyTitle}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-ink-soft">
        {filtered ? t.states.emptyAfterFilter : t.states.emptyBody}
      </p>
    </div>
  );
}
