import type {
  CalendarSlots,
  CalendarVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import type {
  CalendarProps as AriaCalendarProps,
  CalendarGridProps,
  DateValue,
} from "react-aria-components"
import { calendarStyles } from "@opengovsg/oui-theme"
import { useDeepCompareMemo } from "use-deep-compare"

import { mapPropsVariants } from "../system/utils"

export interface UseCalendarProps<T extends DateValue>
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
}

export function useCalendar<T extends DateValue>(
  originalProps: UseCalendarProps<T>,
) {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    calendarStyles.variantKeys,
  )

  const { errorMessage, className, classNames, ...restProps } = props

  const slots = useDeepCompareMemo(
    () => calendarStyles(variantProps),
    [variantProps],
  )

  return {
    context: {
      slots,
      classNames,
      className,
      size: variantProps.size,
      errorMessage,
    },
    calendarProps: { ...restProps, onChange: restProps.onChange },
  }
}

export type UseCalendarReturn = ReturnType<typeof useCalendar>
