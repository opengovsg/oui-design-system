"use client"

import type {
  DatePickerProps as AriaDatePickerProps,
  DateValue,
  ValidationResult,
} from "react-aria-components"
import { useMemo } from "react"
import { CalendarIcon } from "lucide-react"
import { DatePicker as AriaDatePicker, Dialog } from "react-aria-components"

import type {
  CalendarSlots,
  DatePickerSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import {
  composeTailwindRenderProps,
  datePickerStyles,
} from "@opengovsg/oui-theme"

import type { ButtonProps } from "../button"
import type { CalendarProps } from "../calendar"
import type { PopoverProps } from "../popover"
import { Button } from "../button"
import { Calendar } from "../calendar"
import { DateInput } from "../date-field"
import { Description, FieldError, FieldGroup, Label } from "../field"
import { Popover } from "../popover"
import { mapPropsVariants } from "../system/utils"

interface DatePickerProps<T extends DateValue>
  extends VariantProps<typeof datePickerStyles>,
    AriaDatePickerProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  calendarProps?: CalendarProps<T>
  popoverProps?: PopoverProps
  calendarButtonProps?: ButtonProps
  classNames?: SlotsToClasses<DatePickerSlots> & {
    calendar?: SlotsToClasses<CalendarSlots>
  }
}

export function DatePicker<T extends DateValue>(
  originalProps: DatePickerProps<T>,
) {
  const [
    {
      label,
      description,
      errorMessage,
      classNames,
      className,
      calendarProps,
      popoverProps,
      calendarButtonProps,
      ...props
    },
    variantProps,
  ] = useMemo(
    () => mapPropsVariants(originalProps, datePickerStyles.variantKeys),
    [originalProps],
  )
  const styles = datePickerStyles(variantProps)

  return (
    <AriaDatePicker
      {...props}
      className={composeTailwindRenderProps(
        className ?? classNames?.base,
        styles.base(),
      )}
    >
      {label && <Label size={variantProps.size}>{label}</Label>}
      <FieldGroup className={styles.group({ className: classNames?.group })}>
        <DateInput
          size={variantProps.size}
          className={styles.input({ className: classNames?.input })}
        />
        <Button
          isIconOnly
          isAttached
          variant="clear"
          color="sub"
          size={variantProps.size}
          className={styles.calendarButton({
            className: classNames?.calendarButton,
          })}
          {...calendarButtonProps}
        >
          <CalendarIcon aria-hidden />
        </Button>
      </FieldGroup>
      <Popover placement="bottom end" {...popoverProps}>
        <Dialog className={styles.dialog({ className: classNames?.dialog })}>
          {/** @ts-expect-error Types do overlap but not resolving for some reason. */}
          <Calendar
            size={variantProps.size === "xs" ? "sm" : variantProps.size}
            classNames={classNames?.calendar}
            {...calendarProps}
          />
        </Dialog>
      </Popover>
      {description && (
        <Description size={variantProps.size}>{description}</Description>
      )}
      <FieldError size={variantProps.size}>{errorMessage}</FieldError>
    </AriaDatePicker>
  )
}
