"use client"

import type { DateValue } from "@internationalized/date"
import { useState } from "react"
import { now } from "@internationalized/date"
import { I18nProvider } from "@react-aria/i18n"

import { DatePicker } from "@opengovsg/oui"

export default function DatePickerInternationalCalendar() {
  const [date, setDate] = useState<DateValue>(now("America/New_York"))

  return (
    <div className="flex w-full flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DatePicker
          label="Date"
          value={date}
          onChange={(value) => value && setDate(value)}
        />
      </I18nProvider>
    </div>
  )
}
