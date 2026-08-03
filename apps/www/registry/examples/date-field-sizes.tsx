"use client"

import {
  parseAbsoluteToLocal,
  parseZonedDateTime,
} from "@internationalized/date"
import { DateField } from "@opengovsg/oui"

export default function DateFieldSizes() {
  return (
    <div className="flex w-full flex-col gap-4">
      <DateField
        size="xs"
        defaultValue={parseZonedDateTime(
          "2025-11-04T03:45[America/Los_Angeles]",
        )}
        label="Event date (xs)"
      />
      <DateField
        size="sm"
        defaultValue={parseAbsoluteToLocal("2025-11-04T03:45Z")}
        label="Event date (sm)"
      />
      <DateField
        size="md"
        defaultValue={parseZonedDateTime("2025-11-04T03:45[Asia/Tokyo]")}
        label="Event date (md)"
      />
    </div>
  )
}
