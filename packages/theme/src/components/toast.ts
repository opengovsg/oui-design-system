import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const toastStyles = tv({
  slots: {
    base: "toaster group",
    toast: "flex w-(--width) items-center gap-2 rounded-sm px-2 lg:px-4",
    title: "group-[.toast]:font-medium",
    description: "group-[.toast]:text-muted-foreground",
    loader: "",
    closeButton: "",
    cancelButton: "",
    actionButton: "",
    success:
      "border-utility-feedback-success bg-utility-feedback-success-subtle border",
    error:
      "border-utility-feedback-critical bg-utility-feedback-critical-subtle border",
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
