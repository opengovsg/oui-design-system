"use client"

import type { DateValue } from "@internationalized/date"
import { now } from "@internationalized/date"
import { DatePicker } from "@opengovsg/oui"
import { I18nProvider } from "@react-aria/i18n"
import { useState } from "react"

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
