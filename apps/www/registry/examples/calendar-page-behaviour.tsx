import { Calendar } from "@opengovsg/oui"

export default function CalendarPageBehaviour() {
  return (
    <Calendar
      aria-label="Date (Page Behavior)"
      visibleDuration={{ months: 2 }}
      pageBehavior="visible"
    />
  )
}
