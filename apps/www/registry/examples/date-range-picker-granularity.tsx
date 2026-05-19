"use client"

import type { ZonedDateTime } from "@internationalized/date"
import { useState } from "react"
import { parseAbsoluteToLocal } from "@internationalized/date"
import { useDateFormatter } from "@react-aria/i18n"

import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerGranularity() {
  const [value, setValue] = useState<{
    start: ZonedDateTime
    end: ZonedDateTime
  } | null>({
    start: parseAbsoluteToLocal("2021-04-07T18:45:22Z"),
    end: parseAbsoluteToLocal("2021-04-08T20:00:00Z"),
  })

  const formatter = useDateFormatter({ dateStyle: "short", timeStyle: "long" })

  return (
    <div className="flex flex-col gap-4">
      <DateRangePicker
        label="Date and time range"
        granularity="second"
        value={value}
        onChange={setValue}
      />
      <p className="text-muted-foreground text-sm">
        Selected date range:{" "}
        {value && value.start && value.end
          ? `${formatter.format(value.start.toDate())} to ${formatter.format(value.end.toDate())}`
          : "--"}
      </p>
    </div>
  )
}
