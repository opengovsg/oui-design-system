"use client"

import { getLocalTimeZone, isWeekend, today } from "@internationalized/date"
import { useLocale } from "@react-aria/i18n"

import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerUnavailableDates() {
  const { locale } = useLocale()
  const now = today(getLocalTimeZone())
  const disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ]

  const isDateUnavailable = (date: any) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
    )

  return (
    <DateRangePicker
      label="Trip dates"
      minValue={today(getLocalTimeZone())}
      calendarProps={{
        isDateUnavailable,
      }}
    />
  )
}
