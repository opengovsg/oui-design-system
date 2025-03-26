"use client"

import { menuStyles, VariantProps } from "@opengovsg/oui-theme"

interface MenuProps extends VariantProps<typeof menuStyles> {}

export const Menu = ({  }: MenuProps) => {
  return (
    <div>
      <h1>menu</h1>
    </div>
  )
}
