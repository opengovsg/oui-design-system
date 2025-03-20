import type { DateFormatterOptions } from "@react-aria/i18n"
import { useMemo } from "react"
import { CalendarDate } from "@internationalized/date"
import { useDateFormatter } from "@react-aria/i18n"

export function getEraFormat(
  date: CalendarDate | undefined,
): "short" | undefined {
  return date?.calendar.identifier === "gregory" && date.era === "BC"
    ? "short"
    : undefined
}

export function useLocalizedMonthYear(date: CalendarDate, timeZone: string) {
  const era = getEraFormat(date)
  const monthFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    era,
    calendar: date.calendar.identifier,
    timeZone,
  })
  return monthFormatter.format(date.toDate(timeZone))
}

export function useGenerateLocalizedMonths(
  timeZone: string,
  formatterOptions?: DateFormatterOptions,
) {
  const formatter = useDateFormatter({
    month: "long",
    timeZone,
    ...formatterOptions,
  })

  return useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const id = i + 1
      return {
        id,
        textValue: formatter.format(
          new CalendarDate(2020, id, 1).toDate(timeZone),
        ),
      }
    })
  }, [formatter, timeZone])
}

export function useGenerateLocalizedYears(
  yearStart: number,
  yearEnd: number,
  timeZone: string,
  formatterOptions?: DateFormatterOptions,
) {
  const formatter = useDateFormatter({
    year: "numeric",
    timeZone,
    ...formatterOptions,
  })

  return useMemo(() => {
    return Array.from({ length: yearEnd - yearStart + 1 }, (_, i) => {
      const year = yearStart + i
      return {
        id: year,
        textValue: formatter.format(
          new CalendarDate(year, 1, 1).toDate(timeZone),
        ),
      }
    })
  }, [formatter, yearStart, yearEnd, timeZone])
}
