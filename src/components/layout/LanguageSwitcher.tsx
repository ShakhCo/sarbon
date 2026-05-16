"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { LANGS, LANG_META, type Lang } from "@/lib/i18n/translations";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-card-2"
      >
        <span className="text-base leading-none" aria-hidden>
          {LANG_META[lang].flag}
        </span>
        <span>{LANG_META[lang].label}</span>
        <svg
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          aria-hidden
          className={`text-faint transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-line-2 bg-card py-1 shadow-pop"
        >
          {LANGS.map((code: Lang) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === lang}
                onClick={() => {
                  setLang(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-card-2 ${
                  code === lang
                    ? "font-bold text-brand"
                    : "font-medium text-ink"
                }`}
              >
                <span className="text-base leading-none" aria-hidden>
                  {LANG_META[code].flag}
                </span>
                {LANG_META[code].label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
