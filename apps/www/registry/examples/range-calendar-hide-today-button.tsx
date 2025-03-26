import { RangeCalendar } from "@opengovsg/oui"

export default function RangeCalendarHideTodayButton() {
  return (
    <RangeCalendar
      aria-label="Date (Hide Today Button)"
      showTodayButton={false}
    />
  )
}
