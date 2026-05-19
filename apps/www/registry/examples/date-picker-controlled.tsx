"use client"

import type { CalendarDate } from "@internationalized/date"
import { useState } from "react"
import { getLocalTimeZone, parseDate } from "@internationalized/date"
import { useDateFormatter } from "@react-aria/i18n"

import { DatePicker } from "@opengovsg/oui"

export default function DatePickerControlled() {
  const [value, setValue] = useState<CalendarDate | null>(
    parseDate("2024-04-04"),
  )

  const formatter = useDateFormatter({ dateStyle: "full" })

  return (
    <div className="flex w-full flex-row gap-2">
      <div className="flex w-full flex-col gap-y-2">
        <DatePicker
          label="Date (controlled)"
          value={value}
          onChange={setValue}
        />
        <p className="text-default-500 text-sm">
          Selected date:{" "}
          {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
        </p>
      </div>
    </div>
  )
}
