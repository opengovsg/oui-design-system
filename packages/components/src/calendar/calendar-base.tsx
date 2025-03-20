import type { ForwardedRef } from "react"
import type { LocalizedStrings } from "react-aria"
import type { DateValue } from "react-aria-components"
import type { CalendarState } from "react-stately"
import { useContext, useMemo } from "react"
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useDateFormatter, useMessageFormatter } from "react-aria"
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
export interface CalendarBaseProps<T extends DateValue>
  extends CalendarProps<T> {
  calendarRef: ForwardedRef<HTMLDivElement>
}

const i18nStrings: LocalizedStrings = {
  "en-SG": {
    selectMonth: "Select month",
    selectYear: "Select year",
    today: "Today",
  },
  "zh-SG": {
    selectMonth: "选择月份",
    selectYear: "选择年份",
    today: "今天",
  },
  "ms-SG": {
    selectMonth: "Pilih bulan",
    selectYear: "Pilih tahun",
    today: "Hari ini",
  },
  "ta-SG": {
    selectMonth: "மாதத்தை தேர்ந்தெடுக்கவும்",
    selectYear: "ஆண்டை தேர்ந்தெடுக்கவும்",
    today: "இன்று",
  },
}

const CalendarBottomContent = <T extends DateValue>({
  bottomContent,
  showTodayButton,
}: Pick<CalendarProps<T>, "bottomContent" | "showTodayButton">) => {
  const state = useContext(CalendarStateContext)!
  const { slots, classNames, size } = useCalendarStyleContext()
  const formatMessage = useMessageFormatter(i18nStrings)

  if (bottomContent) {
    return bottomContent
  }

  if (!showTodayButton) {
    return null
  }

  return (
    <div
      className={slots.bottomContentWrapper({
        className: classNames?.bottomContentWrapper,
      })}
    >
      <Button
        variant="clear"
        color="sub"
        size={size}
        slot={null}
        className={slots.todayButton({ className: classNames?.todayButton })}
        onPress={() => {
          state.setFocusedDate(today(getLocalTimeZone()))
        }}
      >
        {formatMessage("today")}
      </Button>
    </div>
  )
}

export function CalendarBase<T extends DateValue>({
  weekdayStyle = "narrow",
  calendarRef,
  minValue = new CalendarDate(1900, 0, 1),
  maxValue = new CalendarDate(2100, 12, 31),
  bottomContent,
  showTodayButton = true,
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
        className={slots.gridWrapper({
          className: classNames?.gridWrapper,
        })}
      >
        {Array.from({ length: numberOfVisibleMonths }).map((_, index) => (
          <div
            key={index}
            className={slots.calendar({ className: classNames?.calendar })}
          >
            <CalendarHeader offsetMonths={index} />
            <CalendarGrid
              className={slots.grid({ className: classNames?.grid })}
              weekdayStyle={weekdayStyle}
              offset={{ months: index }}
            >
              <CalendarGridHeader />
              <CalendarGridBody
                className={slots.gridBody({ className: classNames?.gridBody })}
              >
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
      <CalendarBottomContent
        bottomContent={bottomContent}
        showTodayButton={showTodayButton}
      />
    </AriaCalendar>
  )
}

const CalendarMonthDaySelector = () => {
  const { slots, size, classNames } = useCalendarStyleContext()
  const state = useContext(CalendarStateContext)!

  const { months, years, datePartOrder } = useCalendarSelectors(state)

  const formatMessage = useMessageFormatter(i18nStrings)

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
                list: slots.monthList({ className: classNames?.monthList }),
                selectedText: slots.selectorText({
                  className: classNames?.selectorText,
                }),
                popover: "min-w-[12ch]",
              }}
              selectedKey={state.visibleRange.start.month}
              aria-label={formatMessage("selectMonth")}
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
              list: slots.yearList({ className: classNames?.yearList }),
              selectedText: slots.selectorText({
                className: classNames?.selectorText,
              }),
            }}
            selectedKey={state.visibleRange.start.year}
            aria-label={formatMessage("selectYear")}
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
        <Group
          className={slots.buttonGroup({ className: classNames?.buttonGroup })}
        >
          <Button
            size={size}
            isIconOnly
            variant="clear"
            color="sub"
            slot="previous"
            className={slots.prevButton({ className: classNames?.prevButton })}
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
            className={slots.nextButton({
              className: classNames?.nextButton,
            })}
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
