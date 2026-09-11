import type { LocalizedStrings } from "@react-aria/i18n"

// Alias "en-US" to the English strings so react-aria's default locale
// fallback works for unsupported locales instead of throwing.
const enStrings = {
  "Expand sidebar section": "Expand sidebar section",
  "Collapse sidebar section": "Collapse sidebar section",
}

export const i18nStrings = {
  "en-SG": enStrings,
  "en-US": enStrings,
  "zh-SG": {
    "Expand sidebar section": "展开侧边栏部分",
    "Collapse sidebar section": "折叠侧边栏部分",
  },
  "ms-SG": {
    "Expand sidebar section": "Perluas bahagian bar sisi",
    "Collapse sidebar section": "Kuncupkan bahagian bar sisi",
  },
  "ta-SG": {
    "Expand sidebar section": "பக்கவாட்டுப் பகுதியை விரிவாக்கு",
    "Collapse sidebar section": "பக்கவாட்டுப் பகுதியை சுருக்கு",
  },
} satisfies LocalizedStrings
