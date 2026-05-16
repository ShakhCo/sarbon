import type { Cargo, CargoTypeRef, RoutePoint } from "@/lib/types/cargo";
import type { Lang } from "@/lib/i18n/translations";

const LOCALE_BY_LANG: Record<Lang, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

/** Localised cargo-type name, falling back across languages. */
export function cargoTypeName(type: CargoTypeRef | null, lang: Lang): string {
  if (!type) return "—";
  const byLang: Record<Lang, string> = {
    uz: type.name_uz,
    ru: type.name_ru,
    en: type.name_en,
  };
  return byLang[lang] || type.name_en || type.name_ru || type.code || "—";
}

/** Compact money formatting with currency suffix (e.g. "1 500 000 UZS"). */
export function formatMoney(
  amount: number | null | undefined,
  currency: string,
  lang: Lang,
): string {
  if (amount == null) return "—";
  const n = new Intl.NumberFormat(LOCALE_BY_LANG[lang], {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${n} ${currency}`;
}

export function formatWeight(weight: number | null, lang: Lang): string {
  if (weight == null) return "—";
  const n = new Intl.NumberFormat(LOCALE_BY_LANG[lang]).format(weight);
  return `${n} t`;
}

export function formatVolume(volume: number | null, lang: Lang): string {
  if (volume == null) return "—";
  const n = new Intl.NumberFormat(LOCALE_BY_LANG[lang]).format(volume);
  return `${n} m³`;
}

/** "16 May, 18:37" — short, dispatcher-friendly. */
export function formatDateTime(iso: string | null, lang: Lang): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(LOCALE_BY_LANG[lang], {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatDate(iso: string | null, lang: Lang): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(LOCALE_BY_LANG[lang], {
    day: "numeric",
    month: "short",
  }).format(d);
}

/** Relative time like "2h ago" / "3d ago" with a sensible fallback. */
export function timeAgo(iso: string, lang: Lang): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const diffMs = Date.now() - d.getTime();
  const mins = Math.round(diffMs / 60000);
  const rtf = new Intl.RelativeTimeFormat(LOCALE_BY_LANG[lang], {
    numeric: "auto",
  });
  if (Math.abs(mins) < 60) return rtf.format(-mins, "minute");
  const hours = Math.round(mins / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 30) return rtf.format(-days, "day");
  return formatDate(iso, lang);
}

/** First LOAD point and last UNLOAD point — the headline origin → destination. */
export function routeEndpoints(points: RoutePoint[]): {
  origin: RoutePoint | null;
  destination: RoutePoint | null;
  stops: number;
} {
  if (!points || points.length === 0) {
    return { origin: null, destination: null, stops: 0 };
  }
  const sorted = [...points].sort((a, b) => a.point_order - b.point_order);
  const loads = sorted.filter((p) => p.type === "LOAD");
  const unloads = sorted.filter((p) => p.type === "UNLOAD");
  return {
    origin: loads[0] ?? sorted[0] ?? null,
    destination: unloads[unloads.length - 1] ?? sorted[sorted.length - 1] ?? null,
    stops: Math.max(0, sorted.length - 2),
  };
}

/** Build the text blob used for client-side search filtering. */
export function cargoSearchIndex(cargo: Cargo, lang: Lang): string {
  const parts: string[] = [
    cargoTypeName(cargo.cargo_type, lang),
    cargo.name ?? "",
    cargo.contact_name ?? "",
    cargo.contact_phone ?? "",
    cargo.truck_type ?? "",
    ...cargo.route_points.flatMap((p) => [p.city_name, p.address]),
  ];
  return parts.join(" ").toLowerCase();
}
