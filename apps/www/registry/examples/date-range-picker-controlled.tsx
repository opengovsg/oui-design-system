"use client"

import { useState } from "react"
import { CalendarDate } from "@internationalized/date"
import { useDateFormatter } from "@react-aria/i18n"

import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerControlled() {
  const [value, setValue] = useState<{
    start: CalendarDate
    end: CalendarDate
  } | null>({
    start: new CalendarDate(2024, 7, 1),
    end: new CalendarDate(2024, 7, 8),
  })

  const formatter = useDateFormatter({ dateStyle: "long" })

  return (
    <div className="flex flex-col gap-4">
      <DateRangePicker label="Event date" value={value} onChange={setValue} />
      <p className="text-muted-foreground text-sm">
        Selected date range:{" "}
        {value
          ? `${formatter.format(value.start.toDate("UTC"))} to ${formatter.format(value.end.toDate("UTC"))}`
          : "--"}
      </p>
    </div>
  )
}
