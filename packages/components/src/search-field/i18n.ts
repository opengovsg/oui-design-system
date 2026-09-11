import type { LocalizedStrings } from "@react-aria/i18n"

// Alias "en-US" to the English strings so react-aria's default locale
// fallback works for unsupported locales instead of throwing.
const enStrings = {
  Search: "Search",
}

export const i18nStrings = {
  "en-SG": enStrings,
  "en-US": enStrings,
  "zh-SG": {
    Search: "搜索",
  },
  "ms-SG": {
    Search: "Cari",
  },
  "ta-SG": {
    Search: "தேடு",
  },
} satisfies LocalizedStrings
