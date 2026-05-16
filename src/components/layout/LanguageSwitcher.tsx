"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { LANGS, type Lang } from "@/lib/i18n/translations";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-stretch border border-line-strong bg-surface"
    >
      {LANGS.map((code: Lang, i) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={[
              "data-mono px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
              i > 0 ? "border-l border-line-strong" : "",
              active
                ? "bg-ink text-paper"
                : "text-ink-soft hover:bg-surface-2 hover:text-ink",
            ].join(" ")}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
