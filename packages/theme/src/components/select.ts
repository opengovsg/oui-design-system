import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const selectItemStyles = tv({
  slots: {
    base: "group text-base-content-strong flex cursor-default items-center gap-2 rounded-sm px-4 py-2 outline-hidden select-none",
    text: "prose-body-1 group-selected:prose-subhead-1 text-base-content-strong flex flex-1 items-center gap-2 truncate",
    icon: "flex w-5 items-center",
  },
  variants: {
    color: {
      main: {
        base: "focus:bg-interaction-muted-main-hover active:bg-interaction-muted-main-active",
        icon: "text-interaction-main-default",
      },
    },
    isDisabled: {
      true: "",
    },
    isFocused: {
      true: "",
    },
    isSelected: {
      true: "",
    },
  },
  defaultVariants: {
    color: "main",
  },
})

export type SelectItemVariantProps = VariantProps<typeof selectItemStyles>
export type SelectItemVariantSlots = keyof ReturnType<typeof selectItemStyles>

export const selectStyles = tv({
  slots: {
    base: "flex w-[200px] flex-col gap-1",
    label: "",
    trigger: "",
    selectedText: "flex-1 truncate text-start",
  },
  variants: {
    variant: {
      solid: "",
      reverse: "",
      outline: "",
      clear: "",
      unstyled: "",
    },
    color: {
      main: "",
      success: "",
      warning: "",
      critical: "",
      sub: "",
      neutral: "",
      inverse: "",
    },
    size: {
      md: { selectedText: "prose-body-1" },
    },
  },
  defaultVariants: {
    variant: "outline",
    color: "sub",
    size: "md",
  },
})

export type SelectVariantProps = VariantProps<typeof selectStyles>
export type SelectVariantSlots = keyof ReturnType<typeof selectStyles>
