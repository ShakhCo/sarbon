"use client";

import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { CargoStatus } from "@/lib/types/cargo";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const ALL = "__all__";

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <Select
      value={value === "" ? ALL : value}
      onValueChange={(v) => onChange(!v || v === ALL ? "" : v)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder}>
          {(v) => (!v || v === ALL ? placeholder : v)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{placeholder}</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
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

  return (
    <Card className="p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label>{t.filters.fromCity}</Label>
          <FilterSelect
            value={value.fromCity}
            onChange={(v) => onChange("fromCity", v)}
            placeholder={t.filters.fromCityPh}
            options={cityOptions}
          />
        </div>
        <div className="space-y-2">
          <Label>{t.filters.toCity}</Label>
          <FilterSelect
            value={value.toCity}
            onChange={(v) => onChange("toCity", v)}
            placeholder={t.filters.toCityPh}
            options={cityOptions}
          />
        </div>
        <div className="space-y-2">
          <Label>{t.filters.transport}</Label>
          <FilterSelect
            value={value.transport}
            onChange={(v) => onChange("transport", v)}
            placeholder={t.filters.transportPh}
            options={transportOptions}
          />
        </div>
        <div className="space-y-2">
          <Label>{t.filters.weight}</Label>
          <div className="flex gap-3">
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              value={value.weightMin}
              onChange={(e) => onChange("weightMin", e.target.value)}
              placeholder={t.filters.min}
            />
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              value={value.weightMax}
              onChange={(e) => onChange("weightMax", e.target.value)}
              placeholder={t.filters.max}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 items-end gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label>{t.filters.date}</Label>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={value.dateStart}
              onChange={(e) => onChange("dateStart", e.target.value)}
              aria-label={t.filters.dateStart}
            />
            <span className="text-muted-foreground">→</span>
            <Input
              type="date"
              value={value.dateEnd}
              onChange={(e) => onChange("dateEnd", e.target.value)}
              aria-label={t.filters.dateEnd}
            />
          </div>
        </div>

        <div className="flex h-9 items-center">
          <Label className="flex cursor-pointer items-center gap-2.5">
            <Checkbox
              checked={value.favorite}
              onCheckedChange={(c) => onChange("favorite", c === true)}
            />
            {t.filters.favorite}
          </Label>
        </div>

        <div className="space-y-2">
          <Label>{t.filters.status}</Label>
          <Select
            value={value.status}
            onValueChange={(v) =>
              onChange("status", (v ?? "SEARCHING_ALL") as CargoStatus)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {(v) =>
                  v === "COMPLETED"
                    ? t.filters.statusCompleted
                    : t.filters.statusSearching
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SEARCHING_ALL">
                {t.filters.statusSearching}
              </SelectItem>
              <SelectItem value="COMPLETED">
                {t.filters.statusCompleted}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{t.filters.sort}</Label>
          <Select
            value={value.sort}
            onValueChange={(v) =>
              onChange("sort", (v ?? "created_at:desc") as SortDir)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {(v) =>
                  v === "created_at:asc"
                    ? t.filters.sortOldest
                    : t.filters.sortNewest
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at:desc">
                {t.filters.sortNewest}
              </SelectItem>
              <SelectItem value="created_at:asc">
                {t.filters.sortOldest}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {dirty && (
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X /> {t.filters.reset}
          </Button>
        </div>
      )}
    </Card>
  );
}
