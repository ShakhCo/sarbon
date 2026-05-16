"use client";

import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { LANGS, LANG_META, type Lang } from "@/lib/i18n/translations";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="sm" />}
        aria-label="Language"
      >
        <span className="text-base leading-none">{LANG_META[lang].flag}</span>
        <span>{LANG_META[lang].label}</span>
        <ChevronDown className="text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {LANGS.map((code: Lang) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLang(code)}
            className={code === lang ? "font-semibold" : ""}
          >
            <span className="text-base leading-none">
              {LANG_META[code].flag}
            </span>
            {LANG_META[code].label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
