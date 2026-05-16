# SARBON — Dispatcher Cargo Console

A redesigned **dispatcher cargo list** page for the Sarbon freight network. It
fetches cargo loads from the Sarbon API and presents them in a fast, modern,
fully responsive *"freight control panel"* interface with filtering,
pagination and three-language support (UZ / RU / EN).

> Built as a frontend test task. Single primary route: **`/dispatcher/cargo`**.

---

## ✨ Highlights

- **Real API integration** — `GET /v1/dispatchers/cargo/all` with all mandatory headers.
- **Tokens never reach the browser** — requests go through a Next.js server
  proxy (`/api/cargo`) that injects `X-Client-Token` / `X-User-Token` from
  server-only env. No JWT in the client bundle or the Network tab.
- **Filter panel** — status (drives the API `status` query), sort
  (drives the API `sort` query), plus instant client-side search.
- **Pagination** — Previous / Next, current page, and a 10 / 20 / 50 limit
  selector. Page & limit are wired straight to the API query.
- **Every state covered** — animated loading skeleton, error state with retry,
  and an empty state (distinct copy for "no data" vs. "no search match").
- **3 languages** — UZ / RU / EN, persisted to `localStorage`. The selected
  language is also forwarded upstream as the `X-Language` header.
- **Responsive** — dense data table on desktop, stacked cards on tablet/mobile.
- **Zero console errors** — verified with a headless end-to-end pass.

---

## 🧱 Tech stack

| Area        | Choice                                            |
| ----------- | ------------------------------------------------- |
| Framework   | **Next.js 16** (App Router) + **React 19**        |
| Language    | **TypeScript** (strict)                           |
| HTTP        | **Axios** (browser → same-origin proxy)           |
| Styling     | **Tailwind CSS v4**                               |
| Fonts       | `next/font` — Geologica · Onest · JetBrains Mono  |
| i18n        | Lightweight React Context (no heavy dependency)   |
| Deployment  | **Vercel** (recommended)                          |

---

## 🏗️ Architecture

```
Browser ──axios──▶ /api/cargo (Next.js Route Handler, server)
                        │  injects X-Device-Type / X-Language /
                        │  X-Client-Token / X-User-Token
                        ▼
              https://api.sarbon.me/v1/dispatchers/cargo/all
```

**Why a server proxy** instead of calling the API straight from the browser
(CORS is actually open)? It keeps the user JWT and client token in
**server-only** environment variables — they never appear in the JS bundle or
the browser Network tab — while still sending every mandatory header upstream.

```
src/
├─ app/
│  ├─ layout.tsx                 # fonts + i18n provider
│  ├─ page.tsx                   # /  → redirects to /dispatcher/cargo
│  ├─ dispatcher/cargo/page.tsx  # the main page (state orchestration)
│  └─ api/cargo/route.ts         # server proxy — injects required headers
├─ components/
│  ├─ layout/                    # Header, LanguageSwitcher
│  ├─ cargo/                     # Filters, Table, Card, Pagination, Route…
│  └─ states/                    # LoadingSkeleton, ErrorState, EmptyState
└─ lib/
   ├─ api/                       # axios client + cargo service (API logic)
   ├─ types/cargo.ts             # all TypeScript interfaces
   ├─ i18n/                      # translations + provider/hook
   ├─ hooks/useCargoList.ts      # abortable data-fetching hook
   └─ utils/format.ts            # money / weight / date / route helpers
```

---

## 🚀 Getting started

**Prerequisites:** Node.js ≥ 20.9 and npm.

```bash
# 1. install
npm install

# 2. configure env
cp .env.example .env.local
#   then fill in SARBON_CLIENT_TOKEN and SARBON_USER_TOKEN

# 3. run
npm run dev          # http://localhost:3000  → /dispatcher/cargo

# production
npm run build && npm run start
```

### Environment variables (server-only — no `NEXT_PUBLIC_`)

| Variable               | Description                               |
| ---------------------- | ----------------------------------------- |
| `SARBON_API_BASE_URL`  | API base, e.g. `https://api.sarbon.me/v1` |
| `SARBON_CLIENT_TOKEN`  | Value for the `X-Client-Token` header     |
| `SARBON_USER_TOKEN`    | Value for the `X-User-Token` header (JWT)  |

---

## ☁️ Deployment (Vercel)

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Add the three environment variables above under **Settings → Environment
   Variables** (Production + Preview).
4. Deploy. No extra configuration is required — the API route runs as a
   serverless function.

---

## ✅ Evaluation criteria — mapping

| Criterion                | Where it's handled                                       |
| ------------------------ | -------------------------------------------------------- |
| API used correctly       | `src/app/api/cargo/route.ts`, `src/lib/api/cargo.ts`     |
| Mandatory headers sent   | injected server-side in the route handler                |
| Cargo rendered cleanly   | `CargoTable` / `CargoCard` + route/payment subcomponents |
| Filter works             | `CargoFilters` (status & sort → API, search → client)    |
| Pagination works         | `Pagination` (page & limit → API query)                  |
| UI/UX quality            | "freight control panel" design system in `globals.css`   |
| Responsive design        | table ↔ cards, tested at mobile/tablet/desktop           |
| Code structure           | typed `lib/`, isolated API layer, focused components      |
| Deployment               | Vercel-ready (see above)                                  |

---

## 📜 Scripts

| Command         | Purpose                      |
| --------------- | ---------------------------- |
| `npm run dev`   | Dev server                   |
| `npm run build` | Production build + typecheck |
| `npm run start` | Run the production build     |
| `npm run lint`  | ESLint                       |
