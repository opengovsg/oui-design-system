"use client"

import type { CalendarDate } from "@internationalized/date"
import type { calendarStyles } from "@opengovsg/oui-theme"
import type { RangeCalendarProps } from "react-aria-components"

import { createContext } from "../system/react-utils"
import type { CalendarProps } from "./types"

export interface UseProvideCalendarStylesReturn<T extends CalendarDate> {
  slots: ReturnType<typeof calendarStyles>
  classNames: CalendarProps<T>["classNames"]
  className: CalendarProps<T>["className"] | RangeCalendarProps<T>["className"]
  size: CalendarProps<T>["size"]
}

export const [CalendarStyleContext, useCalendarStyleContext] = createContext<
  UseProvideCalendarStylesReturn<CalendarDate>
>({
  name: "CalendarStyleContext",
  strict: true,
})
