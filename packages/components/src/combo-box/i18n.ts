import type { LocalizedStrings } from "@react-aria/i18n"

// Alias "en-US" to the English strings so react-aria's default locale
// fallback works for unsupported locales instead of throwing.
const enStrings = {
  Clear: "Clear",
  "No matching results": "No matching results",
}

export const i18nStrings = {
  "en-SG": enStrings,
  "en-US": enStrings,
  "zh-SG": {
    Clear: "清除",
    "No matching results": "没有匹配的结果",
  },
  "ms-SG": {
    Clear: "Jelas",
    "No matching results": "Tiada hasil yang sepadan",
  },
  "ta-SG": {
    Clear: "தெளிவு",
    "No matching results": "பொருந்தும் முடிவுகள் இல்லை",
  },
} satisfies LocalizedStrings
