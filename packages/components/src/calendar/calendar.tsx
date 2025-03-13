import type { ForwardedRef, ReactElement } from "react"
import type { DateValue } from "react-aria-components"

import type { CalendarProps } from "./types"
import { forwardRef } from "../system/utils"
import { CalendarBase } from "./calendar-base"
import {
  CalendarStyleProvider,
  useProvideCalendarStyles,
} from "./calendar-style-context"

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
