import type {
  CalendarSlots,
  CalendarVariantProps,
  SlotsToClasses,
} from "@unnamed/theme"
import type {
  CalendarProps as AriaCalendarProps,
  DateValue,
} from "react-aria-components"
import { calendarStyles, cn } from "@unnamed/theme"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Calendar as AriaCalendar,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeaderCell,
  composeRenderProps,
  Heading,
  useLocale,
} from "react-aria-components"
import { useDeepCompareMemo } from "use-deep-compare"

import { Button } from "../button/button"
import { mapPropsVariants } from "../system/utils"

export interface CalendarProps<T extends DateValue>
  extends AriaCalendarProps<T>,
    CalendarVariantProps {
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

export function Calendar<T extends DateValue>(originalProps: CalendarProps<T>) {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    calendarStyles.variantKeys,
  )

  const {
    errorMessage,
    className: classNameProp,
    classNames,
    ...restProps
  } = props

  const slots = useDeepCompareMemo(
    () => calendarStyles(variantProps),
    [variantProps],
  )

  return (
    <AriaCalendar
      {...restProps}
      className={composeRenderProps(classNameProp, (className, renderProps) =>
        slots.base({
          className: cn(classNames?.base, className),
          ...renderProps,
        }),
      )}
    >
      <CalendarHeader />
      <CalendarGrid>
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

export function CalendarHeader() {
  const { direction } = useLocale()

  return (
    <header>
      <Button isIconOnly slot="previous">
        {direction === "rtl" ? (
          <ChevronRight aria-hidden />
        ) : (
          <ChevronLeft aria-hidden />
        )}
      </Button>
      <Heading />
      <Button isIconOnly slot="next">
        {direction === "rtl" ? (
          <ChevronLeft aria-hidden />
        ) : (
          <ChevronRight aria-hidden />
        )}
      </Button>
    </header>
  )
}

export function CalendarGridHeader() {
  return (
    <AriaCalendarGridHeader>
      {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
    </AriaCalendarGridHeader>
  )
}
