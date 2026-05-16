"use client";

import { Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton({ rows = 8 }: { rows?: number }) {
  const { t } = useI18n();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="overflow-hidden rounded-xl border bg-card"
    >
      <div className="flex items-center gap-2.5 border-b px-5 py-3.5">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {t.states.loading}
        </span>
      </div>
      <div>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-2 gap-5 border-b px-5 py-5 last:border-b-0 lg:grid-cols-6"
          >
            {Array.from({ length: 6 }).map((__, j) => (
              <div key={j} className="space-y-2">
                <Skeleton className="h-3.5 w-3/5" />
                <Skeleton className="h-3.5 w-4/5" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
