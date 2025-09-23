import type { ReactNode } from "react"
import type {
  CalendarProps as AriaCalendarProps,
  CalendarGridProps,
  DateValue,
} from "react-aria-components"

import type {
  CalendarSlots,
  CalendarVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"

export interface CalendarProps<T extends DateValue>
  extends AriaCalendarProps<T>,
    CalendarVariantProps,
    Pick<CalendarGridProps, "weekdayStyle"> {
  errorMessage?: string
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
   * If provided, there will be a button below the calendar for users to jump to today's date.
   * @defaultValue `true`
   * If `bottomContent is provided, this will be ignored.
   */
  showTodayButton?: boolean
  /**
   * If `true`, clicking on the "Today" button will set the selected date to today.
   * If `false`, it will only move the focus to today's date without changing the selected date.
   */
  shouldSetDateOnTodayButtonClick?: boolean
  bottomContent?: ReactNode
}
