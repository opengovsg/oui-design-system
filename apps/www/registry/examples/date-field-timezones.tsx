"use client"

import {
  parseAbsoluteToLocal,
  parseZonedDateTime,
} from "@internationalized/date"

import { DateField } from "@opengovsg/oui"

export default function DateFieldTimezones() {
  return (
    <div className="flex w-full flex-col gap-4">
      <DateField
        defaultValue={parseZonedDateTime(
          "2025-11-04T03:45[America/Los_Angeles]",
        )}
        label="Event date"
      />
      <DateField
        defaultValue={parseAbsoluteToLocal("2025-11-04T03:45Z")}
        label="Event date"
      />
    </div>
  )
}
