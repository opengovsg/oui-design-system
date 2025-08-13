"use client"

import { checkboxStyles, VariantProps } from "@opengovsg/oui-theme"

interface CheckboxProps extends VariantProps<typeof checkboxStyles> {}

export const Checkbox = ({  }: CheckboxProps) => {
  return (
    <div>
      <h1>checkbox</h1>
    </div>
  )
}
