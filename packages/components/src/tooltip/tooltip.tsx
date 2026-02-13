"use client"

import { tooltipStyles, VariantProps } from "@opengovsg/oui-theme"

interface TooltipProps extends VariantProps<typeof tooltipStyles> {}

export const Tooltip = ({  }: TooltipProps) => {
  return (
    <div>
      <h1>tooltip</h1>
    </div>
  )
}
