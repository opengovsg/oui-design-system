import { Calendar } from "@opengovsg/oui"

export default function CalendarSelectDateOnTodayButtonClick() {
  return (
    <Calendar
      aria-label="Date (Select Date on Today Button Click)"
      shouldSetDateOnTodayButtonClick
    />
  )
}
