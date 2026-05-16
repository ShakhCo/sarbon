"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

export function EmptyState({ filtered }: { filtered: boolean }) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-line bg-card px-6 py-20 text-center shadow-card">
      <div className="grid size-16 place-items-center rounded-full bg-card-2 text-faint">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="mt-5 text-lg font-bold text-ink-title">
        {t.states.emptyTitle}
      </h2>
      <p className="mt-1.5 max-w-sm text-sm text-muted">
        {filtered ? t.states.emptyFiltered : t.states.emptyBody}
      </p>
    </div>
  );
}
