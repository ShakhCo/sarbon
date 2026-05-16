import axios from "axios";

/**
 * Axios instance pointed at our own same-origin proxy (`/api/*`).
 * The mandatory upstream auth headers are attached server-side in
 * `src/app/api/cargo/route.ts`, never here in the browser.
 */
export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 20_000,
  headers: { Accept: "application/json" },
});
