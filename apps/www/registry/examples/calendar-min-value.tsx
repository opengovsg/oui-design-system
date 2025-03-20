"use client"

import { getLocalTimeZone, today } from "@internationalized/date"

import { Calendar } from "@opengovsg/oui"

export default function CalendarMinValue() {
  return (
    <Calendar
      aria-label="Date (Min Date Value)"
      defaultValue={today(getLocalTimeZone())}
      minValue={today(getLocalTimeZone())}
    />
  )
}
