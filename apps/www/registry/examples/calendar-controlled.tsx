"use client"

import React from "react"
import { parseDate } from "@internationalized/date"

import { Calendar } from "@opengovsg/oui"

export default function CalendarControlled() {
  let [value, setValue] = React.useState(parseDate("2025-03-20"))

  return (
    <Calendar
      aria-label="Date (Controlled)"
      value={value}
      onChange={setValue}
    />
  )
}
