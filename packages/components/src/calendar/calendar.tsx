import type { ForwardedRef, ReactElement } from "react"
import type { DateValue } from "react-aria-components"

import { forwardRef } from "../system/utils"
import { CalendarBase } from "./calendar-base"
import {
  CalendarStyleProvider,
  useProvideCalendarStyles,
} from "./calendar-style-context"
import { CalendarProps } from "./types"

export const Calendar = forwardRef(function Calendar<T extends DateValue>(
  props: CalendarProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { calendarProps, context } = useProvideCalendarStyles<T>(props)

  return (
    <CalendarStyleProvider value={context}>
      <CalendarBase calendarRef={ref} {...calendarProps} />
    </CalendarStyleProvider>
  )
}) as <T extends DateValue>(props: CalendarProps<T>) => ReactElement
