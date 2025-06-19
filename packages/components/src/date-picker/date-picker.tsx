"use client"

import { datePickerStyles, VariantProps } from "@opengovsg/oui-theme"

interface DatePickerProps extends VariantProps<typeof datePickerStyles> {}

export const DatePicker = ({  }: DatePickerProps) => {
  return (
    <div>
      <h1>date-picker</h1>
    </div>
  )
}
