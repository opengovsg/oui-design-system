"use client"

import { isWeekend } from "@internationalized/date"
import { useLocale } from "@react-aria/i18n"

import { RangeCalendar } from "@opengovsg/oui"

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
