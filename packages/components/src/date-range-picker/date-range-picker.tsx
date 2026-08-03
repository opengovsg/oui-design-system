"use client"

import { CalendarDate } from "@internationalized/date"
import type {
  CalendarSlots,
  DateRangePickerSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import {
  composeTailwindRenderProps,
  dateRangePickerStyles,
} from "@opengovsg/oui-theme"
import { CalendarIcon } from "lucide-react"
import { useMemo } from "react"
import type {
  DateRangePickerProps as AriaDateRangePickerProps,
  DateValue,
  ValidationResult,
} from "react-aria-components"
import {
  DateRangePicker as AriaDateRangePicker,
  Dialog,
} from "react-aria-components"

import type { ButtonProps } from "../button"
import { Button } from "../button"
import { DateInput } from "../date-field"
import { Description, FieldError, FieldGroup, Label } from "../field"
import type { PopoverProps } from "../popover"
import { Popover } from "../popover"
import type { RangeCalendarProps } from "../range-calendar"
import { RangeCalendar } from "../range-calendar"
import { mapPropsVariants } from "../system/utils"

export interface DateRangePickerProps<T extends DateValue>
  extends
    AriaDateRangePickerProps<T>,
    VariantProps<typeof dateRangePickerStyles> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  calendarProps?: RangeCalendarProps<T>
  popoverProps?: PopoverProps
  calendarButtonProps?: ButtonProps
  classNames?: SlotsToClasses<DateRangePickerSlots> & {
    calendar?: SlotsToClasses<CalendarSlots>
  }
}

export function DateRangePicker<T extends DateValue>(
  originalProps: DateRangePickerProps<T>,
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
      minValue: minValueProp,
      maxValue: maxValueProp,
      ...props
    },
    variantProps,
  ] = useMemo(
    () => mapPropsVariants(originalProps, dateRangePickerStyles.variantKeys),
    [originalProps],
  )
  const styles = dateRangePickerStyles(variantProps)

  const { minValue, maxValue } = useMemo(() => {
    return {
      minValue: minValueProp ?? new CalendarDate(1900, 0, 1), // Default to 1 Jan 1900
      maxValue: maxValueProp ?? new CalendarDate(2100, 12, 31), // Default to 31 Dec 2100
    }
  }, [maxValueProp, minValueProp])

  return (
    <AriaDateRangePicker
      {...props}
      minValue={minValue}
      maxValue={maxValue}
      className={composeTailwindRenderProps(
        className ?? classNames?.base,
        styles.base(),
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className={styles.group({ className: classNames?.group })}>
        <div
          className={styles.dateWrapper({ className: classNames?.dateWrapper })}
        >
          <DateInput
            variant="unstyled"
            slot="start"
            size={variantProps.size}
            className={styles.startInput({ className: classNames?.startInput })}
          />
          <span
            aria-hidden="true"
            className={styles.connector({
              className: classNames?.connector,
            })}
          >
            –
          </span>
          <DateInput
            variant="unstyled"
            slot="end"
            size={variantProps.size}
            className={styles.endInput({ className: classNames?.endInput })}
          />
        </div>
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
      {description && (
        <Description size={variantProps.size}>{description}</Description>
      )}
      <FieldError size={variantProps.size}>{errorMessage}</FieldError>
      <Popover placement="bottom end" {...popoverProps}>
        <Dialog className={styles.dialog({ className: classNames?.dialog })}>
          <RangeCalendar
            visibleDuration={{ months: 2 }}
            size={variantProps.size === "xs" ? "sm" : variantProps.size}
            classNames={classNames?.calendar}
            minValue={minValue}
            maxValue={maxValue}
            {...calendarProps}
          />
        </Dialog>
      </Popover>
    </AriaDateRangePicker>
  )
}
