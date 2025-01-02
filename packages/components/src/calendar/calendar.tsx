import type { ForwardedRef, ReactElement } from "react"
import { DateValue } from "@react-types/calendar"

import { forwardRef } from "../system/utils"
import { CalendarBase } from "./calendar-base"
import { CalendarProvider } from "./calendar-context"
import { useCalendar, UseCalendarProps } from "./use-calendar"

interface Props<T extends DateValue> extends UseCalendarProps<T> {}

export type CalendarProps<T extends DateValue = DateValue> = Props<T>

export const Calendar = forwardRef(function Calendar<T extends DateValue>(
  props: CalendarProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { calendarProps, context } = useCalendar<T>(props)
  calendarProps.onChange

  return (
    <CalendarProvider value={context}>
      <CalendarBase {...calendarProps} />
    </CalendarProvider>
  )
}) as <T extends DateValue>(props: CalendarProps<T>) => ReactElement
