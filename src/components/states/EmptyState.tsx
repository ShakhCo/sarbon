"use client";

import { PackageOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Card } from "@/components/ui/card";

export function EmptyState({ filtered }: { filtered: boolean }) {
  const { t } = useI18n();

  return (
    <Card className="items-center px-6 py-20 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-muted text-muted-foreground">
        <PackageOpen className="size-7" />
      </div>
      <h2 className="mt-5 text-lg font-semibold">{t.states.emptyTitle}</h2>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        {filtered ? t.states.emptyFiltered : t.states.emptyBody}
      </p>
    </Card>
  );
}
