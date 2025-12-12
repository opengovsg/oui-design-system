import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const toastStyles = tv({
  slots: {
    base: "prose-body-1",
    toast:
      "group/toast text-base-content-default relative flex w-(--width) flex-wrap items-start gap-2 rounded-sm px-4 py-3 has-data-close-button:pr-12 has-data-icon:pl-10 data-[expanded=false]:data-[front=false]:overflow-hidden",
    title: "[&:has(+[data-description])]:prose-subhead-1",
    description: "",
    loader: "absolute inset-0 size-5 [--size:20px]!",
    closeButton:
      "absolute top-3.25 right-4 flex size-5 cursor-pointer items-center justify-center rounded-sm p-0",
    cancelButton:
      "prose-caption-1 group-data-[type=warning]/toast:bg-utility-feedback-warning-strong/10 group-data-[type=info]/toast:bg-utility-feedback-info/10 group-data-[type=success]/toast:bg-utility-feedback-success/10 group-data-[type=error]/toast:bg-utility-feedback-critical/10 hover:group-data-[type=warning]/toast:bg-utility-feedback-warning-strong/15 hover:group-data-[type=info]/toast:bg-utility-feedback-info/15 hover:group-data-[type=success]/toast:bg-utility-feedback-success/15 hover:group-data-[type=error]/toast:bg-utility-feedback-critical/15 active:group-data-[type=warning]/toast:bg-utility-feedback-warning-strong/20 active:group-data-[type=info]/toast:bg-utility-feedback-info/20 active:group-data-[type=success]/toast:bg-utility-feedback-success/20 active:group-data-[type=error]/toast:bg-utility-feedback-critical/20 bg-interaction-neutral-default/10 hover:bg-interaction-neutral-default/15 active:bg-interaction-neutral-default/20 h-6 shrink-0 cursor-pointer rounded-sm px-2 transition!",
    actionButton:
      "prose-caption-1 text-base-content-inverse group-data-[type=warning]/toast:text-base-content-default group-data-[type=warning]/toast:bg-interaction-warning-default group-data-[type=info]/toast:bg-interaction-main-default group-data-[type=success]/toast:bg-interaction-success-default group-data-[type=error]/toast:bg-interaction-critical-default hover:group-data-[type=warning]/toast:bg-interaction-warning-hover hover:group-data-[type=info]/toast:bg-interaction-main-hover hover:group-data-[type=success]/toast:bg-interaction-success-hover hover:group-data-[type=error]/toast:bg-interaction-critical-hover active:group-data-[type=warning]/toast:bg-interaction-warning-active active:group-data-[type=info]/toast:bg-interaction-main-active active:group-data-[type=success]/toast:bg-interaction-success-active active:group-data-[type=error]/toast:bg-interaction-critical-active bg-interaction-neutral-default hover:bg-interaction-neutral-hover active:bg-interaction-neutral-active h-6 shrink-0 cursor-pointer rounded-sm px-2 transition!",
    success: "",
    error: "",
    info: "",
    warning: "",
    loading: "",
    default: "",
    content: "flex w-full shrink-0 flex-col gap-0.5",
    icon: "group-data-[type=warning]/toast:text-utility-feedback-warning group-data-[type=info]/toast:text-utility-feedback-info group-data-[type=success]/toast:text-utility-feedback-success group-data-[type=error]/toast:text-utility-feedback-critical absolute left-4 my-0.5 flex size-5 shrink-0 items-center justify-start",
  },
  variants: {
    variant: {
      bordered: {
        loading: "border bg-white",
        default: "border bg-white",
        success:
          "border-utility-feedback-success bg-utility-feedback-success-subtle!",
        error:
          "border-utility-feedback-critical bg-utility-feedback-critical-subtle!",
        info: "border-utility-feedback-info bg-utility-feedback-info-subtle!",
        warning:
          "border-utility-feedback-warning bg-utility-feedback-warning-subtle!",
      },
    },
  },
  defaultVariants: {
    variant: "bordered",
  },
})

export type ToastVariantProps = VariantProps<typeof toastStyles>
export type ToastSlots = keyof ReturnType<typeof toastStyles>
