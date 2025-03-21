import type { CalendarState, RangeCalendarState } from "react-stately"

import { createContext } from "../system/react-utils"

export const [AgnosticCalendarStateContext, useAgnosticCalendarStateContext] =
  createContext<CalendarState | RangeCalendarState>({
    name: "AgnosticCalendarStateContext",
    strict: true,
  })
