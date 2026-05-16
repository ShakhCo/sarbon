"use client";

import { AlertTriangle } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { CargoApiError } from "@/lib/api/cargo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function ErrorState({
  error,
  onRetry,
}: {
  error: CargoApiError | null;
  onRetry: () => void;
}) {
  const { t } = useI18n();
  const message =
    error?.reason === "network"
      ? t.states.errorNetwork
      : t.states.errorUpstream;

  return (
    <Alert
      variant="destructive"
      className="flex flex-col items-center gap-4 px-6 py-16 text-center"
    >
      <AlertTriangle className="size-10" />
      <div>
        <AlertTitle className="text-lg">{t.states.errorTitle}</AlertTitle>
        <AlertDescription className="mt-1 justify-center">
          {message}
          {error?.statusCode ? ` (HTTP ${error.statusCode})` : ""}
        </AlertDescription>
      </div>
      <Button variant="outline" onClick={onRetry}>
        {t.states.retry}
      </Button>
    </Alert>
  );
}
