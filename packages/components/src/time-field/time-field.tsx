import type {
  DateInputVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import {
  composeTailwindRenderProps,
  dateInputStyles,
} from "@opengovsg/oui-theme"
import { useMemo } from "react"
import type {
  TimeFieldProps as AriaTimeFieldProps,
  TimeValue,
  ValidationResult,
} from "react-aria-components"
import { TimeField as AriaTimeField } from "react-aria-components"

import type { DateInputProps } from "../date-field"
import { DateInput } from "../date-field"
import { Description, FieldError, Label } from "../field"
import { mapPropsVariants } from "../system/utils"

export interface TimeFieldProps<T extends TimeValue>
  extends AriaTimeFieldProps<T>, DateInputVariantProps {
  label?: React.ReactNode
  description?: React.ReactNode | null
  errorMessage?:
    | React.ReactNode
    | ((validation: ValidationResult) => React.ReactNode)
  inputProps?: Partial<DateInputProps>
  classNames?: SlotsToClasses<
    "base" | "label" | "input" | "description" | "error"
  >
}

export function TimeField<T extends TimeValue>(
  originalProps: TimeFieldProps<T>,
) {
  const [
    {
      label,
      description,
      className,
      classNames,
      errorMessage,
      inputProps,
      ...props
    },
    variantProps,
  ] = useMemo(
    () => mapPropsVariants(originalProps, dateInputStyles.variantKeys),
    [originalProps],
  )

  return (
    <AriaTimeField
      {...props}
      isDisabled={variantProps.isDisabled}
      className={composeTailwindRenderProps(
        className ?? classNames?.base,
        "flex w-full flex-col gap-2",
      )}
    >
      {label && (
        <Label size={variantProps.size} className={classNames?.label}>
          {label}
        </Label>
      )}
      <DateInput
        {...variantProps}
        {...inputProps}
        className={classNames?.input ?? inputProps?.className}
      />
      {description && (
        <Description
          size={variantProps.size}
          className={classNames?.description}
        >
          {description}
        </Description>
      )}
      <FieldError size={variantProps.size} className={classNames?.error}>
        {errorMessage}
      </FieldError>
    </AriaTimeField>
  )
}
