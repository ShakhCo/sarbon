"use client";

import { Apple, Play } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Separator } from "@/components/ui/separator";
import { SarbonLogo } from "./SarbonLogo";

function StoreBadge({ icon, top, main }: { icon: React.ReactNode; top: string; main: string }) {
  return (
    <span className="flex h-11 items-center gap-2 rounded-lg bg-primary px-3 text-primary-foreground">
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-[9px] opacity-70">{top}</span>
        <span className="block text-[13px] font-bold">{main}</span>
      </span>
    </span>
  );
}

export function Footer() {
  const { t } = useI18n();

  const col = (title: string, items: string[]) => (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i}>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="mt-12 border-t bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {col(t.footer.useful, [t.footer.distance, t.footer.versions])}
          {col(t.footer.contacts, [t.footer.about, t.footer.contactInfo])}
          {col(t.footer.info, [t.footer.privacy, t.footer.sitemap])}
        </div>

        <div className="mt-10">
          <p className="text-sm text-muted-foreground">{t.footer.mobileApp}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <StoreBadge
              icon={<Apple className="size-5" />}
              top="Download on the"
              main="App Store"
            />
            <StoreBadge
              icon={<Play className="size-5" />}
              top="GET IT ON"
              main="Google Play"
            />
          </div>
        </div>

        <Separator className="mt-10" />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <SarbonLogo height={28} />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
