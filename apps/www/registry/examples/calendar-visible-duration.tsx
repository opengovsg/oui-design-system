import { Calendar } from "@opengovsg/oui"

export default function CalendarVisibleDuration() {
  return (
    <Calendar
      aria-label="Date (Visible Duration)"
      visibleDuration={{ months: 3 }}
    />
  )
}
