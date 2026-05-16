"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-30 border-b border-line-strong bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {/* freight chevron mark */}
          <div className="flex size-9 items-center justify-center bg-ink text-paper">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M2 14V6l5-3 5 3v8M12 6l4-2 2 1.5v7.5M2 14l5 3 5-3M12 14l4 2 2-1.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-display text-lg font-bold tracking-tight text-ink">
              {t.brand}
            </div>
            <div className="label-mono mt-1">{t.brandSub}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="label-mono hidden sm:inline">
            ID&nbsp;9aca…405f
          </span>
          <span
            className="hidden h-5 w-px bg-line-strong sm:block"
            aria-hidden
          />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
