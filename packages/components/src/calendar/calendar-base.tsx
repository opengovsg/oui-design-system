import type { ForwardedRef } from "react"
import type { DateValue } from "react-aria-components"
import type { CalendarState } from "react-stately"
import { useContext, useMemo } from "react"
import { CalendarDate } from "@internationalized/date"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useDateFormatter } from "react-aria"
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
  Heading,
  useLocale,
} from "react-aria-components"

import { cn } from "@opengovsg/oui-theme"

import type { CalendarProps } from "./types"
import { Button } from "../button/button"
import { Select, SelectItem } from "../select"
import { useCalendarStyleContext } from "./calendar-style-context"
import {
  useGenerateLocalizedMonths,
  useGenerateLocalizedYears,
  useLocalizedMonthYear,
} from "./utils"

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

  const numberOfVisibleMonths = props.visibleDuration?.months ?? 1

  return (
    <AriaCalendar
      pageBehavior="single"
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
      <div
        className={slots.gridContainer({
          className: classNames?.gridContainer,
        })}
      >
        {Array.from({ length: numberOfVisibleMonths }).map((_, index) => (
          <div key={index}>
            <CalendarHeader offsetMonths={index} />
            <CalendarGrid
              weekdayStyle={weekdayStyle}
              offset={{ months: index }}
            >
              <CalendarGridHeader />
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    className={composeRenderProps(
                      classNames?.cell,
                      (className, renderProps) =>
                        slots.cell({
                          className,
                          isMultipleMonths: numberOfVisibleMonths >= 2,
                          ...renderProps,
                        }),
                    )}
                    date={date}
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </div>
        ))}
      </div>
    </AriaCalendar>
  )
}

const useCalendarSelectors = (state: CalendarState) => {
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

const CalendarMonthDaySelector = () => {
  const { slots, size, classNames } = useCalendarStyleContext()
  const state = useContext(CalendarStateContext)!

  const { months, years, datePartOrder } = useCalendarSelectors(state)

  return (
    <Group className={slots.selectors({ className: classNames?.selectors })}>
      {datePartOrder.map((part) => {
        if (part === "month") {
          return (
            <Select
              key={part}
              size={size}
              items={months}
              variant="clear"
              classNames={{
                trigger: slots.monthSelector({
                  className: classNames?.monthSelector,
                }),
                selectedText: slots.selectorText({
                  className: classNames?.selectorText,
                }),
                popover: "min-w-[12ch]",
              }}
              selectedKey={state.visibleRange.start.month}
              aria-label="Select month TODO: Add aria label i18n"
              onSelectionChange={(month) => {
                state.setFocusedDate(
                  new CalendarDate(state.focusedDate.year, Number(month), 1),
                )
              }}
            >
              {(month) => <SelectItem>{month.textValue}</SelectItem>}
            </Select>
          )
        }
        return (
          <Select
            size={size}
            key={part}
            variant="clear"
            items={years}
            classNames={{
              trigger: slots.yearSelector({
                className: classNames?.yearSelector,
              }),
              selectedText: slots.selectorText({
                className: classNames?.selectorText,
              }),
            }}
            selectedKey={state.visibleRange.start.year}
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
          >
            {(year) => <SelectItem>{year.textValue}</SelectItem>}
          </Select>
        )
      })}
    </Group>
  )
}

interface CalendarHeaderProps {
  offsetMonths?: number
}

export function CalendarHeader({ offsetMonths = 0 }: CalendarHeaderProps) {
  const { direction } = useLocale()
  const { slots, classNames, size } = useCalendarStyleContext()

  const state = useContext(CalendarStateContext)!

  const monthYearTitle = useLocalizedMonthYear(
    state.visibleRange.start.add({ months: offsetMonths }),
    state.timeZone,
  )

  if (offsetMonths === 0) {
    return (
      <div className={slots.header({ className: classNames?.header })}>
        <CalendarMonthDaySelector />
        <Group className="justify-self-end">
          <Button
            size={size}
            isIconOnly
            variant="clear"
            color="sub"
            slot="previous"
            className={slots.prevButton()}
          >
            {direction === "rtl" ? (
              <ChevronRight aria-hidden />
            ) : (
              <ChevronLeft aria-hidden />
            )}
          </Button>
          <Button
            size={size}
            variant="clear"
            color="sub"
            isIconOnly
            slot="next"
            className={slots.nextButton()}
          >
            {direction === "rtl" ? (
              <ChevronLeft aria-hidden />
            ) : (
              <ChevronRight aria-hidden />
            )}
          </Button>
        </Group>
      </div>
    )
  }

  return (
    <Heading
      className={slots.header({ className: classNames?.header })}
      aria-hidden
      level={2}
    >
      {monthYearTitle}
    </Heading>
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
