"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { SarbonLogo } from "./SarbonLogo";

function StoreBadge({ kind }: { kind: "ios" | "android" }) {
  return (
    <span className="flex h-11 items-center gap-2 rounded-lg bg-ink-title px-3 text-card">
      {kind === "ios" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M16.5 12.3c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.4 0-2.6.8-3.3 2-1.4 2.5-.4 6.1 1 8.1.7 1 1.5 2.1 2.5 2 1-.1 1.4-.6 2.5-.6 1.2 0 1.5.6 2.6.6 1.1 0 1.8-1 2.5-2 .5-.8.7-1.2 1.1-2.1-2.4-.9-2.6-3.7-1.6-3.3ZM14.6 6c.5-.7.9-1.6.8-2.5-.8 0-1.8.6-2.4 1.2-.5.6-1 1.5-.8 2.4.9.1 1.8-.4 2.4-1.1Z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 22 22" fill="currentColor" aria-hidden>
          <path d="M4 3.5 13 11l-9 7.5c-.3-.2-.5-.6-.5-1V4.5c0-.4.2-.8.5-1ZM14.5 12.5l2.6 2.2c.8.5.8 1.6 0 2.1l-2.6 1.5L12 16l2.5-3.5ZM12 6 14.5 9.5 17 8c.8-.5.8-1.5 0-2L14.5 4.5 12 6Z" />
        </svg>
      )}
      <span className="text-left leading-tight">
        <span className="block text-[9px] opacity-70">
          {kind === "ios" ? "Download on the" : "GET IT ON"}
        </span>
        <span className="block text-[13px] font-bold">
          {kind === "ios" ? "App Store" : "Google Play"}
        </span>
      </span>
    </span>
  );
}

export function Footer() {
  const { t } = useI18n();

  const col = (title: string, items: string[]) => (
    <div>
      <h3 className="text-sm font-bold text-ink-title">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="text-sm text-muted transition-colors hover:text-brand">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="mt-12 border-t border-line bg-card">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {col(t.footer.useful, [t.footer.distance, t.footer.versions])}
          {col(t.footer.contacts, [t.footer.about, t.footer.contactInfo])}
          {col(t.footer.info, [t.footer.privacy, t.footer.sitemap])}
        </div>

        <div className="mt-10">
          <p className="text-sm text-muted">{t.footer.mobileApp}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <StoreBadge kind="ios" />
            <StoreBadge kind="android" />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <SarbonLogo height={28} />
          <p className="text-sm text-faint">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
