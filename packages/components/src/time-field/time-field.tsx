"use client"

import { timeFieldStyles, VariantProps } from "@opengovsg/oui-theme"

interface TimeFieldProps extends VariantProps<typeof timeFieldStyles> {}

export const TimeField = ({  }: TimeFieldProps) => {
  return (
    <div>
      <h1>TimeField</h1>
    </div>
  )
}
