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
  Text,
} from "react-aria-components"
import { useDeepCompareMemo } from "use-deep-compare"

import { calendarStyles, cn, dataAttr } from "@opengovsg/oui-theme"

import type { CalendarProps } from "./types"
import { forwardRef, mapPropsVariants } from "../system/utils"
import { AgnosticCalendarStateContext } from "./agnostic-calendar-state-context"
import { CalendarBottomContent } from "./calendar-bottom-content"
import { CalendarGridHeader } from "./calendar-grid-header"
import { CalendarHeader } from "./calendar-header"
import { CalendarStyleContext } from "./calendar-style-context"

export const Calendar = forwardRef(function Calendar<T extends DateValue>(
  originalProps: CalendarProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    calendarStyles.variantKeys,
  )

  const {
    className,
    classNames,
    weekdayStyle = "narrow",
    minValue = new CalendarDate(1900, 0, 1),
    maxValue = new CalendarDate(2100, 12, 31),
    bottomContent,
    showTodayButton = true,
    errorMessage,
    ...restProps
  } = props

  const slots = useDeepCompareMemo(
    () => calendarStyles(variantProps),
    [variantProps],
  )

  const context = useMemo(
    () => ({
      slots,
      classNames,
      className,
      size: variantProps.size ?? calendarStyles.defaultVariants.size,
    }),
    [className, classNames, slots, variantProps.size],
  )

  const numberOfVisibleMonths = props.visibleDuration?.months ?? 1

  const dateToHighlight = useMemo(() => {
    if (props.defaultFocusedValue !== undefined) {
      return props.defaultFocusedValue
    }
    return today(getLocalTimeZone())
  }, [props.defaultFocusedValue])

  return (
    <AriaCalendar
      pageBehavior="single"
      {...restProps}
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
                              ...renderProps,
                            }),
                        )}
                        data-highlighted={dataAttr(
                          dateToHighlight
                            ? date.compare(dateToHighlight) === 0
                            : false,
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

      {errorMessage && (
        <Text
          className={slots.errorMessage({
            className: classNames?.errorMessage,
          })}
          slot="errorMessage"
        >
          {errorMessage}
        </Text>
      )}
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
