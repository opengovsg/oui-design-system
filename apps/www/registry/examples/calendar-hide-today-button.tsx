import { Calendar } from "@opengovsg/oui"

export default function CalendarHideTodayButton() {
  return (
    <Calendar aria-label="Date (Hide Today Button)" showTodayButton={false} />
  )
}
