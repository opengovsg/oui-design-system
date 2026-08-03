"use client"

import { getLocalTimeZone, today } from "@internationalized/date"
import { RangeCalendar } from "@opengovsg/oui"

export default function RangeCalendarMinValue() {
  return (
    <RangeCalendar
      aria-label="Date (Min Date Value)"
      minValue={today(getLocalTimeZone())}
    />
  )
}
