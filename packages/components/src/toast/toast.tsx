"use client"

import { toastStyles, VariantProps } from "@opengovsg/oui-theme"

interface ToastProps extends VariantProps<typeof toastStyles> {}

export const Toast = ({  }: ToastProps) => {
  return (
    <div>
      <h1>toast</h1>
    </div>
  )
}
