"use client"

import { isWeekend } from "@internationalized/date"
import { RangeCalendar } from "@opengovsg/oui"
import { useLocale } from "@react-aria/i18n"

export default function RangeCalendarNonContiguousRanges() {
  const { locale } = useLocale()

  return (
    <RangeCalendar
      allowsNonContiguousRanges
      aria-label="Time off request"
      isDateUnavailable={(date) => isWeekend(date, locale)}
    />
  )
}
