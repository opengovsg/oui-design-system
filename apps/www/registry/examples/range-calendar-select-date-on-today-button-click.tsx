import { RangeCalendar } from "@opengovsg/oui"

export default function RangeCalendarSelectDateOnTodayButtonClick() {
  return (
    <RangeCalendar
      aria-label="Date (Select Date Range on Today Button Click)"
      shouldSetDateOnTodayButtonClick
    />
  )
}
