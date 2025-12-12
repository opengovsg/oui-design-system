import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const toastStyles = tv({
  slots: {
    base: "toaster group",
    toast: "",
    title: "group-[.toast]:font-medium",
    description: "group-[.toast]:text-muted-foreground",
    loader: "",
    closeButton: "",
    cancelButton:
      "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
    actionButton:
      "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
    success:
      "border-utility-feedback-success bg-utility-feedback-success-subtle rounded-sm border",
    error: "",
    info: "",
    warning: "",
    loading: "",
    default: "",
    content: "",
    icon: "",
  },
  variants: {},
  defaultVariants: {},
})

export type ToastVariantProps = VariantProps<typeof toastStyles>
export type ToastSlots = keyof ReturnType<typeof toastStyles>
