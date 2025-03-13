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
   *    header:"header-classes",
   *    title:"title-classes",
   *    content:"content-classes",
   *    gridWrapper:"grid-wrapper-classes",
   *    grid:"grid-classes",
   *    gridHeader:"grid-header-classes",
   *    gridHeaderRow:"grid-header-row-classes",
   *    gridHeaderCell:"grid-header-cell-classes",
   *    gridBody:"grid-body-classes",
   *    gridBodyRow:"grid-row-classes",
   *    cell:"grid-cell-classes",
   *    cellButton:"grid-cell-button-classes",
   *    pickerWrapper:"picker-wrapper-classes",
   *    pickerMonthList:"picker-month-list-classes",
   *    pickerYearList:"picker-year-list-classes",
   *    pickerHighlight:"picker-highlight-classes",
   *    pickerItem:"picker-item-classes",
   *    helperWrapper:"helper-wrapper-classes",
   *    errorMessage:"error-message-classes",
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
}
