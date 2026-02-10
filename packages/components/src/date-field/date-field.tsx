"use client"

import type {
  DateFieldProps as AriaDateFieldProps,
  DateInputProps as AriaDateInputProps,
  DateValue,
  ValidationResult,
} from "react-aria-components"
import { useMemo } from "react"
import {
  DateField as AriaDateField,
  DateInput as AriaDateInput,
  DateSegment,
} from "react-aria-components"

import type {
  DateInputSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import {
  composeRenderProps,
  composeTailwindRenderProps,
  dateFieldStyles,
  dateInputStyles,
} from "@opengovsg/oui-theme"

import { Description, FieldError, Label } from "../field"
import { mapPropsVariants } from "../system/utils"

export interface DateFieldProps<T extends DateValue>
  extends AriaDateFieldProps<T>,
    VariantProps<typeof dateFieldStyles> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  classNames?: SlotsToClasses<
    "base" | "label" | "input" | "description" | "error"
  >
  inputProps?: DateInputProps
}

export function DateField<T extends DateValue>(
  originalProps: DateFieldProps<T>,
) {
  const [
    {
      inputProps,
      label,
      description,
      errorMessage,
      className,
      classNames,
      ...props
    },
    variantProps,
  ] = useMemo(
    () => mapPropsVariants(originalProps, dateFieldStyles.variantKeys),
    [originalProps],
  )

  const styles = dateFieldStyles({
    className: classNames?.input,
    ...variantProps,
  })

  return (
    <AriaDateField
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
      <DateInput size={variantProps.size} className={styles} {...inputProps} />
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
    </AriaDateField>
  )
}

export interface DateInputProps
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
                isEditable: segment.isEditable,
                ...renderProps,
                className,
              }),
          )}
        />
      )}
    </AriaDateInput>
  )
}
