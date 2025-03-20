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

/** Imported to ensure pnpm portability */
import type {} from "@react-types/calendar"

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
   * The minimum allowed date that a user may select.
   * @defaultValue `new CalendarDate(1900, 0, 1)`
   */
  minValue?: DateValue
  /**
   * The maximum allowed date that a user may select.
   * @defaultValue `new CalendarDate(2100, 12, 31)`
   */
  maxValue?: DateValue

  /**
   * If provided, there will be a button below the calendar for users to jump to today's date.
   * @defaultValue `true`
   * If `bottomContent is provided, this will be ignored.
   */
  showTodayButton?: boolean
  bottomContent?: ReactNode
}
