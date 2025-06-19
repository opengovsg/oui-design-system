"use client"

import { CalendarIcon } from "lucide-react"
import {
  DatePicker as AriaDatePicker,
  DatePickerProps as AriaDatePickerProps,
  DateSegment,
  DateValue,
  Dialog,
  DialogTrigger,
  Group,
  ValidationResult,
} from "react-aria-components"

import {
  composeTailwindRenderProps,
  datePickerStyles,
  VariantProps,
} from "@opengovsg/oui-theme"

import { Button } from "../button"
import { Calendar } from "../calendar"
import { DateInput } from "../date-field"
import { Description, FieldError, FieldGroup, Label } from "../field"
import { Popover } from "../popover"

interface DatePickerProps<T extends DateValue>
  extends VariantProps<typeof datePickerStyles>,
    AriaDatePickerProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DatePickerProps<T>) {
  return (
    <AriaDatePicker
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "",
        // "group flex flex-col gap-1",
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className="w-auto min-w-[208px]">
        <DateInput className="min-w-[150px] flex-1 px-2 py-1.5 text-sm" />
        <Button isIconOnly className="rounded-xs mr-1 w-6 outline-offset-0">
          <CalendarIcon aria-hidden className="h-4 w-4" />
        </Button>
      </FieldGroup>
      <Popover placement="bottom end">
        <Dialog>
          <Calendar />
        </Dialog>
      </Popover>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaDatePicker>
  )
}
