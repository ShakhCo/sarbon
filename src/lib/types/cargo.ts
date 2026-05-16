/**
 * Domain types for the Sarbon dispatcher cargo API.
 * Modelled directly on `GET /v1/dispatchers/cargo/all`.
 */

export type CargoStatus = "SEARCHING_ALL" | "COMPLETED" | (string & {});

export type RoutePointType = "LOAD" | "UNLOAD";

export type Currency = "USD" | "UZS" | (string & {});

export type PaymentMethod = "CASH" | "CARD" | "ON_DELIVERY" | (string & {});

export interface CargoTypeRef {
  id: string;
  code: string;
  name_en: string;
  name_ru: string;
  name_uz: string;
  name_tr: string;
  name_zh: string;
}

export interface RoutePoint {
  id: string;
  cargo_id: string;
  type: RoutePointType;
  address: string;
  city_name: string;
  city_code: string;
  country_code: string;
  date: string | null;
  delivery_asap: boolean;
  point_order: number;
  lat: number;
  lng: number;
  orientir: string;
  comment: string | null;
}

export interface PaymentItem {
  amount: number;
  currency: Currency;
  method: PaymentMethod;
}

export interface CargoPayment {
  id: string;
  cargo_id: string;
  is_negotiable: boolean;
  price_request: boolean;
  with_prepayment: boolean;
  total_amount: number;
  total_currency: Currency;
  prepayment_amount: number;
  prepayment_currency: Currency;
  prepayment_type: string | null;
  prepayment_items: PaymentItem[];
  remaining_amount: number;
  remaining_currency: Currency;
  remaining_type: string | null;
  remaining_items: PaymentItem[];
  payment_note: string | null;
  payment_terms_note: string | null;
}

export interface Cargo {
  id: string;
  name: string | null;
  comment: string | null;
  status: CargoStatus;
  cargo_type: CargoTypeRef | null;
  weight: number | null;
  volume: number | null;
  truck_type: string | null;
  trailer_plate_type: string | null;
  power_plate_type: string | null;
  adr_enabled: boolean;
  adr_class: string | null;
  is_two_drivers_required: boolean;
  is_liked: boolean;
  vehicles_amount: number | null;
  vehicles_left: number | null;
  contact_name: string | null;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
  route_points: RoutePoint[];
  payment: CargoPayment | null;
  documents: Record<string, boolean> | null;
  loading_types: string[];
  unloading_types: string[];
  photos: string[];
}

/** Envelope returned by the Sarbon API. */
export interface ApiEnvelope<T> {
  status: string;
  code: number;
  description: string;
  data: T;
}

export interface CargoListData {
  items: Cargo[];
  total: number;
}

/** Query accepted by our `/api/cargo` proxy (mirrors upstream). */
export interface CargoListQuery {
  page: number;
  limit: number;
  status: CargoStatus;
  sort: string;
}

/** Normalised result the UI consumes. */
export interface CargoListResult {
  items: Cargo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
