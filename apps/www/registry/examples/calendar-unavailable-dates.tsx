"use client"

import {
  DateValue,
  getLocalTimeZone,
  isWeekend,
  today,
} from "@internationalized/date"
import { useLocale } from "@react-aria/i18n"

import { Calendar } from "@opengovsg/oui"

export default function CalendarUnavailableDates() {
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
    <Calendar
      aria-label="Date (Unavailable)"
      isDateUnavailable={isDateUnavailable}
    />
  )
}
