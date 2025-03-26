"use client"

import type { CalendarDate } from "@internationalized/date"
import { useContext } from "react"
import { getLocalTimeZone, today } from "@internationalized/date"

import type { CalendarProps } from "./types"
import { Button } from "../button/button"
import { AgnosticCalendarStateContext } from "./agnostic-calendar-state-context"
import { useCalendarStyleContext } from "./calendar-style-context"
import { useCalendarI18n } from "./hooks"

export const CalendarBottomContent = <T extends CalendarDate>({
  bottomContent,
  showTodayButton,
}: Pick<CalendarProps<T>, "bottomContent" | "showTodayButton">) => {
  const state = useContext(AgnosticCalendarStateContext)!
  const { slots, classNames, size } = useCalendarStyleContext()
  const formatMessage = useCalendarI18n()

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
        onPress={() => {
          state.setFocusedDate(today(getLocalTimeZone()))
        }}
      >
        {formatMessage("today")}
      </Button>
    </div>
  )
}
