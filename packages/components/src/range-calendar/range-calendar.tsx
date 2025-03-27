"use client"

import type { ForwardedRef } from "react"
import type {
  RangeCalendarProps as AriaRangeCalendarProps,
  CalendarGridProps,
  DateValue,
} from "react-aria-components"
import { forwardRef, useContext, useMemo } from "react"
import {
  CalendarDate,
  getDayOfWeek,
  getLocalTimeZone,
  today,
} from "@internationalized/date"
import {
  RangeCalendar as AriaRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  Provider,
  RangeCalendarStateContext,
  Text,
  useLocale,
} from "react-aria-components"
import { useDeepCompareMemo } from "use-deep-compare"

import type {
  CalendarSlots,
  CalendarVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import {
  calendarStyles,
  cn,
  composeRenderProps,
  dataAttr,
} from "@opengovsg/oui-theme"

import { CalendarStyleContext, useCalendarStyleContext } from "../calendar"
import { AgnosticCalendarStateContext } from "../calendar/agnostic-calendar-state-context"
import { CalendarBottomContent } from "../calendar/calendar-bottom-content"
import { CalendarGridHeader } from "../calendar/calendar-grid-header"
import { CalendarHeader } from "../calendar/calendar-header"
import { mapPropsVariants } from "../system/utils"

interface RangeCalendarProps<T extends CalendarDate>
  extends CalendarVariantProps,
    Pick<CalendarGridProps, "weekdayStyle">,
    AriaRangeCalendarProps<T> {
  /**
   * List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   *
   * Component: Calendar, RangeCalendar
   *
   * <Component classNames={{
   *    base:"base-classes",
   *    nextButton:"next-button-classes",
   *    prevButton:"prev-button-classes",
   *    buttonGroup:"button-group-classes",
   *    header:"header-classes",
   *    title:"title-classes",
   *    content:"content-classes",
   *    gridWrapper:"grid-wrapper-classes",
   *    calendar:"calendar-classes",
   *    grid:"grid-classes",
   *    gridHeader:"grid-header-classes",
   *    gridHeaderCell:"grid-header-cell-classes",
   *    gridBody:"grid-body-classes",
   *    cell:"grid-cell-classes",
   *    monthSelector:"month-selector-classes",
   *    yearSelector:"year-selector-classes",
   *    selectors:"selectors-classes",
   *    selectorText:"selector-text-classes",
   *    monthList:"month-list-classes",
   *    yearList:"year-list-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<CalendarSlots>
  /**
   * The minimum allowed date that a user may select.
   * @defaultValue `new CalendarDate(1900, 0, 1)`
   */
  minValue?: T
  /**
   * The maximum allowed date that a user may select.
   * @defaultValue `new CalendarDate(2100, 12, 31)`
   */
  maxValue?: T

  /**
   * If provided, there will be a button below the calendar for users to jump to today's date.
   * @defaultValue `true`
   * If `bottomContent is provided, this will be ignored.
   */
  showTodayButton?: boolean
  bottomContent?: React.ReactNode

  errorMessage?: string
}

export const RangeCalendar = forwardRef(function RangeCalendar<
  T extends CalendarDate,
>(originalProps: RangeCalendarProps<T>, ref: ForwardedRef<HTMLDivElement>) {
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
    () => calendarStyles({ ...variantProps, isRange: true }),
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
    <AriaRangeCalendar
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
      <Provider values={[[CalendarStyleContext, context]]}>
        <RangeCalendarStateWrapper>
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
                      <RangeCalendarCell
                        firstDayOfWeek={props.firstDayOfWeek}
                        dateToHighlight={dateToHighlight}
                        date={date}
                        isMultipleMonths={numberOfVisibleMonths >= 2}
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
        </RangeCalendarStateWrapper>
      </Provider>
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
    </AriaRangeCalendar>
  )
})

export const RangeCalendarStateWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const state = useContext(RangeCalendarStateContext)!

  return (
    <Provider values={[[AgnosticCalendarStateContext, state]]}>
      {children}
    </Provider>
  )
}

export const RangeCalendarCell = <T extends CalendarDate>({
  date,
  isMultipleMonths,
  dateToHighlight,
  firstDayOfWeek,
}: {
  date: CalendarDate
  isMultipleMonths: boolean
  dateToHighlight: DateValue | null
  firstDayOfWeek?: RangeCalendarProps<T>["firstDayOfWeek"]
}) => {
  const { classNames, slots } = useCalendarStyleContext()
  const state = useContext(AgnosticCalendarStateContext)!
  const { locale } = useLocale()

  const dataAttributes = useMemo(() => {
    const isDateHighlighted = dateToHighlight
      ? date.compare(dateToHighlight) === 0
      : false
    const isSelected = state.isSelected(date)
    const isDisabled = state.isCellDisabled(date)
    const isInvalid = state.isInvalid(date)
    const isFirstSelectedAfterDisabled =
      !isDisabled &&
      !isInvalid &&
      state.isCellUnavailable(date.subtract({ days: 1 }))

    const isLastSelectedBeforeDisabled =
      !isDisabled &&
      !isInvalid &&
      state.isCellUnavailable(date.add({ days: 1 }))

    const dayOfWeek = getDayOfWeek(date, locale, firstDayOfWeek)

    const isRangeStart =
      isSelected &&
      (isFirstSelectedAfterDisabled || dayOfWeek === 0 || date.day === 1)
    const isRangeEnd =
      isSelected &&
      (isLastSelectedBeforeDisabled ||
        dayOfWeek === 6 ||
        date.day === date.calendar.getDaysInMonth(date))

    return {
      "data-highlighted": dataAttr(isDateHighlighted),
      "data-range-end": dataAttr(isRangeEnd),
      "data-range-start": dataAttr(isRangeStart),
    }
  }, [date, dateToHighlight, firstDayOfWeek, locale, state])

  return (
    <CalendarCell
      className={composeRenderProps(
        classNames?.cell,
        (className, renderProps) =>
          slots.cell({
            className,
            isMultipleMonths,
            ...renderProps,
          }),
      )}
      {...dataAttributes}
      date={date}
    />
  )
}
