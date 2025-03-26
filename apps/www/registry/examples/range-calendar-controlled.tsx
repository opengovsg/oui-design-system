"use client"

import React from "react"
import { getLocalTimeZone, today } from "@internationalized/date"

import { RangeCalendar } from "@opengovsg/oui"

export default function RangeCalendarControlled() {
  let [value, setValue] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  })

  return (
    <RangeCalendar
      aria-label="Date (Controlled)"
      value={value}
      onChange={setValue}
    />
  )
}
