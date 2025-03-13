import type { ForwardedRef, ReactElement } from "react"
import type { DateValue } from "react-aria-components"
import { Provider } from "react-aria-components"

import type { CalendarProps } from "./types"
import { forwardRef } from "../system/utils"
import { CalendarBase } from "./calendar-base"
import {
  CalendarStyleContext,
  useProvideCalendarStyles,
} from "./calendar-style-context"

export const Calendar = forwardRef(function Calendar<T extends DateValue>(
  props: CalendarProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { calendarProps, context } = useProvideCalendarStyles<T>(props)

  return (
    <Provider values={[[CalendarStyleContext, context]]}>
      <CalendarBase calendarRef={ref} {...calendarProps} />
    </Provider>
  )
}) as <T extends DateValue>(props: CalendarProps<T>) => ReactElement
