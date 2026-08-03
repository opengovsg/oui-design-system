"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useContext } from "react"
import { Group, Heading, useLocale } from "react-aria-components"

import { Button } from "../button/button"
import { AgnosticCalendarStateContext } from "./agnostic-calendar-state-context"
import { CalendarMonthDaySelector } from "./calendar-month-day-selector"
import { useCalendarStyleContext } from "./calendar-style-context"
import { useLocalizedMonthYear } from "./utils"

interface CalendarHeaderProps {
  offsetMonths?: number
}

export function CalendarHeader({ offsetMonths = 0 }: CalendarHeaderProps) {
  const { direction } = useLocale()
  const { slots, classNames, size } = useCalendarStyleContext()

  const state = useContext(AgnosticCalendarStateContext)!

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
