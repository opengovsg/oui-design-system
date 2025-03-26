import { RangeCalendar } from "@opengovsg/oui"

export default function RangeCalendarPageBehaviour() {
  return (
    <RangeCalendar
      aria-label="Date (Page Behavior)"
      visibleDuration={{ months: 2 }}
      pageBehavior="visible"
    />
  )
}
