// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";

// Node-capable target: pages are prerendered (static + fast), while the
// /api/contact endpoint runs on the server so the form has a real backend.
// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  // Routed i18n: PT (default) at "/", EN at "/en/". No prefix on the default
  // locale keeps the primary market on clean root URLs.
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
