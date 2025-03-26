"use client"

import { I18nProvider } from "@react-aria/i18n"

import { RangeCalendar } from "@opengovsg/oui"

export default function RangeCalendarInternational() {
  return (
    <I18nProvider locale="ta-SG">
      <RangeCalendar aria-label="Date (International RangeCalendar)" />
    </I18nProvider>
  )
}
