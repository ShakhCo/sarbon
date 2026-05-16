"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Cargo, RoutePoint } from "@/lib/types/cargo";
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
    return (
      <span
        className="mt-0.5 inline-block h-3 w-[18px] rounded-[2px] bg-card-2"
        aria-hidden
      />
    );
  }
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={url}
      alt={countryLabel(code)}
      width={18}
      height={13}
      loading="lazy"
      className="mt-0.5 h-[13px] w-[18px] shrink-0 rounded-[2px] object-cover ring-1 ring-black/5"
    />
  );
}

/* Place: flag · ISO3 · city code on one line, date/time underneath. */
export function PlaceCell({ point }: { point: RoutePoint | null }) {
  if (!point) return <span className="text-faint">—</span>;
  return (
    <div className="flex items-start gap-2">
      <Flag code={point.country_code} />
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5 whitespace-nowrap">
          <span className="col-label !text-faint">
            {countryLabel(point.country_code)}
          </span>
          <span
            className="text-[15px] font-bold text-ink-title"
            title={point.address}
          >
            {point.city_code || point.city_name || "—"}
          </span>
        </div>
        <div className="tnum mt-1 whitespace-nowrap text-[13px] text-muted">
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
      <span className="text-sm font-semibold text-muted">{p.amount}</span>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-1.5">
        <span className="tnum whitespace-nowrap text-[15px] font-extrabold text-brand">
          {p.amount}
        </span>
        {p.method && (
          <span className="whitespace-nowrap text-[13px] font-medium text-ink">
            {p.method}
          </span>
        )}
      </div>
      {p.note && (
        <div className="mt-0.5 text-xs font-medium text-amber">{p.note}</div>
      )}
    </div>
  );
}

function IconWeight() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5.5 7h9l1.6 9.5H3.9L5.5 7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8 7a2 2 0 0 1 4 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconCube() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2.6 16.8 6v8L10 17.4 3.2 14V6L10 2.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M3.2 6 10 9.5 16.8 6M10 9.5v7.9"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/** YUK = weight · volume, then cargo-type (+ shipment) line. */
export function CargoCell({ cargo }: { cargo: Cargo }) {
  const { lang } = useI18n();
  const type = cargoTypeName(cargo.cargo_type, lang);

  return (
    <div>
      <div className="flex items-center gap-2.5 text-sm">
        <span className="inline-flex items-center gap-1.5 text-muted">
          <IconWeight />
          <span className="tnum font-bold text-ink">
            {formatWeight(cargo.weight, lang)}
          </span>
        </span>
        <span className="text-faint" aria-hidden>
          ·
        </span>
        <span className="inline-flex items-center gap-1.5 text-muted">
          <IconCube />
          <span className="tnum font-bold text-ink">
            {formatVolume(cargo.volume, lang)}
          </span>
        </span>
      </div>
      <div className="mt-1.5 text-[13px] text-muted">
        {type}
        {cargo.shipment_type && (
          <span className="text-faint"> • {cargo.shipment_type}</span>
        )}
        {cargo.adr_enabled && (
          <span className="ml-2 rounded bg-red-soft px-1.5 py-0.5 text-[11px] font-bold text-red">
            ADR{cargo.adr_class ? ` ${cargo.adr_class}` : ""}
          </span>
        )}
      </div>
    </div>
  );
}

function IconTruck() {
  return (
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M2 5.5h10v9H2v-9Zm10 3h4l3 3v3h-7v-6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="16" r="1.8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="15.5" cy="16" r="1.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function IconLoad({ up }: { up: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={up ? "" : "rotate-180"}
    >
      <path
        d="M8 2.5v8m0-8L4.5 6M8 2.5 11.5 6M3 13.5h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TransportCell({ cargo }: { cargo: Cargo }) {
  const { lang } = useI18n();
  const line = transportLine(cargo, lang);
  const loading = directionLabels(cargo.loading_types, lang);
  const unloading = directionLabels(cargo.unloading_types, lang);

  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
        <span className="text-muted">
          <IconTruck />
        </span>
        <span>{line}</span>
      </div>
      {(loading || unloading) && (
        <div className="mt-1.5 space-y-1 text-[13px] text-muted">
          {loading && (
            <div className="flex items-start gap-1.5">
              <span className="mt-0.5 shrink-0 text-faint">
                <IconLoad up />
              </span>
              <span>{loading}</span>
            </div>
          )}
          {unloading && (
            <div className="flex items-start gap-1.5">
              <span className="mt-0.5 shrink-0 text-faint">
                <IconLoad up={false} />
              </span>
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
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-card-2 text-xs font-bold text-muted">
        {initials(cargo.contact_name)}
      </span>
      <div className="min-w-0">
        <div className="text-sm font-bold text-ink">
          {cargo.contact_name || "—"}
        </div>
        <div className="tnum text-[13px] text-muted">
          {cargo.contact_phone || "—"}
        </div>
      </div>
    </div>
  );
}

export function RowActions({ liked = false }: { liked?: boolean }) {
  const [fav, setFav] = useState(liked);
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setFav((v) => !v)}
        aria-pressed={fav}
        aria-label="favorite"
        className="grid size-9 place-items-center rounded-lg text-faint transition-colors hover:bg-card-2 hover:text-red"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 22 22"
          fill={fav ? "currentColor" : "none"}
          aria-hidden
          className={fav ? "text-red" : ""}
        >
          <path
            d="M11 19s-7-4.3-7-9.2A4.3 4.3 0 0 1 11 7a4.3 4.3 0 0 1 7 2.8C18 14.7 11 19 11 19Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="share"
        className="grid size-9 place-items-center rounded-lg text-faint transition-colors hover:bg-card-2 hover:text-brand"
      >
        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path
            d="M14 4h4v4M18 4l-8 8M9 5H5v12h12v-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
