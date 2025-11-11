"use client"

import { numberFieldStyles, VariantProps } from "@opengovsg/oui-theme"

interface NumberFieldProps extends VariantProps<typeof numberFieldStyles> {}

export const NumberField = ({  }: NumberFieldProps) => {
  return (
    <div>
      <h1>NumberField</h1>
    </div>
  )
}
