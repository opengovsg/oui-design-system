"use client"

import React from "react"
import { parseDate } from "@internationalized/date"

import { Calendar } from "@opengovsg/oui"

export default function CalendarControlled() {
  let [value, setValue] = React.useState(parseDate("2025-03-20"))

  return (
    <div className="flex flex-col gap-4">
      <Calendar
        aria-label="Date (Controlled)"
        value={value}
        onChange={setValue}
      />
      <div>Selected date: {value.toString()}</div>
    </div>
  )
}
