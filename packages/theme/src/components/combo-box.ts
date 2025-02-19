import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"
import { inputStyles } from "./input"

export const comboBoxStyles = tv({
  slots: {
    container: "group flex flex-col gap-2",
    label: "",
    group: "",
    expandButton: "h-full cursor-pointer",
    expandIcon: "",
    field: "h-full w-full overflow-ellipsis outline-hidden",
    popover: "mt-0.5 w-(--trigger-width) overflow-hidden bg-white shadow-sm",
    list: "w-unset block max-h-[300px] min-h-0 overflow-y-auto",
  },
  base: [],
  variants: {
    variant: {},
    isDisabled: {
      true: {
        expandButton: "cursor-default",
      },
    },
    size: {
      xs: {
        field: "px-3",
        group: [inputStyles.variants.size.xs, "gap-1 px-0"],
        expandButton: "-my-2 h-9 px-3",
        expandIcon: "h-4 w-4",
      },
      sm: {
        field: "px-3",
        group: [inputStyles.variants.size.sm, "gap-1 px-0"],
        expandButton: "-my-2.5 h-10 px-3",
        expandIcon: "h-4 w-4",
      },
      md: {
        group: [inputStyles.variants.size.md, "gap-1 px-0"],
        field: "px-4",
        expandButton: "-my-2 h-11 px-4",
        expandIcon: "h-5 w-5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type ComboBoxVariantProps = VariantProps<typeof comboBoxStyles>
export type ComboBoxSlots = keyof ReturnType<typeof comboBoxStyles>

export const comboBoxItemStyles = tv({
  slots: {
    container: "text-base-content-strong flex cursor-pointer flex-col",
    label: "",
    description: "text-base-content-medium",
  },
  variants: {
    size: {
      xs: "",
      sm: "",
      md: { container: "prose-body-1 px-4 py-3", description: "prose-body-2" },
      lg: "",
    },
    isFocused: {
      true: { container: "bg-interaction-muted-main-hover" },
    },
    isSelected: {
      true: { container: "bg-interaction-muted-main-active" },
    },
    isDisabled: {
      true: { container: "cursor-not-allowed" },
    },
  },
  compoundVariants: [
    {
      size: "md",
      isSelected: true,
      className: { container: "prose-subhead-1" },
    },
  ],
  defaultVariants: {
    size: "md",
  },
})

export type ComboBoxItemVariantProps = VariantProps<typeof comboBoxItemStyles>
export type ComboBoxItemSlots = keyof ReturnType<typeof comboBoxItemStyles>
