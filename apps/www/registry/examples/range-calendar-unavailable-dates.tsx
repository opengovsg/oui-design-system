"use client"

import type { DateValue } from "@internationalized/date"
import { getLocalTimeZone, isWeekend, today } from "@internationalized/date"
import { RangeCalendar } from "@opengovsg/oui"
import { useLocale } from "@react-aria/i18n"

export default function RangeCalendarUnavailableDates() {
  const now = today(getLocalTimeZone())

  const disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ]

  const { locale } = useLocale()

  const isDateUnavailable = (date: DateValue) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
    )

  return (
    <RangeCalendar
      aria-label="Date (Unavailable)"
      isDateUnavailable={isDateUnavailable}
    />
  )
}
