import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils"

export const selectSearchStyles = tv({
  slots: {
    base: "",
    icon: "",
    input: "",
    clear: "",
  },
})

export const selectItemStyles = tv({
  slots: {
    base: "text-base-content-strong group flex cursor-default items-center gap-2 rounded-sm px-4 py-2 outline-hidden select-none",
    text: "line-clamp-1 flex-1 text-inherit",
  },
  variants: {
    color: {
      main: {
        base: "focus:bg-interaction-muted-main-hover active:bg-interaction-muted-main-active selected:bg-interaction-muted-main-active",
      },
    },
    size: {
      xs: {
        base: "prose-body-2 px-3 py-3",
      },
      sm: {
        base: "prose-body-2 px-3 py-3",
      },
      md: {
        base: "prose-body-1 px-4 py-3",
        text: "group-selected/select:prose-subhead-1",
      },
    },
    isDisabled: {
      true: {
        base: "bg-interaction-support-disabled text-interaction-support-disabled-content",
      },
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
    base: "group/select flex w-full flex-col gap-1",
    label: "",
    trigger: "w-full",
    icon: "size-4",
    selectedText: "text-base-content-strong flex-1 truncate text-start",
    popover: "flex w-(--trigger-width) flex-col",
    list: "overflow-y-auto",
    description: "",
    searchField:
      "group/search border-base-divider-strong flex items-center gap-2 border-b",
    searchIcon: "text-base-content-subtle shrink-0",
    searchInput:
      "min-w-0 flex-1 truncate border-none bg-transparent px-0 py-0 outline-none placeholder:truncate focus:ring-0",
  },
  variants: {
    variant: {
      solid: "",
      reverse: "",
      outline: {
        trigger: "group-invalid/select:border-interaction-critical-default",
      },
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
        list: "max-h-66",
        searchField: "px-3 py-2",
        searchIcon: "size-4",
        searchInput: "prose-body-2",
      },
      sm: {
        selectedText: "prose-body-2",
        list: "max-h-66",
        searchField: "px-3 py-2.5",
        searchIcon: "size-4",
        searchInput: "prose-body-2",
      },
      md: {
        selectedText: "prose-body-1",
        list: "max-h-72",
        searchField: "px-4 py-2.5",
        searchIcon: "size-5",
        searchInput: "prose-body-1",
      },
    },
  },
  compoundVariants: [
    // outline / color
    {
      variant: "outline",
      color: "main",
      className: {
        trigger: "pressed:bg-interaction-tinted-main-hover",
      },
    },
    {
      variant: "outline",
      color: "sub",
      className: {
        trigger: "pressed:bg-interaction-tinted-sub-hover",
      },
    },
    // clear / color
    {
      variant: "clear",
      color: "main",
      className: {
        trigger: "pressed:bg-interaction-tinted-main-hover",
      },
    },
    {
      variant: "clear",
      color: "sub",
      className: {
        trigger: "pressed:bg-interaction-tinted-sub-hover",
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
