import type {
  CalendarProps as AriaCalendarProps,
  CalendarGridProps,
  DateValue,
} from "react-aria-components"
import { ForwardedRef } from "react"
import { cn } from "@unnamed/theme"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Calendar as AriaCalendar,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeaderCell,
  composeRenderProps,
  Group,
  Heading,
  useLocale,
} from "react-aria-components"

import { Button } from "../button/button"
import { useCalendarContext } from "./calendar-context"

export interface CalendarBaseProps<T extends DateValue>
  extends AriaCalendarProps<T>,
    Pick<CalendarGridProps, "weekdayStyle"> {
  calendarRef: ForwardedRef<HTMLDivElement>
}

export function CalendarBase<T extends DateValue>({
  weekdayStyle = "narrow",
  calendarRef,
  ...props
}: CalendarBaseProps<T>) {
  const { slots, className, classNames } = useCalendarContext()

  return (
    <AriaCalendar
      {...props}
      ref={calendarRef}
      className={composeRenderProps(className, (className, renderProps) =>
        slots.base({
          className: cn(classNames?.base, className),
          ...renderProps,
        }),
      )}
    >
      <CalendarHeader />
      <CalendarGrid weekdayStyle={weekdayStyle}>
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
  const { slots, classNames, size } = useCalendarContext()

  return (
    <header className={slots.header({ className: classNames?.header })}>
      <Heading />
      <Group>
        <Button
          size={size}
          isIconOnly
          variant="clear"
          color="neutral"
          slot="previous"
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
          color="neutral"
          isIconOnly
          slot="next"
        >
          {direction === "rtl" ? (
            <ChevronLeft aria-hidden />
          ) : (
            <ChevronRight aria-hidden />
          )}
        </Button>
      </Group>
    </header>
  )
}

export function CalendarGridHeader() {
  const { slots, classNames } = useCalendarContext()
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
