import type { ForwardedRef, ReactElement } from "react"
import { DateValue } from "@react-types/calendar"

import { forwardRef } from "../system/utils"
import { CalendarBase } from "./calendar-base"
import { CalendarProvider } from "./calendar-context"
import { useCalendar, UseCalendarProps } from "./use-calendar"

export const Calendar = forwardRef(function Calendar<T extends DateValue>(
  props: UseCalendarProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { calendarProps, context } = useCalendar<T>(props)

  return (
    <CalendarProvider value={context}>
      <CalendarBase calendarRef={ref} {...calendarProps} />
    </CalendarProvider>
  )
}) as <T extends DateValue>(props: UseCalendarProps<T>) => ReactElement
