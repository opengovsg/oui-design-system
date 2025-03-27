import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"
import { listBoxItemStyles } from "./list-box"

export const menuItemStyles = tv({
  extend: listBoxItemStyles,
  slots: {
    container: "flex flex-row items-center gap-2",
    iconContainer: "flex items-center",
    icon: "",
  },
  variants: {
    size: {
      xs: {
        iconContainer: "w-3.5",
        icon: "size-3.5",
      },
      sm: {
        iconContainer: "w-4",
        icon: "size-4",
      },
      md: {
        iconContainer: "w-4",
        icon: "size-4",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type MenuItemVariantProps = VariantProps<typeof menuItemStyles>
export type MenuItemVariantSlots = keyof ReturnType<typeof menuItemStyles>

export const menuStyles = tv({
  slots: {
    base: "scrollbar-hide max-h-[inherit] overflow-x-hidden overflow-y-auto",
    popover: "min-w-(--trigger-width)",
    separator: "border-t border-gray-200",
    item: "flex flex-row items-center gap-2",
  },
  variants: {
    variant: {},
    size: {
      xs: "",
      sm: "",
      md: "",
    },
    isEmpty: {
      true: "",
    },
  },

  defaultVariants: {
    size: "md",
  },
})

export type MenuVariantProps = VariantProps<typeof menuStyles>
export type MenuVariantSlots = keyof ReturnType<typeof menuStyles>

export const menuSectionStyles = tv({
  slots: {
    base: "",
    header:
      "bg-utility-ui text-base-content-strong border-base-divider-medium -mt-px truncate border-y",
  },
  variants: {
    size: {
      xs: { header: "prose-subhead-2 px-3 py-2" },
      sm: { header: "prose-subhead-2 px-3 py-2.5" },
      md: { header: "prose-subhead-1 px-4 py-3" },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type MenuSectionVariantProps = VariantProps<typeof menuSectionStyles>
export type MenuSectionVariantSlots = keyof ReturnType<typeof menuSectionStyles>
