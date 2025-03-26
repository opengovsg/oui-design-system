"use client"

import { useState } from "react"
import { getLocalTimeZone, isWeekend, today } from "@internationalized/date"
import { useLocale } from "@react-aria/i18n"

import { RangeCalendar } from "@opengovsg/oui"

export default function RangeCalendarInvalidDate() {
  const [date, setDate] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  })
  const { locale } = useLocale()
  const isInvalid = isWeekend(date.start, locale) || isWeekend(date.end, locale)

  return (
    <RangeCalendar
      aria-label="Date (Invalid on weekends)"
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
      isInvalid={isInvalid}
      value={date}
      onChange={setDate}
    />
  )
}
