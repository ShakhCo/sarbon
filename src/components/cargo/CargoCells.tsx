"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Box,
  Heart,
  Share2,
  Truck,
  Weight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Cargo, RoutePoint } from "@/lib/types/cargo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  cargoTypeName,
  countryLabel,
  directionLabels,
  flagUrl,
  formatRouteDateTime,
  formatVolume,
  formatWeight,
  initials,
  priceView,
  transportLine,
} from "@/lib/utils/format";

function Flag({ code }: { code: string | null }) {
  const url = flagUrl(code);
  if (!url) {
    return <span className="mt-0.5 inline-block h-3 w-[18px] rounded-[2px] bg-muted" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={countryLabel(code)}
      width={18}
      height={13}
      loading="lazy"
      className="mt-0.5 h-[13px] w-[18px] shrink-0 rounded-[2px] object-cover ring-1 ring-border"
    />
  );
}

export function PlaceCell({ point }: { point: RoutePoint | null }) {
  if (!point) return <span className="text-muted-foreground">—</span>;
  return (
    <div className="flex items-start gap-2">
      <Flag code={point.country_code} />
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5 whitespace-nowrap">
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {countryLabel(point.country_code)}
          </span>
          <span className="text-sm font-semibold" title={point.address}>
            {point.city_code || point.city_name || "—"}
          </span>
        </div>
        <div className="mt-1 whitespace-nowrap text-xs tabular-nums text-muted-foreground">
          {formatRouteDateTime(point.date)}
        </div>
      </div>
    </div>
  );
}

export function PriceCell({ cargo }: { cargo: Cargo }) {
  const { lang } = useI18n();
  const p = priceView(cargo.payment, lang);

  if (p.kind === "request") {
    return (
      <span className="text-sm font-medium text-muted-foreground">
        {p.amount}
      </span>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-1.5">
        <span className="whitespace-nowrap text-sm font-bold tabular-nums">
          {p.amount}
        </span>
        {p.method && (
          <span className="whitespace-nowrap text-xs text-muted-foreground">
            {p.method}
          </span>
        )}
      </div>
      {p.note && (
        <Badge variant="secondary" className="mt-1">
          {p.note}
        </Badge>
      )}
    </div>
  );
}

export function CargoCell({ cargo }: { cargo: Cargo }) {
  const { lang } = useI18n();
  const type = cargoTypeName(cargo.cargo_type, lang);
  return (
    <div>
      <div className="flex items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1.5">
          <Weight className="size-4 text-muted-foreground" />
          <span className="font-semibold tabular-nums">
            {formatWeight(cargo.weight, lang)}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Box className="size-4 text-muted-foreground" />
          <span className="font-semibold tabular-nums">
            {formatVolume(cargo.volume, lang)}
          </span>
        </span>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>
          {type}
          {cargo.shipment_type && (
            <span className="text-muted-foreground/70">
              {" "}
              • {cargo.shipment_type}
            </span>
          )}
        </span>
        {cargo.adr_enabled && (
          <Badge variant="destructive">
            ADR{cargo.adr_class ? ` ${cargo.adr_class}` : ""}
          </Badge>
        )}
      </div>
    </div>
  );
}

export function TransportCell({ cargo }: { cargo: Cargo }) {
  const { lang } = useI18n();
  const line = transportLine(cargo, lang);
  const loading = directionLabels(cargo.loading_types, lang);
  const unloading = directionLabels(cargo.unloading_types, lang);

  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-medium">
        <Truck className="size-4 text-muted-foreground" />
        <span>{line}</span>
      </div>
      {(loading || unloading) && (
        <div className="mt-1.5 space-y-0.5 text-xs leading-snug text-muted-foreground">
          {loading && (
            <div className="flex items-start gap-1.5">
              <ArrowUp className="mt-px size-3.5 shrink-0 text-emerald-600" />
              <span>{loading}</span>
            </div>
          )}
          {unloading && (
            <div className="flex items-start gap-1.5">
              <ArrowDown className="mt-px size-3.5 shrink-0 text-red-600" />
              <span>{unloading}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function OrdererCell({ cargo }: { cargo: Cargo }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-9">
        <AvatarFallback className="text-xs font-semibold">
          {initials(cargo.contact_name)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <div className="text-sm font-semibold">{cargo.contact_name || "—"}</div>
        <div className="text-xs tabular-nums text-muted-foreground">
          {cargo.contact_phone || "—"}
        </div>
      </div>
    </div>
  );
}

export function RowActions({ liked = false }: { liked?: boolean }) {
  const [fav, setFav] = useState(liked);
  return (
    <div className="flex items-center justify-end gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        aria-pressed={fav}
        aria-label="favorite"
        onClick={() => setFav((v) => !v)}
      >
        <Heart
          className={fav ? "fill-red-500 text-red-500" : "text-muted-foreground"}
        />
      </Button>
      <Button variant="ghost" size="icon" aria-label="share">
        <Share2 className="text-muted-foreground" />
      </Button>
    </div>
  );
}
