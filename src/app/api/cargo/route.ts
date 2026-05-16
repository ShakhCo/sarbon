import { NextRequest, NextResponse } from "next/server";
import type { ApiEnvelope, CargoListData } from "@/lib/types/cargo";

/**
 * Server-side proxy for the Sarbon dispatcher cargo endpoint.
 *
 * Why a proxy instead of calling the API straight from the browser:
 *  - The X-User-Token (JWT) and X-Client-Token stay in server-only env
 *    and never ship in the client bundle or appear in the Network tab.
 *  - The mandatory headers are still sent to the upstream API.
 *  - The browser only talks to our own same-origin endpoint.
 */

export const dynamic = "force-dynamic";

const API_BASE = process.env.SARBON_API_BASE_URL ?? "https://api.sarbon.me/v1";
const CLIENT_TOKEN = process.env.SARBON_CLIENT_TOKEN ?? "";
const USER_TOKEN = process.env.SARBON_USER_TOKEN ?? "";

const ALLOWED_LANGS = new Set(["uz", "ru", "en"]);

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const page = Math.max(1, Number(sp.get("page") ?? 1) || 1);
  const limit = Math.max(1, Number(sp.get("limit") ?? 20) || 20);
  const status = sp.get("status") || "SEARCHING_ALL";
  const sort = sp.get("sort") || "created_at:desc";
  const langParam = (sp.get("lang") || "uz").toLowerCase();
  const lang = ALLOWED_LANGS.has(langParam) ? langParam : "uz";

  if (!CLIENT_TOKEN || !USER_TOKEN) {
    return NextResponse.json(
      { error: "server_misconfigured", message: "Missing API tokens. Set SARBON_CLIENT_TOKEN and SARBON_USER_TOKEN." },
      { status: 500 },
    );
  }

  const upstream = new URL(`${API_BASE}/dispatchers/cargo/all`);
  upstream.searchParams.set("page", String(page));
  upstream.searchParams.set("limit", String(limit));
  upstream.searchParams.set("status", status);
  upstream.searchParams.set("sort", sort);

  try {
    const res = await fetch(upstream.toString(), {
      method: "GET",
      headers: {
        accept: "*/*",
        "X-Device-Type": "web",
        "X-Language": lang,
        "X-Client-Token": CLIENT_TOKEN,
        "X-User-Token": USER_TOKEN,
      },
      cache: "no-store",
    });

    const text = await res.text();
    let json: ApiEnvelope<CargoListData> | { description?: string } | null = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "upstream_error",
          status: res.status,
          message:
            (json && "description" in json && json.description) ||
            `Upstream responded with ${res.status}`,
        },
        { status: res.status >= 400 && res.status < 600 ? res.status : 502 },
      );
    }

    return NextResponse.json(json, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "network_error", message: "Could not reach the Sarbon API." },
      { status: 502 },
    );
  }
}
