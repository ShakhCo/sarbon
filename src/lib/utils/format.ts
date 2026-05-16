import type {
  Cargo,
  CargoPayment,
  CargoTypeRef,
  RoutePoint,
} from "@/lib/types/cargo";
import { TRANSLATIONS, type Lang } from "@/lib/i18n/translations";

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

export function formatWeight(weight: number | null, lang: Lang): string {
  if (weight == null) return "—";
  return `${new Intl.NumberFormat(LOCALE_BY_LANG[lang]).format(weight)} t`;
}

export function formatVolume(volume: number | null, lang: Lang): string {
  if (volume == null) return "—";
  return `${new Intl.NumberFormat(LOCALE_BY_LANG[lang]).format(volume)} m³`;
}

/** "05.05.2026 05:00" — matches the Sarbon product table. */
export function formatRouteDateTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(
    d.getHours(),
  )}:${p(d.getMinutes())}`;
}

export function timeAgo(iso: string, lang: Lang): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  const rtf = new Intl.RelativeTimeFormat(LOCALE_BY_LANG[lang], {
    numeric: "auto",
  });
  if (Math.abs(mins) < 60) return rtf.format(-mins, "minute");
  const hours = Math.round(mins / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  return rtf.format(-days, "day");
}

/* ── ISO-2 country → ISO-3 label + flag emoji ─────────────── */

const ISO3: Record<string, string> = {
  UZ: "UZB",
  RU: "RUS",
  KZ: "KAZ",
  KG: "KGZ",
  TJ: "TJK",
  TM: "TKM",
  AF: "AFG",
  PK: "PAK",
  CN: "CHN",
  IR: "IRN",
  TR: "TUR",
  AZ: "AZE",
  GE: "GEO",
  AM: "ARM",
  UA: "UKR",
  BY: "BLR",
  IN: "IND",
  AE: "ARE",
};

export function countryLabel(code: string | null | undefined): string {
  if (!code) return "—";
  const c = code.trim().toUpperCase();
  return ISO3[c] ?? c;
}

/** Real flag image (consistent across OSes, unlike emoji flags). */
export function flagUrl(code: string | null | undefined): string | null {
  if (!code) return null;
  const c = code.trim().toLowerCase();
  if (!/^[a-z]{2}$/.test(c)) return null;
  return `https://flagcdn.com/w40/${c}.png`;
}

/* ── payment ──────────────────────────────────────────────── */

const CURRENCY_SYMBOL: Record<string, string> = {
  USD: "$",
  RUB: "₽",
  EUR: "€",
};

function moneyText(amount: number, currency: string, lang: Lang): string {
  const sym = CURRENCY_SYMBOL[currency];
  if (sym) {
    // Symbol currencies use comma grouping to match the product ($3,000).
    return `${sym}${new Intl.NumberFormat("en-US").format(amount)}`;
  }
  const n = new Intl.NumberFormat(LOCALE_BY_LANG[lang]).format(amount);
  return `${n} ${currency}`;
}

export interface PriceView {
  amount: string;
  method: string | null;
  note: string | null; // "negotiable" / "on request" sentinel handled by caller
  kind: "amount" | "negotiable" | "request";
}

export function priceView(
  payment: CargoPayment | null,
  lang: Lang,
): PriceView {
  const t = TRANSLATIONS[lang];
  if (!payment || payment.price_request) {
    return { amount: t.table.onRequest, method: null, note: null, kind: "request" };
  }
  const method =
    payment.prepayment_type ||
    payment.remaining_type ||
    payment.prepayment_items?.[0]?.method ||
    payment.remaining_items?.[0]?.method ||
    null;
  const methodLabel = method
    ? t.pay[method as keyof typeof t.pay] ?? method
    : null;
  return {
    amount: moneyText(payment.total_amount, payment.total_currency, lang),
    method: methodLabel,
    note: payment.is_negotiable ? t.table.negotiable : null,
    kind: "amount",
  };
}

/* ── transport / cargo helpers ────────────────────────────── */

export function transportLine(c: Cargo, lang: Lang): string {
  const { truck, power } = TRANSLATIONS[lang];
  const parts = [
    c.truck_type ? truck[c.truck_type] ?? c.truck_type : null,
    c.power_plate_type
      ? power[c.power_plate_type] ?? c.power_plate_type
      : null,
  ].filter(Boolean);
  return parts.length ? parts.join(" / ") : "—";
}

export function directionLabels(types: string[], lang: Lang): string {
  if (!types?.length) return "";
  const { load } = TRANSLATIONS[lang];
  return types.map((x) => load[x] ?? x).join(", ");
}

/** Avatar initials = first two letters, product-style ("John_Doe" → "JO"). */
export function initials(name: string | null): string {
  if (!name) return "—";
  const letters = name.replace(/[^a-zA-Zа-яА-Я0-9]/g, "");
  return letters.slice(0, 2).toUpperCase() || "—";
}

/* ── route ────────────────────────────────────────────────── */

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
    destination:
      unloads[unloads.length - 1] ?? sorted[sorted.length - 1] ?? null,
    stops: Math.max(0, sorted.length - 2),
  };
}

/** Distinct values helper for building filter dropdowns from loaded data. */
export function uniqueSorted(values: (string | null | undefined)[]): string[] {
  return [...new Set(values.filter((v): v is string => !!v && v !== "—"))].sort(
    (a, b) => a.localeCompare(b),
  );
}

/** Text blob used for the client-side search box. */
export function cargoSearchIndex(cargo: Cargo, lang: Lang): string {
  return [
    cargoTypeName(cargo.cargo_type, lang),
    cargo.name ?? "",
    cargo.contact_name ?? "",
    cargo.contact_phone ?? "",
    cargo.truck_type ?? "",
    ...cargo.route_points.flatMap((p) => [p.city_name, p.city_code, p.address]),
  ]
    .join(" ")
    .toLowerCase();
}
