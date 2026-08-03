"use client"

import { useMemo } from "react"
import { useDateFormatter } from "react-aria"
import type { CalendarSelectionMode } from "react-aria-components/Calendar"
import type { CalendarState, RangeCalendarState } from "react-stately"

import { useGenerateLocalizedMonths, useGenerateLocalizedYears } from "./utils"

export const useCalendarSelectors = (
  state: CalendarState<CalendarSelectionMode> | RangeCalendarState,
) => {
  const yearRange = useMemo(() => {
    const start = state.minValue!.year ?? 1900
    const end = state.maxValue!.year ?? 2100
    return { start, end }
  }, [state.maxValue, state.minValue])

  const dateFormatter = useDateFormatter(state)

  const datePartOrder = useMemo(() => {
    const parts = dateFormatter.formatToParts(
      state.visibleRange.start.toDate(state.timeZone),
    )
    const filteredParts = parts.filter((part) =>
      ["year", "month"].includes(part.type),
    )
    const filteredPartNames = filteredParts.map((part) => part.type)
    return filteredPartNames as Array<"year" | "month">
  }, [dateFormatter, state.timeZone, state.visibleRange.start])

  const months = useGenerateLocalizedMonths(state.timeZone)
  const years = useGenerateLocalizedYears(
    yearRange.start,
    yearRange.end,
    state.timeZone,
  )

  return useMemo(() => {
    return {
      months,
      years,
      datePartOrder,
    }
  }, [datePartOrder, months, years])
}
