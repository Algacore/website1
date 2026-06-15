// Routed i18n. PT is the default locale on root URLs ("/"); EN lives under
// "/en/". The whole site is a single long page per language, so in-page
// navigation uses hash anchors that are identical across both.

export const languages = {
  pt: "Português",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "pt";

export const localeAttr: Record<Lang, string> = {
  pt: "pt-BR",
  en: "en",
};

/** Resolve the active language from an Astro URL ("/en/..." → "en"). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split("/");
  if (seg === "en") return "en";
  return "pt";
}

/** Home path for a given language ("/" for PT, "/en/" for EN). */
export function homePath(lang: Lang): string {
  return lang === "pt" ? "/" : "/en/";
}

/** The other language, for the toggle. */
export function otherLang(lang: Lang): Lang {
  return lang === "pt" ? "en" : "pt";
}
