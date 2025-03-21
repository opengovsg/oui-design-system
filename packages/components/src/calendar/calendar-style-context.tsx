"use client"

import type { DateValue, RangeCalendarProps } from "react-aria-components"

import type { calendarStyles } from "@opengovsg/oui-theme"

import type { CalendarProps } from "./types"
import { createContext } from "../system/react-utils"

export interface UseProvideCalendarStylesReturn<T extends DateValue> {
  slots: ReturnType<typeof calendarStyles>
  classNames: CalendarProps<T>["classNames"]
  className: CalendarProps<T>["className"] | RangeCalendarProps<T>["className"]
  size: CalendarProps<T>["size"]
}

export const [CalendarStyleContext, useCalendarStyleContext] = createContext<
  UseProvideCalendarStylesReturn<DateValue>
>({
  name: "CalendarStyleContext",
  strict: true,
})
