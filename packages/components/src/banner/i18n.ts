import type { LocalizedStrings } from "@react-aria/i18n"

// Alias "en-US" to the English strings so react-aria's default locale
// fallback works for unsupported locales instead of throwing.
const enStrings = {
  "Close banner": "Close banner",
}

export const i18nStrings = {
  "en-SG": enStrings,
  "en-US": enStrings,
  "zh-SG": {
    "Close banner": "关闭横幅",
  },
  "ms-SG": {
    "Close banner": "Tutup sepanduk",
  },
  "ta-SG": {
    "Close banner": "உடைகளை மூடுங்கள்",
  },
} satisfies LocalizedStrings
