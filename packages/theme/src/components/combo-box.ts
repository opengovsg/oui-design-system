import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"
import { inputStyles } from "./input"

export const comboBoxStyles = tv({
  slots: {
    container: "group isolate flex flex-col gap-2",
    label: "",
    group: "z-10 flex-1",
    expandButton: "h-full cursor-pointer",
    icon: "",
    field: "h-full w-full overflow-ellipsis outline-hidden",
    popover: "mt-0.5 w-(--trigger-width) overflow-hidden bg-white shadow-sm",
    list: "w-unset block max-h-[300px] min-h-0 overflow-y-auto",
  },
  base: [],
  variants: {
    isClearable: {
      true: {
        group: "rounded-r-none",
      },
    },
    isDisabled: {
      true: {
        expandButton:
          "text-interaction-support-disabled-content cursor-default",
      },
    },
    size: {
      xs: {
        field: "px-3",
        group: [inputStyles.variants.size.xs, "gap-1 px-0"],
        expandButton: "-my-2 h-9 px-3",
        icon: "h-4 w-4",
      },
      sm: {
        popover: "mt-1",
        field: "px-3",
        group: [inputStyles.variants.size.sm, "gap-1 px-0"],
        expandButton: "-my-2.5 h-10 px-3",
        icon: "h-4 w-4",
      },
      md: {
        group: [inputStyles.variants.size.md, "gap-1 px-0"],
        field: "px-4",
        expandButton: "-my-2 h-11 px-4",
        icon: "h-5 w-5",
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
      xs: {
        container: "prose-body-2 px-3 py-3",
        description: "prose-body-2",
      },
      sm: {
        container: "prose-body-2 px-3 py-3",
        description: "prose-body-2",
      },
      md: { container: "prose-body-1 px-4 py-3", description: "prose-body-2" },
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
    {
      size: ["sm", "xs"],
      isSelected: true,
      className: { container: "prose-subhead-2" },
    },
  ],
  defaultVariants: {
    size: "md",
  },
})

export type ComboBoxItemVariantProps = VariantProps<typeof comboBoxItemStyles>
export type ComboBoxItemSlots = keyof ReturnType<typeof comboBoxItemStyles>

export const comboBoxClearButtonStyles = tv({
  base: "border-base-divider-strong text-base-content-strong z-0 -ml-px cursor-pointer rounded-sm rounded-l-none border outline-hidden transition",
  variants: {
    isDisabled: {
      true: "bg-interaction-support-disabled text-interaction-support-disabled-content cursor-default",
    },
    isInactive: {
      true: "text-interaction-support-disabled-content",
    },
    isHovered: {
      true: "bg-interaction-muted-main-hover",
    },
    isFocused: {
      true: "border-utility-focus-default shadow-utility-focus-default z-20 shadow-[0_0_0_1px]",
    },
    isPressed: {
      true: "text-base-content-strong",
    },
    size: {
      xs: "h-9 px-2.5",
      sm: "h-10 px-2.5",
      md: "h-11 px-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
})
