"use client"

import { getLocalTimeZone, today } from "@internationalized/date"

import { Calendar } from "@opengovsg/oui"

export default function CalendarMaxValue() {
  return (
    <Calendar
      aria-label="Date (Max Date Value)"
      defaultValue={today(getLocalTimeZone())}
      maxValue={today(getLocalTimeZone())}
    />
  )
}
