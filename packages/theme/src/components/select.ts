import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const selectItemStyles = tv({
  slots: {
    base: "text-base-content-strong group flex cursor-default items-center gap-2 rounded-sm px-4 py-2 outline-hidden select-none",
    text: "text-base-content-strong line-clamp-1 flex-1",
    icon: "flex items-center",
  },
  variants: {
    color: {
      main: {
        base: "focus:bg-interaction-muted-main-hover active:bg-interaction-muted-main-active",
        icon: "text-interaction-main-default",
      },
    },
    size: {
      xs: {
        base: "prose-body-2 px-3 py-3",
        icon: "w-3.5",
      },
      sm: {
        base: "prose-body-2 px-3 py-3",
        icon: "w-4.5",
      },
      md: {
        base: "prose-body-1 px-4 py-3",
        text: "group-selected:prose-subhead-1",
        icon: "w-4.5",
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
    size: "md",
  },
})

export type SelectItemVariantProps = VariantProps<typeof selectItemStyles>
export type SelectItemVariantSlots = keyof ReturnType<typeof selectItemStyles>

export const selectStyles = tv({
  slots: {
    base: "group flex flex-col gap-1",
    label: "",
    trigger: "w-fit",
    selectedText: "flex-1 truncate text-start",
    popover:
      "motion-safe:entering:animate-in motion-safe:entering:fade-in motion-safe:exiting:animate-out motion-safe:exiting:fade-out flex w-(--trigger-width) flex-col rounded-sm bg-white shadow-md",
    list: "overflow-y-auto",
    description: "",
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
      xs: {
        selectedText: "prose-body-2",
        list: "max-h-[264px]",
      },
      sm: {
        selectedText: "prose-body-2",
        list: "max-h-[264px]",
      },
      md: {
        selectedText: "prose-body-1",
        list: "max-h-[288px]",
      },
    },
  },
  compoundVariants: [
    {
      variant: ["outline"],
      className: {
        trigger: "group-invalid:border-interaction-critical-default",
      },
    },
  ],
  defaultVariants: {
    variant: "outline",
    color: "sub",
    size: "md",
  },
})

export type SelectVariantProps = VariantProps<typeof selectStyles>
export type SelectVariantSlots = keyof ReturnType<typeof selectStyles>
