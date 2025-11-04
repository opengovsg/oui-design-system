"use client"

import { parseAbsoluteToLocal } from "@internationalized/date"
import { I18nProvider } from "@react-aria/i18n"

import { DateRangePicker } from "@opengovsg/oui"

export default function DateRangePickerInternationalCalendar() {
  return (
    <I18nProvider locale="hi-IN-u-ca-indian">
      <DateRangePicker
        label="Date range"
        defaultValue={{
          start: parseAbsoluteToLocal("2021-04-01T18:45:22Z"),
          end: parseAbsoluteToLocal("2021-04-08T18:45:22Z"),
        }}
      />
    </I18nProvider>
  )
}
