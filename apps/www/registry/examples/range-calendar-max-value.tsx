"use client"

import { getLocalTimeZone, today } from "@internationalized/date"

import { RangeCalendar } from "@opengovsg/oui"

export default function RangeCalendarMaxValue() {
  return (
    <RangeCalendar
      aria-label="Date (Max Date Value)"
      maxValue={today(getLocalTimeZone())}
    />
  )
}
