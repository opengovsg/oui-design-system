"use client"

import { getLocalTimeZone, isWeekend, today } from "@internationalized/date"
import { DatePicker } from "@opengovsg/oui"
import { useLocale } from "@react-aria/i18n"

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
