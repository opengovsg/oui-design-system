"use client"

import { getLocalTimeZone, isWeekend, today } from "@internationalized/date"
import { useLocale } from "@react-aria/i18n"

import { DatePicker } from "@opengovsg/oui"

export default function DatePickerUnavailableDates() {
  const { locale } = useLocale()

  return (
    <DatePicker
      label="Appointment date"
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={(date) => isWeekend(date, locale)}
    />
  )
}
