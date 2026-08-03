"use client"

import { parseAbsoluteToLocal } from "@internationalized/date"
import { DatePicker } from "@opengovsg/oui"
import { useDateFormatter } from "@react-aria/i18n"
import { useState } from "react"

export default function DatePickerGranularity() {
  const [date, setDate] = useState(parseAbsoluteToLocal("2025-11-04T03:45:00Z"))

  const formatter = useDateFormatter({
    dateStyle: "short",
    timeStyle: "long",
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <DatePicker
        granularity="second"
        label="Date and time"
        value={date}
        onChange={(value) => value && setDate(value)}
      />
      <p className="text-default-500 text-sm">
        Selected date and time: {date ? formatter.format(date.toDate()) : "--"}
      </p>
    </div>
  )
}
