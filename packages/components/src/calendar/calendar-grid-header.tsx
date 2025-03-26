"use client"

import {
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarHeaderCell,
} from "react-aria-components"

import { useCalendarStyleContext } from "./calendar-style-context"

export function CalendarGridHeader() {
  const { slots, classNames } = useCalendarStyleContext()
  return (
    <AriaCalendarGridHeader
      className={slots.gridHeader({ className: classNames?.gridHeader })}
    >
      {(day) => (
        <CalendarHeaderCell
          className={slots.gridHeaderCell({
            className: classNames?.gridHeaderCell,
          })}
        >
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  )
}
