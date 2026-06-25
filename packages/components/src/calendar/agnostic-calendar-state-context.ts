"use client"

import type { CalendarSelectionMode } from "react-aria-components/Calendar"
import type { CalendarState, RangeCalendarState } from "react-stately"

import { createContext } from "../system/react-utils"

export const [AgnosticCalendarStateContext, useAgnosticCalendarStateContext] =
  createContext<CalendarState<CalendarSelectionMode> | RangeCalendarState>({
    name: "AgnosticCalendarStateContext",
    strict: true,
  })
