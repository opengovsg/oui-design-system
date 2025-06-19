"use client"

import { dateFieldStyles, VariantProps } from "@opengovsg/oui-theme"

interface DateFieldProps extends VariantProps<typeof dateFieldStyles> {}

export const DateField = ({  }: DateFieldProps) => {
  return (
    <div>
      <h1>date-field</h1>
    </div>
  )
}
