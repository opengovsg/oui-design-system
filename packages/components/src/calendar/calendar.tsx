"use client"

import type { ForwardedRef, ReactElement } from "react"
import type { DateValue } from "react-aria-components"
import { useContext, useMemo } from "react"
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"
import {
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarStateContext,
  composeRenderProps,
  Provider,
} from "react-aria-components"

import { cn } from "@opengovsg/oui-theme"

import type { CalendarProps } from "./types"
import { forwardRef } from "../system/utils"
import { AgnosticCalendarStateContext } from "./agnostic-calendar-state-context"
import { CalendarBottomContent } from "./calendar-bottom-content"
import { CalendarGridHeader } from "./calendar-grid-header"
import { CalendarHeader } from "./calendar-header"
import {
  CalendarStyleContext,
  useProvideCalendarStyles,
} from "./calendar-style-context"

export const Calendar = forwardRef(function Calendar<T extends DateValue>(
  originalProps: CalendarProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { calendarProps, context } = useProvideCalendarStyles<T>(originalProps)
  const {
    weekdayStyle = "narrow",
    minValue = new CalendarDate(1900, 0, 1),
    maxValue = new CalendarDate(2100, 12, 31),
    bottomContent,
    showTodayButton = true,
    ...props
  } = calendarProps

  const { classNames, className, slots } = context
  const numberOfVisibleMonths = calendarProps.visibleDuration?.months ?? 1

  const dateToHighlight = useMemo(() => {
    if (props.defaultFocusedValue !== undefined) {
      return props.defaultFocusedValue
    }
    return today(getLocalTimeZone())
  }, [props.defaultFocusedValue])

  return (
    <AriaCalendar
      pageBehavior="single"
      {...props}
      ref={ref}
      minValue={minValue}
      maxValue={maxValue}
      className={composeRenderProps(className, (className, renderProps) =>
        slots.base({
          className: cn(classNames?.base, className),
          ...renderProps,
        }),
      )}
    >
      <CalendarStateWrapper>
        <Provider values={[[CalendarStyleContext, context]]}>
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
                    className={slots.gridBody({
                      className: classNames?.gridBody,
                    })}
                  >
                    {(date) => (
                      <CalendarCell
                        className={composeRenderProps(
                          classNames?.cell,
                          (className, renderProps) =>
                            slots.cell({
                              className,
                              isMultipleMonths: numberOfVisibleMonths >= 2,
                              isDateHighlighted: dateToHighlight
                                ? date.compare(dateToHighlight) === 0
                                : false,
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
        </Provider>
      </CalendarStateWrapper>
    </AriaCalendar>
  )
}) as <T extends DateValue>(props: CalendarProps<T>) => ReactElement

export const CalendarStateWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const state = useContext(CalendarStateContext)!

  return (
    <Provider values={[[AgnosticCalendarStateContext, state]]}>
      {children}
    </Provider>
  )
}
