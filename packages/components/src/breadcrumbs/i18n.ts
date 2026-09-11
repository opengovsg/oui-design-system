import type { LocalizedStrings } from "@react-aria/i18n"

// Alias "en-US" to the English strings so react-aria's default locale
// fallback works for unsupported locales instead of throwing.
const enStrings = {
  "Show more navigation items": "Show more navigation items",
}

export const i18nStrings = {
  "en-SG": enStrings,
  "en-US": enStrings,
  "zh-SG": {
    "Show more navigation items": "显示更多导航项",
  },
  "ms-SG": {
    "Show more navigation items": "Tunjukkan lebih banyak item navigasi",
  },
  "ta-SG": {
    "Show more navigation items": "மேலும் வழிசெலுத்தல் உருப்படிகளைக் காட்டு",
  },
} satisfies LocalizedStrings
