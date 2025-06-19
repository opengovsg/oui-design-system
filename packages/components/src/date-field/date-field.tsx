"use client"

import type {
  DateInputProps as AriaDateInputProps,
  ValidationResult,
} from "react-aria-components"
import { useMemo } from "react"
import { DateInput as AriaDateInput, DateSegment } from "react-aria-components"

import type {
  DateInputSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import {
  composeRenderProps,
  composeTailwindRenderProps,
  dateInputStyles,
} from "@opengovsg/oui-theme"

import { mapPropsVariants } from "../system/utils"

interface DateInputProps
  extends Omit<AriaDateInputProps, "children">,
    VariantProps<typeof dateInputStyles> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  classNames?: SlotsToClasses<DateInputSlots>
}

export function DateInput(originalProps: DateInputProps) {
  const [{ className, classNames, ...props }, variantProps] = useMemo(
    () => mapPropsVariants(originalProps, dateInputStyles.variantKeys),
    [originalProps],
  )
  const styles = dateInputStyles(variantProps)

  return (
    <AriaDateInput
      className={composeTailwindRenderProps(
        className ?? classNames?.base,
        styles.base(),
      )}
      {...props}
    >
      {(segment) => (
        <DateSegment
          segment={segment}
          className={composeRenderProps(
            classNames?.segment,
            (className, renderProps) =>
              styles.segment({
                ...renderProps,
                className,
              }),
          )}
        />
      )}
    </AriaDateInput>
  )
}
