import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const bannerStyles = tv({
  slots: {
    base: "flex w-full justify-between",
    startContentWrapper: "",
    childrenWrapper: "",
    content: "flex",
    icon: "shrink-0",
    dismissButton: "shrink-0",
  },
  variants: {
    variant: {
      unstyled: "",
      info: {
        base: "bg-utility-feedback-info text-base-content-inverse",
        dismissButton:
          "focus-visible:outline-utility-focus-inverse text-base-content-inverse",
      },
      warning: {
        base: "bg-utility-feedback-warning text-base-content-strong",
        dismissButton: "text-base-content-strong",
      },
      error: {
        base: "bg-utility-feedback-critical text-base-content-inverse",
        dismissButton:
          "focus-visible:outline-utility-focus-inverse text-base-content-inverse",
      },
    },
    size: {
      sm: {
        base: "prose-body-2 gap-2 px-3 py-2",
        content: "gap-2",
        icon: "mt-0.5 size-4",
        dismissButton: "-my-2 -mr-2",
      },
      md: {
        base: "prose-body-1 gap-2 px-3 py-2",
        content: "gap-2",
        icon: "mt-0.5 size-5",
        dismissButton: "-my-1.5 -mr-2",
      },
    },
  },
  defaultVariants: {
    variant: "info",
    size: "md",
  },
})

export type BannerVariantProps = VariantProps<typeof bannerStyles>
export type BannerSlots = keyof ReturnType<typeof bannerStyles>
