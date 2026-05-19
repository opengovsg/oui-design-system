"use client"

import React from "react"
import { getLocalTimeZone, today } from "@internationalized/date"

import { RangeCalendar } from "@opengovsg/oui"

export default function RangeCalendarControlled() {
  const [value, setValue] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  })

  return (
    <div className="flex flex-col gap-4">
      <RangeCalendar
        aria-label="Date (Controlled)"
        value={value}
        onChange={setValue}
      />
      <div>
        Selected dates: {value.start.toString()} - {value.end.toString()}
      </div>
    </div>
  )
}
