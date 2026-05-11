// src/authix.ts
import { NeuctraAuthix } from "@neuctra/authix";

export const authix = new NeuctraAuthix({
  baseUrl: import.meta.env.VITE_NEUCTRA_AUTHIX_BASE_URL,
  apiKey: import.meta.env.VITE_NEUCTRA_AUTHIX_API_KEY,
  appId: import.meta.env.VITE_NEUCTRA_AUTHIX_APP_ID,
});