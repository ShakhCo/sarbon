"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Cargo, RoutePoint } from "@/lib/types/cargo";
import {
  cargoTypeName,
  countryFlag,
  countryLabel,
  directionLabels,
  formatRouteDateTime,
  formatVolume,
  formatWeight,
  initials,
  priceView,
  transportLine,
} from "@/lib/utils/format";

/* Place: flag · ISO3 · city code, with date/time underneath. */
export function PlaceCell({ point }: { point: RoutePoint | null }) {
  if (!point) return <span className="text-faint">—</span>;
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-base leading-none" aria-hidden>
        {countryFlag(point.country_code)}
      </span>
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5">
          <span className="col-label !text-faint">
            {countryLabel(point.country_code)}
          </span>
          <span
            className="truncate text-[15px] font-bold text-ink-title"
            title={point.address}
          >
            {point.city_code || point.city_name || "—"}
          </span>
        </div>
        <div className="tnum mt-1 text-xs text-muted">
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
      <div className="tnum text-[15px] font-extrabold text-brand">
        {p.amount}
        {p.method && (
          <span className="ml-1.5 text-[13px] font-semibold text-ink">
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
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M6 6.5h8l2.5 9.5H3.5L6 6.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function IconCube() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2.5 17 6v8l-7 3.5L3 14V6l7-3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M3 6l7 3.5L17 6M10 9.5v8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function CargoCell({ cargo }: { cargo: Cargo }) {
  const { lang } = useI18n();
  const type = cargoTypeName(cargo.cargo_type, lang);
  const load = directionLabels(cargo.loading_types, lang);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-ink">
        <span className="inline-flex items-center gap-1.5 text-muted">
          <IconWeight />
          <span className="tnum font-bold text-ink">
            {formatWeight(cargo.weight, lang)}
          </span>
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
        {load && <span className="text-faint"> • {load}</span>}
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
    <svg width="17" height="17" viewBox="0 0 22 22" fill="none" aria-hidden>
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
        <div className="mt-1.5 space-y-0.5 text-xs text-muted">
          {loading && (
            <div className="flex items-center gap-1.5">
              <span className="text-faint" aria-hidden>
                ↥
              </span>
              {loading}
            </div>
          )}
          {unloading && (
            <div className="flex items-center gap-1.5">
              <span className="text-faint" aria-hidden>
                ↧
              </span>
              {unloading}
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
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand-strong">
        {initials(cargo.contact_name)}
      </span>
      <div className="min-w-0">
        <div className="truncate text-sm font-bold text-ink">
          {cargo.contact_name || "—"}
        </div>
        <div className="tnum truncate text-xs text-muted">
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
        <svg width="18" height="18" viewBox="0 0 22 22" fill={fav ? "currentColor" : "none"} aria-hidden>
          <path
            d="M11 19s-7-4.3-7-9.2A4.3 4.3 0 0 1 11 7a4.3 4.3 0 0 1 7 2.8C18 14.7 11 19 11 19Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className={fav ? "text-red" : ""}
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
