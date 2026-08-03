"use client"

import { RangeCalendar } from "@opengovsg/oui"
import { I18nProvider } from "@react-aria/i18n"

export default function RangeCalendarInternational() {
  return (
    <I18nProvider locale="ta-SG">
      <RangeCalendar aria-label="Date (International RangeCalendar)" />
    </I18nProvider>
  )
}
