import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils"

export const listBoxItemStyles = tv({
  slots: {
    container:
      "text-base-content-strong focus-visible:outline-utility-focus-default flex cursor-pointer flex-col outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid",
    label: "line-clamp-1",
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
    isOpen: {
      true: "",
    },
    isSelected: {
      true: { container: "bg-interaction-muted-main-active" },
    },
    isDisabled: {
      true: {
        container:
          "text-interaction-support-disabled-content cursor-not-allowed",
      },
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: {
        container: "bg-interaction-muted-neutral-hover",
      },
    },
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

export type ListBoxItemVariantProps = VariantProps<typeof listBoxItemStyles>
export type ListBoxItemSlots = keyof ReturnType<typeof listBoxItemStyles>
