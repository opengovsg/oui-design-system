import type { DateValue } from "react-aria-components"
import { calendarStyles } from "@opengovsg/oui-theme"
import { useDeepCompareMemo } from "use-deep-compare"

import { createContext } from "../system/react-utils"
import { mapPropsVariants } from "../system/utils"
import { CalendarProps } from "./types"

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
      size: variantProps.size,
      errorMessage,
    },
    calendarProps: { ...restProps, onChange: restProps.onChange },
  }
}

export type UseProvideCalendarStylesReturn = ReturnType<
  typeof useProvideCalendarStyles
>

export const [CalendarStyleProvider, useCalendarStyleContext] = createContext<
  UseProvideCalendarStylesReturn["context"]
>({
  name: "CalendarStyleContext",
  strict: true,
  errorMessage:
    "useContext: `context` is undefined. Seems you forgot to wrap component within the CalendarStyleProvider",
})
