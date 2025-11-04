"use client"

import { getLocalTimeZone, parseDate, today } from "@internationalized/date"

import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerMinMax() {
  return (
    <DateRangePicker
      label="Trip dates"
      minValue={today(getLocalTimeZone())}
      maxValue={parseDate("2025-12-31")}
      defaultValue={{
        start: parseDate("2025-07-03"),
        end: parseDate("2025-07-10"),
      }}
      calendarProps={{
        isDateUnavailable: (date) =>
          date.compare(today(getLocalTimeZone())) < 0 ||
          date.compare(parseDate("2025-12-31")) > 0,
      }}
    />
  )
}
