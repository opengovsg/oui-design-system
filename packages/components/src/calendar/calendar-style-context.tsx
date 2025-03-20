"use client"

import type { DateValue } from "react-aria-components"
import { useDeepCompareMemo } from "use-deep-compare"

import { calendarStyles } from "@opengovsg/oui-theme"

import type { CalendarProps } from "./types"
import { createContext } from "../system/react-utils"
import { mapPropsVariants } from "../system/utils"

export function useProvideCalendarStyles<T extends DateValue>(
  originalProps: CalendarProps<T>,
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
      size: variantProps.size ?? calendarStyles.defaultVariants.size,
      errorMessage,
    },
    calendarProps: { ...restProps, onChange: restProps.onChange },
  }
}

export type UseProvideCalendarStylesReturn = ReturnType<
  typeof useProvideCalendarStyles
>

export const [CalendarStyleContext, useCalendarStyleContext] = createContext<
  UseProvideCalendarStylesReturn["context"]
>({
  name: "CalendarStyleContext",
  strict: true,
})
