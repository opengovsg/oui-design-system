import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const navbarToggleStyles = tv({})

export const navbarMenuItemStyles = tv({
  variants: {
    isActive: {
      true: "",
    },
  },
})

export const navbarStyles = tv({
  slots: {
    base: [
      "px-6",
      "flex",
      "z-40",
      "w-full",
      "h-auto",
      "items-center",
      "justify-center",
      "data-[menu-open=true]:border-none",
      "bg-base-canvas-default",
    ],
    wrapper:
      "relative z-40 flex h-(--navbar-height) w-full flex-row flex-nowrap items-center justify-between gap-4",
    toggle: "group text-base-content-strong -ml-3.5",
    toggleIcon: [
      "pointer-events-none text-inherit",
      // before - first line
      "before:block before:h-0.5 before:-translate-y-1.5 before:rotate-0 before:rounded-xs before:bg-current before:transition-transform before:duration-150 before:content-[''] group-data-[open=true]:before:translate-y-0 group-data-[open=true]:before:rotate-45",
      // middle line
      "block h-0.5 w-full rounded-xs bg-current transition-opacity duration-150 group-data-[open=true]:bg-transparent",
      // after - third line
      "after:block after:h-0.5 after:translate-y-1 after:rotate-0 after:rounded-xs after:bg-current after:transition-transform after:duration-150 after:content-[''] group-data-[open=true]:after:-translate-y-0.5 group-data-[open=true]:after:-rotate-45",
    ],
    brand: "",
    content:
      "flex h-full flex-row flex-nowrap items-center gap-4 data-[justify=center]:justify-center data-[justify=end]:flex-grow data-[justify=end]:basis-0 data-[justify=end]:justify-end data-[justify=start]:flex-grow data-[justify=start]:basis-0 data-[justify=start]:justify-start",
    item: "",
    menu: "bg-base-canvas-default fixed inset-x-0 top-(--navbar-height) bottom-0 z-30 flex w-screen max-w-full flex-col gap-2 overflow-y-auto px-6 pt-2 pb-4",
    menuItem: "",
  },
  variants: {
    position: {
      static: {
        base: "static",
      },
      sticky: {
        base: "sticky inset-x-0 top-0",
      },
    },
    hasBorder: {
      true: {
        base: "border-base-divider-medium border-b",
      },
    },
  },
  defaultVariants: {
    position: "sticky",
    hasBorder: true,
  },
})

export type NavbarVariantProps = VariantProps<typeof navbarStyles>
export type NavbarSlots = keyof ReturnType<typeof navbarStyles>
