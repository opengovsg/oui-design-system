import type { VariantProps } from "tailwind-variants"

import { focusVisibleClasses } from "../utils"
import { tv } from "../utils/tv"

export const sidebarStyles = tv({
  slots: {
    base: "",
    ul: "flex flex-col",
    item: [
      "group/item text-base-content-default hover:text-interaction-main-default selected:text-interaction-main-default inline-flex w-full cursor-pointer flex-row items-center transition",
      ...focusVisibleClasses,
      "-outline-offset-2",
    ],
    section: "group/section w-full",
    header: "text-base-content-strong",
    headerLi: "",
    list: "",
    label: [
      "group-expanded/item:text-interaction-main-default inline-flex flex-1 text-start transition [&>svg]:shrink-0",
      ...focusVisibleClasses,
      "-outline-offset-2",
    ],
    nestedPanel:
      "h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height]",
    chevron: "shrink-0 transition-transform",
    chevronContainer: "flex items-center justify-center",
  },
  variants: {
    variant: {},
    size: {
      md: {
        base: "",
        header: "prose-subhead-3 px-4 py-2",
        item: "prose-subhead-2 gap-3",
        label: "gap-3 p-4 [&>svg]:size-5",
        chevron: "size-5",
        chevronContainer: "p-3",
      },
    },
    isExpanded: {
      true: {
        chevron: "rotate-180",
      },
    },
    isDisabled: {
      true: {},
    },
    isCollapsed: {
      true: {
        base: "w-(--sidebar-collapsed-width) overflow-hidden [--sidebar-collapsed-width:44px]",
        header: "hidden",
        nestedPanel: "h-0! overflow-hidden",
      },
    },
    isNested: {
      true: {
        ul: "pl-7",
        item: "ml-px",
        label:
          "group-selected/item:border-l-2 group-selected/item:-ml-px group-expanded/item:-ml-px group-selected/item:border-interaction-main-default group-expanded/item:border-interaction-main-default border-base-divider-medium group-expanded/item:border-l-2 border-l pl-6",
      },
      false: {
        item: "selected:bg-interaction-muted-main-active rounded-sm",
        label: "rounded-sm",
      },
    },
  },
  compoundVariants: [
    {
      size: "md",
      isCollapsed: true,
      className: {
        ul: "gap-2 p-0.5",
        label: "flex items-center justify-center p-2",
      },
    },
    {
      isExpanded: true,
      isNested: false,
      className: {
        item: "bg-interaction-muted-main-active text-interaction-main-default",
      },
    },
  ],
  defaultVariants: {
    size: "md",
  },
})

export type SidebarVariantProps = VariantProps<typeof sidebarStyles>
export type SidebarSlots = keyof ReturnType<typeof sidebarStyles>
