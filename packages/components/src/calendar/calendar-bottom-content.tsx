"use client"

import type { DateValue } from "react-aria-components"
import { useContext } from "react"
import { getLocalTimeZone, today } from "@internationalized/date"
import { CalendarStateContext } from "react-aria-components"

import type { CalendarProps } from "./types"
import { Button } from "../button/button"
import { useCalendarStyleContext } from "./calendar-style-context"
import { useCalendarI18n } from "./hooks"

export const CalendarBottomContent = <T extends DateValue>({
  bottomContent,
  showTodayButton,
}: Pick<CalendarProps<T>, "bottomContent" | "showTodayButton">) => {
  const state = useContext(CalendarStateContext)!
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
