"use client"

import { useContext } from "react"
import { CalendarDate } from "@internationalized/date"
import { Group } from "react-aria-components"

import { Select, SelectItem } from "../select"
import { AgnosticCalendarStateContext } from "./agnostic-calendar-state-context"
import { useCalendarStyleContext } from "./calendar-style-context"
import { useCalendarI18n, useCalendarSelectors } from "./hooks"

export const CalendarMonthDaySelector = () => {
  const { slots, size, classNames } = useCalendarStyleContext()
  const state = useContext(AgnosticCalendarStateContext)!

  const { months, years, datePartOrder } = useCalendarSelectors(state)

  const formatMessage = useCalendarI18n()

  return (
    <Group className={slots.selectors({ className: classNames?.selectors })}>
      {datePartOrder.map((part) => {
        if (part === "month") {
          return (
            <Select
              isDisabled={state.isDisabled}
              key={part}
              size={size}
              items={months}
              variant="clear"
              classNames={{
                trigger: slots.monthSelector({
                  className: classNames?.monthSelector,
                }),
                list: slots.monthList({ className: classNames?.monthList }),
                selectedText: slots.selectorText({
                  className: classNames?.selectorText,
                }),
                popover: "min-w-[12ch]",
              }}
              selectedKey={state.visibleRange.start.month}
              aria-label={formatMessage("selectMonth")}
              onSelectionChange={(month) => {
                state.setFocusedDate(
                  new CalendarDate(state.focusedDate.year, Number(month), 1),
                )
              }}
            >
              {(month) => <SelectItem>{month.textValue}</SelectItem>}
            </Select>
          )
        }
        return (
          <Select
            isDisabled={state.isDisabled}
            size={size}
            key={part}
            variant="clear"
            items={years}
            classNames={{
              trigger: slots.yearSelector({
                className: classNames?.yearSelector,
              }),
              list: slots.yearList({ className: classNames?.yearList }),
              selectedText: slots.selectorText({
                className: classNames?.selectorText,
              }),
            }}
            selectedKey={state.visibleRange.start.year}
            aria-label={formatMessage("selectYear")}
            onSelectionChange={(year) => {
              state.setFocusedDate(
                new CalendarDate(
                  Number(year),
                  state.focusedDate.month,
                  state.focusedDate.day,
                ),
              )
            }}
          >
            {(year) => <SelectItem>{year.textValue}</SelectItem>}
          </Select>
        )
      })}
    </Group>
  )
}
