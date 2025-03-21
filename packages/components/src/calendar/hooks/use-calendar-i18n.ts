import type { LocalizedStrings } from "react-aria"
import { useMessageFormatter } from "react-aria"

export const i18nStrings: LocalizedStrings = {
  "en-SG": {
    selectMonth: "Select month",
    selectYear: "Select year",
    today: "Today",
  },
  "zh-SG": {
    selectMonth: "选择月份",
    selectYear: "选择年份",
    today: "今天",
  },
  "ms-SG": {
    selectMonth: "Pilih bulan",
    selectYear: "Pilih tahun",
    today: "Hari ini",
  },
  "ta-SG": {
    selectMonth: "மாதத்தை தேர்ந்தெடுக்கவும்",
    selectYear: "ஆண்டை தேர்ந்தெடுக்கவும்",
    today: "இன்று",
  },
}

export const useCalendarI18n = () => {
  return useMessageFormatter(i18nStrings)
}
