"use client"

import { getLocalTimeZone, today } from "@internationalized/date"
import { RangeCalendar } from "@opengovsg/oui"

export default function RangeCalendarDemo() {
  return (
    <div className="flex gap-x-4">
      <RangeCalendar aria-label="Date (No Selection)" />
      <RangeCalendar
        aria-label="Date (Uncontrolled)"
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone()).add({ weeks: 1 }),
        }}
      />
    </div>
  )
}
