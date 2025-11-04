"use client"

import { parseZonedDateTime } from "@internationalized/date"

import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerTimezones() {
  return (
    <DateRangePicker
      label="Meeting time"
      defaultValue={{
        start: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
        end: parseZonedDateTime("2022-11-08T11:15[America/Los_Angeles]"),
      }}
    />
  )
}
