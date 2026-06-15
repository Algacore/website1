// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
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
