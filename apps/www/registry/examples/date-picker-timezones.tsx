"use client"

import {
  parseAbsoluteToLocal,
  parseZonedDateTime,
} from "@internationalized/date"

import { DatePicker } from "@opengovsg/oui"

export default function DatePickerTimezones() {
  return (
    <div className="flex w-full flex-col gap-4">
      <DatePicker
        defaultValue={parseZonedDateTime(
          "2025-11-04T03:45[America/Los_Angeles]",
        )}
        label="Event date"
      />
      <DatePicker
        defaultValue={parseAbsoluteToLocal("2025-11-04T03:45Z")}
        label="Event date"
      />
    </div>
  )
}
