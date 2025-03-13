import { useMemo } from "react"
import { CalendarDate } from "@internationalized/date"
import { useDateFormatter } from "@react-aria/i18n"

export function useLocalizedMonths(timeZone: string) {
  const formatter = useDateFormatter({
    month: "long",
    timeZone,
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

export function useLocalizedYears(
  yearStart: number,
  yearEnd: number,
  timeZone: string,
) {
  const formatter = useDateFormatter({
    year: "numeric",
    timeZone,
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
