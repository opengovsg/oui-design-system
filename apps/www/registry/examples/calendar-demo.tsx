"use client"

import { parseDate } from "@internationalized/date"

import { Calendar } from "@opengovsg/oui"

export default function CalendarDemo() {
  return (
    <div className="flex gap-x-4">
      <Calendar aria-label="Date (No Selection)" />
      <Calendar
        aria-label="Date (Uncontrolled)"
        defaultValue={parseDate("2020-02-03")}
      />
    </div>
  )
}
