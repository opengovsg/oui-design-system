import type { LocalizedStrings } from "@react-aria/i18n"

// Alias "en-US" to the English strings so react-aria's default locale
// fallback works for unsupported locales instead of throwing.
const enStrings = {
  "Search...": "Search...",
  "Search options": "Search options",
}

export const i18nStrings = {
  "en-SG": enStrings,
  "en-US": enStrings,
  "zh-SG": {
    "Search...": "搜索...",
    "Search options": "搜索选项",
  },
  "ms-SG": {
    "Search...": "Cari...",
    "Search options": "Cari pilihan",
  },
  "ta-SG": {
    "Search...": "தேடு...",
    "Search options": "தேடல் விருப்பங்கள்",
  },
} satisfies LocalizedStrings
