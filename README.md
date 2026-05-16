# SARBON — Dispatcher Cargo Console

A dispatcher cargo list page for the Sarbon freight network. It fetches cargo
loads from the Sarbon API and shows them in a fast, responsive interface with
filtering, pagination and three-language support (UZ / RU / EN).

Primary route: **`/dispatcher/cargo`**.

---

## 🧱 Tech stack

| Area        | Choice                                            |
| ----------- | ------------------------------------------------- |
| Framework   | **Next.js 16** (App Router) + **React 19**        |
| Language    | **TypeScript** (strict)                           |
| HTTP        | **Axios** (browser → same-origin proxy)           |
| UI          | **shadcn/ui** (Base UI primitives) + **Tailwind CSS v4** |
| Fonts       | `next/font` — Manrope (Latin + Cyrillic)          |
| i18n        | Lightweight React Context + `useSyncExternalStore` |
| Deployment  | **Vercel** (recommended)                          |

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

## 📜 Scripts

| Command         | Purpose                      |
| --------------- | ---------------------------- |
| `npm run dev`   | Dev server                   |
| `npm run build` | Production build + typecheck |
| `npm run start` | Run the production build     |
| `npm run lint`  | ESLint                       |
