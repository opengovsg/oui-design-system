"use client"

import { I18nProvider } from "@react-aria/i18n"

import { Calendar } from "@opengovsg/oui"

export default function CalendarInternational() {
  return (
    <I18nProvider locale="zh-SG">
      <Calendar aria-label="Date (International Calendar)" />
    </I18nProvider>
  )
}
