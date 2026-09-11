import type { LocalizedStrings } from "@react-aria/i18n"

// Alias "en-US" to the English strings so react-aria's default locale
// fallback works for unsupported locales instead of throwing.
const enStrings = {
  "Select month": "Select month",
  "Select year": "Select year",
  Today: "Today",
}

export const i18nStrings = {
  "en-SG": enStrings,
  "en-US": enStrings,
  "zh-SG": {
    "Select month": "选择月份",
    "Select year": "选择年份",
    Today: "今天",
  },
  "ms-SG": {
    "Select month": "Pilih bulan",
    "Select year": "Pilih tahun",
    Today: "Hari ini",
  },
  "ta-SG": {
    "Select month": "மாதத்தை தேர்ந்தெடுக்கவும்",
    "Select year": "ஆண்டை தேர்ந்தெடுக்கவும்",
    Today: "இன்று",
  },
} satisfies LocalizedStrings
