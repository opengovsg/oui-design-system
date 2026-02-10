"use client"

import type { CalendarDate } from "@internationalized/date"
import { useCallback, useContext } from "react"
import { getLocalTimeZone, today } from "@internationalized/date"
import { useLocalizedStringFormatter } from "react-aria"

import type { CalendarProps } from "./types"
import { Button } from "../button/button"
import { AgnosticCalendarStateContext } from "./agnostic-calendar-state-context"
import { useCalendarStyleContext } from "./calendar-style-context"
import { i18nStrings } from "./i18n"

type CalendarBottomContentProps<T extends CalendarDate> = Pick<
  CalendarProps<T>,
  "bottomContent" | "showTodayButton" | "shouldSetDateOnTodayButtonClick"
>

export const CalendarBottomContent = <T extends CalendarDate>({
  bottomContent,
  showTodayButton,
  shouldSetDateOnTodayButtonClick,
}: CalendarBottomContentProps<T>) => {
  const state = useContext(AgnosticCalendarStateContext)!
  const { slots, classNames, size } = useCalendarStyleContext()

  const stringFormatter = useLocalizedStringFormatter(i18nStrings)

  const handleTodayClick = useCallback(() => {
    const todayDate = today(getLocalTimeZone())
    state.setFocusedDate(todayDate)
    if (shouldSetDateOnTodayButtonClick) {
      state.selectDate(todayDate)
    }
  }, [shouldSetDateOnTodayButtonClick, state])

  if (bottomContent) {
    return bottomContent
  }

  if (!showTodayButton) {
    return null
  }

  return (
    <div
      className={slots.bottomContentWrapper({
        className: classNames?.bottomContentWrapper,
      })}
    >
      <Button
        isDisabled={state.isDisabled}
        variant="clear"
        color="sub"
        size={size}
        slot={null}
        className={slots.todayButton({ className: classNames?.todayButton })}
        onPress={handleTodayClick}
      >
        {stringFormatter.format("Today")}
      </Button>
    </div>
  )
}
