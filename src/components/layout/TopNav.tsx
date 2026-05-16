"use client";

import { useState } from "react";
import { Bell, Heart, Menu } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SarbonLogo } from "./SarbonLogo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function TopNav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <SarbonLogo priority height={30} />
          <nav className="hidden items-center gap-1 xl:flex">
            {links.map((l) => (
              <Button
                key={l.key}
                variant={l.active ? "secondary" : "ghost"}
                size="sm"
                aria-current={l.active ? "page" : undefined}
              >
                {l.label}
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" aria-label="favorites">
            <Heart />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="notifications"
            className="relative"
          >
            <Bell />
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
          </Button>

          <Separator orientation="vertical" className="mx-1 hidden h-6 sm:block" />
          <LanguageSwitcher />

          <div className="ml-1 flex items-center gap-2.5 pl-1">
            <Avatar className="size-9">
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="hidden leading-tight sm:block">
              <div className="text-sm font-semibold">sandjey</div>
              <div className="text-xs text-muted-foreground">{t.nav.role}</div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label="menu"
            className="xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t bg-background px-3 py-2 xl:hidden">
          {links.map((l) => (
            <Button
              key={l.key}
              variant={l.active ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
            >
              {l.label}
            </Button>
          ))}
        </nav>
      )}
    </header>
  );
}
