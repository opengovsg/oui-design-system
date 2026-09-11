import type { LocalizedStrings } from "@react-aria/i18n"

// Alias "en-US" to the English strings so react-aria's default locale
// fallback works for unsupported locales instead of throwing.
const enStrings = {
  "Close badge": "Close badge",
}

export const i18nStrings = {
  "en-SG": enStrings,
  "en-US": enStrings,
  "zh-SG": {
    "Close badge": "关闭徽章",
  },
  "ms-SG": {
    "Close badge": "Tutup lencana",
  },
  "ta-SG": {
    "Close badge": "பேட்ஜை மூடு",
  },
} satisfies LocalizedStrings
