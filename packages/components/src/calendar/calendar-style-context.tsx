"use client"

import type { CalendarDate } from "@internationalized/date"
import type { RangeCalendarProps } from "react-aria-components"

import type { calendarStyles } from "@opengovsg/oui-theme"

import type { CalendarProps } from "./types"
import { createContext } from "../system/react-utils"

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
