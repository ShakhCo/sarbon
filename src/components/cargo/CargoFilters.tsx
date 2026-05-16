"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import type { CargoStatus } from "@/lib/types/cargo";

export type SortDir = "created_at:desc" | "created_at:asc";

export interface FilterState {
  fromCity: string;
  toCity: string;
  transport: string;
  weightMin: string;
  weightMax: string;
  dateStart: string;
  dateEnd: string;
  favorite: boolean;
  status: CargoStatus;
  sort: SortDir;
}

interface Props {
  value: FilterState;
  onChange: <K extends keyof FilterState>(key: K, v: FilterState[K]) => void;
  cityOptions: string[];
  transportOptions: string[];
  onReset: () => void;
  dirty: boolean;
}

const fieldCls =
  "h-11 w-full rounded-[10px] border border-input-line bg-card px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-ink">
      {children}
    </label>
  );
}

function Chevron() {
  return (
    <svg
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-faint"
      width="11"
      height="7"
      viewBox="0 0 11 7"
      fill="none"
      aria-hidden
    >
      <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Select({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldCls} appearance-none pr-9 ${
          value === "" ? "text-faint" : ""
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-ink">
            {o.label}
          </option>
        ))}
      </select>
      <Chevron />
    </div>
  );
}

export function CargoFilters({
  value,
  onChange,
  cityOptions,
  transportOptions,
  onReset,
  dirty,
}: Props) {
  const { t } = useI18n();
  const cityOpts = cityOptions.map((c) => ({ value: c, label: c }));
  const transportOpts = transportOptions.map((c) => ({ value: c, label: c }));

  return (
    <section
      aria-label={t.filters.status}
      className="rounded-[var(--radius-card)] border border-line bg-card p-5 shadow-card sm:p-6"
    >
      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <Label>{t.filters.fromCity}</Label>
          <Select
            value={value.fromCity}
            onChange={(v) => onChange("fromCity", v)}
            placeholder={t.filters.fromCityPh}
            options={cityOpts}
          />
        </div>
        <div>
          <Label>{t.filters.toCity}</Label>
          <Select
            value={value.toCity}
            onChange={(v) => onChange("toCity", v)}
            placeholder={t.filters.toCityPh}
            options={cityOpts}
          />
        </div>
        <div>
          <Label>{t.filters.transport}</Label>
          <Select
            value={value.transport}
            onChange={(v) => onChange("transport", v)}
            placeholder={t.filters.transportPh}
            options={transportOpts}
          />
        </div>
        <div>
          <Label>{t.filters.weight}</Label>
          <div className="flex gap-3">
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={value.weightMin}
              onChange={(e) => onChange("weightMin", e.target.value)}
              placeholder={t.filters.min}
              className={fieldCls}
            />
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={value.weightMax}
              onChange={(e) => onChange("weightMax", e.target.value)}
              placeholder={t.filters.max}
              className={fieldCls}
            />
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="mt-4 grid grid-cols-1 items-end gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <Label>{t.filters.date}</Label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={value.dateStart}
              onChange={(e) => onChange("dateStart", e.target.value)}
              className={`${fieldCls} tnum`}
              aria-label={t.filters.dateStart}
            />
            <span className="text-faint">→</span>
            <input
              type="date"
              value={value.dateEnd}
              onChange={(e) => onChange("dateEnd", e.target.value)}
              className={`${fieldCls} tnum`}
              aria-label={t.filters.dateEnd}
            />
          </div>
        </div>

        <label className="flex h-11 cursor-pointer select-none items-center gap-2.5 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={value.favorite}
            onChange={(e) => onChange("favorite", e.target.checked)}
            className="size-[18px] accent-brand"
          />
          {t.filters.favorite}
        </label>

        <div>
          <Label>{t.filters.status}</Label>
          <div className="relative">
            <select
              value={value.status}
              onChange={(e) =>
                onChange("status", e.target.value as CargoStatus)
              }
              className={`${fieldCls} appearance-none pr-9`}
            >
              <option value="SEARCHING_ALL">
                {t.filters.statusSearching}
              </option>
              <option value="COMPLETED">{t.filters.statusCompleted}</option>
            </select>
            <Chevron />
          </div>
        </div>

        <div>
          <Label>{t.filters.sort}</Label>
          <div className="relative">
            <select
              value={value.sort}
              onChange={(e) => onChange("sort", e.target.value as SortDir)}
              className={`${fieldCls} appearance-none pr-9`}
            >
              <option value="created_at:desc">{t.filters.sortNewest}</option>
              <option value="created_at:asc">{t.filters.sortOldest}</option>
            </select>
            <Chevron />
          </div>
        </div>
      </div>

      {dirty && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-semibold text-brand transition-colors hover:text-brand-strong"
          >
            ✕ {t.filters.reset}
          </button>
        </div>
      )}
    </section>
  );
}
