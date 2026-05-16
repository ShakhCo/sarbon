"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { SarbonLogo } from "./SarbonLogo";
import { LanguageSwitcher } from "./LanguageSwitcher";

function IconBtn({
  label,
  children,
  dot,
}: {
  label: string;
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-card-2 hover:text-ink"
    >
      {children}
      {dot && (
        <span className="absolute right-2 top-2 size-1.5 rounded-full bg-red" />
      )}
    </button>
  );
}

export function TopNav() {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links: { key: string; label: string; active?: boolean }[] = [
    { key: "dashboard", label: t.nav.dashboard },
    { key: "cargo", label: t.nav.cargo, active: true },
    { key: "myCargo", label: t.nav.myCargo },
    { key: "offers", label: t.nav.offers },
    { key: "trips", label: t.nav.trips },
    { key: "drivers", label: t.nav.driverManagers },
    { key: "gps", label: t.nav.gps },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <SarbonLogo priority height={30} />
          <nav className="hidden items-center gap-1 xl:flex">
            {links.map((l) => (
              <a
                key={l.key}
                href="#"
                aria-current={l.active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  l.active
                    ? "bg-green-soft text-green-strong"
                    : "text-ink hover:bg-card-2"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <IconBtn label="favorites">
            <svg width="19" height="19" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path
                d="M11 19s-7-4.3-7-9.2A4.3 4.3 0 0 1 11 7a4.3 4.3 0 0 1 7 2.8C18 14.7 11 19 11 19Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </IconBtn>
          <IconBtn label="notifications" dot>
            <svg width="19" height="19" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path
                d="M6 9a5 5 0 0 1 10 0c0 5 2 6 2 6H4s2-1 2-6ZM9.5 18a2.5 2.5 0 0 0 5 0"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconBtn>

          <span className="mx-1 hidden h-6 w-px bg-line sm:block" />
          <LanguageSwitcher />

          <div className="ml-1 flex items-center gap-2.5 pl-1">
            <span className="relative grid size-9 place-items-center rounded-full bg-card-2 text-muted">
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden>
                <circle cx="11" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M4.5 18a6.5 6.5 0 0 1 13 0"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute -bottom-0 -right-0 size-2.5 rounded-full border-2 border-card bg-green" />
            </span>
            <div className="hidden leading-tight sm:block">
              <div className="text-sm font-bold text-ink">sandjey</div>
              <div className="text-xs text-muted">{t.nav.role}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="menu"
            className="grid size-9 place-items-center rounded-lg text-ink hover:bg-card-2 xl:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-line bg-card px-4 py-2 xl:hidden">
          {links.map((l) => (
            <a
              key={l.key}
              href="#"
              className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                l.active ? "bg-green-soft text-green-strong" : "text-ink"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
