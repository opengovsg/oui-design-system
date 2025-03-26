import { RangeCalendar } from "@opengovsg/oui"

export default function RangeCalendarVisibleDuration() {
  return (
    <RangeCalendar
      aria-label="Date (Visible Duration)"
      visibleDuration={{ months: 3 }}
    />
  )
}
