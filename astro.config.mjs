// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Pages whose PT and EN slugs differ, so the sitemap integration cannot pair
// them the way it pairs "/" with "/en/". The head hreflang tags already carry
// these pairs; this mirrors them into the sitemap. Keep in sync with
// legalPath() and privacyPath() in src/i18n/config.ts.
const translationPairs = [
  ["/aviso-legal/", "/en/legal-notice/"],
  ["/privacidade/", "/en/privacy/"],
];

export default defineConfig({
  site: "https://algacore.com.br",
  output: "static",
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "pt",
        locales: { pt: "pt-BR", en: "en" },
      },
      serialize(item) {
        if (item.links?.length) return item;
        const { pathname, origin } = new URL(item.url);
        const pair = translationPairs.find((p) => p.includes(pathname));
        if (pair) {
          item.links = [
            { lang: "pt-BR", url: new URL(pair[0], origin).toString() },
            { lang: "en", url: new URL(pair[1], origin).toString() },
          ];
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
