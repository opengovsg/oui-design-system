import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const searchFieldStyles = tv({
  slots: {
    base: "group flex max-w-full min-w-10 flex-col gap-2 font-sans",
    label: "",
    group: "min-w-0 flex-1",
    fieldWrapper: "flex max-w-full flex-row",
    input: "rounded-none bg-transparent [&::-webkit-search-cancel-button]:hidden",
    searchIcon:
      "text-base-content-medium group-disabled:text-interaction-support-disabled-content forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]",
    clearButton: "group-empty:invisible",
  },
  variants: {
    variant: {},
    size: {
      xs: {
        searchIcon: "ml-3 size-4",
        group: "h-9",
        input: "h-auto not-first:pl-2",
      },
      sm: {
        searchIcon: "ml-3 size-4",
        group: "h-10",
        input: "h-auto not-first:pl-2",
        clearButton: "[&_svg]:h-4 [&_svg]:w-4",
      },
      md: {
        searchIcon: "ml-4 size-5",
        group: "h-11",
        input: "h-auto not-first:pl-2",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type SearchFieldVariantProps = VariantProps<typeof searchFieldStyles>
export type SearchFieldSlots = keyof ReturnType<typeof searchFieldStyles>
