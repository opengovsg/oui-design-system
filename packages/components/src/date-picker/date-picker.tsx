"use client"

import type {
  CalendarSlots,
  DatePickerSlots,
  FieldErrorSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import {
  composeTailwindRenderProps,
  datePickerStyles,
} from "@opengovsg/oui-theme"
import { CalendarIcon } from "lucide-react"
import { useMemo } from "react"
import type {
  DatePickerProps as AriaDatePickerProps,
  DateValue,
  ValidationResult,
} from "react-aria-components"
import { DatePicker as AriaDatePicker, Dialog } from "react-aria-components"

import type { ButtonProps } from "../button"
import { Button } from "../button"
import type { CalendarProps } from "../calendar"
import { Calendar } from "../calendar"
import { DateInput } from "../date-field"
import { Description, FieldError, FieldGroup, Label } from "../field"
import type { PopoverProps } from "../popover"
import { Popover } from "../popover"
import { mapPropsVariants } from "../system/utils"

interface DatePickerProps<T extends DateValue>
  extends VariantProps<typeof datePickerStyles>, AriaDatePickerProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  selectorIcon?: React.ReactNode
  calendarProps?: CalendarProps<T>
  popoverProps?: PopoverProps
  calendarButtonProps?: ButtonProps
  classNames?: SlotsToClasses<DatePickerSlots | "description"> & {
    calendar?: SlotsToClasses<CalendarSlots>
    error?: SlotsToClasses<FieldErrorSlots>
    popover?: PopoverProps["classNames"]
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
      selectorIcon,
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
          variant="unstyled"
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
          {selectorIcon ?? (
            <CalendarIcon
              className={styles.selectorIcon({
                className: classNames?.selectorIcon,
              })}
              aria-hidden
            />
          )}
        </Button>
      </FieldGroup>
      <Popover
        placement="bottom end"
        classNames={classNames?.popover}
        {...popoverProps}
      >
        <Dialog className={styles.dialog({ className: classNames?.dialog })}>
          <Calendar
            size={variantProps.size === "xs" ? "sm" : variantProps.size}
            classNames={classNames?.calendar}
            pageBehavior={props.pageBehavior}
            {...calendarProps}
          />
        </Dialog>
      </Popover>
      {description && (
        <Description
          className={classNames?.description}
          size={variantProps.size}
        >
          {description}
        </Description>
      )}
      <FieldError classNames={classNames?.error} size={variantProps.size}>
        {errorMessage}
      </FieldError>
    </AriaDatePicker>
  )
}
