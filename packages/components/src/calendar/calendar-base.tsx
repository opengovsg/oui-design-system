import type { ForwardedRef } from "react"
import type { DateValue } from "react-aria-components"
import { useContext, useMemo } from "react"
import { CalendarDate } from "@internationalized/date"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Calendar as AriaCalendar,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeaderCell,
  CalendarStateContext,
  composeRenderProps,
  Group,
  useLocale,
} from "react-aria-components"

import { cn } from "@opengovsg/oui-theme"

import type { CalendarProps } from "./types"
import { Button } from "../button/button"
import { Select } from "../select"
import { useCalendarStyleContext } from "./calendar-style-context"
import { useLocalizedMonths, useLocalizedYears } from "./utils"

export { CalendarDate }

export interface CalendarBaseProps<T extends DateValue>
  extends CalendarProps<T> {
  calendarRef: ForwardedRef<HTMLDivElement>
}

export function CalendarBase<T extends DateValue>({
  weekdayStyle = "narrow",
  calendarRef,
  minValue = new CalendarDate(1900, 0, 1),
  maxValue = new CalendarDate(2100, 12, 31),
  ...props
}: CalendarBaseProps<T>) {
  const { slots, className, classNames } = useCalendarStyleContext()

  return (
    <AriaCalendar
      {...props}
      ref={calendarRef}
      minValue={minValue}
      maxValue={maxValue}
      className={composeRenderProps(className, (className, renderProps) =>
        slots.base({
          className: cn(classNames?.base, className),
          ...renderProps,
        }),
      )}
    >
      <CalendarHeader />
      <CalendarGrid weekdayStyle={weekdayStyle}>
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              className={composeRenderProps(
                classNames?.cell,
                (className, renderProps) =>
                  slots.cell({
                    className,
                    ...renderProps,
                  }),
              )}
              date={date}
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </AriaCalendar>
  )
}

const CalendarMonthDaySelector = () => {
  const state = useContext(CalendarStateContext)!

  const yearRange = useMemo(() => {
    const start = state.minValue!.year ?? 1900
    const end = state.maxValue!.year ?? 2100
    return { start, end }
  }, [state.maxValue, state.minValue])

  const months = useLocalizedMonths(state.timeZone)
  const years = useLocalizedYears(
    yearRange.start,
    yearRange.end,
    state.timeZone,
  )

  return (
    <Group className="flex flex-row gap-0.5">
      <Select
        variant="clear"
        items={years}
        selectedKey={state.focusedDate.year}
        aria-label="Select year TODO: Add aria label i18n"
        onSelectionChange={(year) => {
          state.setFocusedDate(
            new CalendarDate(
              Number(year),
              state.focusedDate.month,
              state.focusedDate.day,
            ),
          )
        }}
      />
      <Select
        items={months}
        variant="clear"
        classNames={{
          trigger: "min-w-[12ch]",
        }}
        selectedKey={state.focusedDate.month}
        aria-label="Select month TODO: Add aria label i18n"
        onSelectionChange={(month) => {
          state.setFocusedDate(
            new CalendarDate(
              state.focusedDate.year,
              Number(month),
              state.focusedDate.day,
            ),
          )
        }}
      />
    </Group>
  )
}

export function CalendarHeader() {
  const { direction } = useLocale()
  const { slots, classNames, size } = useCalendarStyleContext()

  return (
    <header className={slots.header({ className: classNames?.header })}>
      <CalendarMonthDaySelector />
      <Group>
        <Button
          size={size}
          isIconOnly
          variant="clear"
          color="sub"
          slot="previous"
        >
          {direction === "rtl" ? (
            <ChevronRight aria-hidden />
          ) : (
            <ChevronLeft aria-hidden />
          )}
        </Button>
        <Button size={size} variant="clear" color="sub" isIconOnly slot="next">
          {direction === "rtl" ? (
            <ChevronLeft aria-hidden />
          ) : (
            <ChevronRight aria-hidden />
          )}
        </Button>
      </Group>
    </header>
  )
}

export function CalendarGridHeader() {
  const { slots, classNames } = useCalendarStyleContext()
  return (
    <AriaCalendarGridHeader
      className={slots.gridHeader({ className: classNames?.gridHeader })}
    >
      {(day) => (
        <CalendarHeaderCell
          className={slots.gridHeaderCell({
            className: classNames?.gridHeaderCell,
          })}
        >
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  )
}
