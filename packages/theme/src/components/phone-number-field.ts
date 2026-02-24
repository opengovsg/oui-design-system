import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const phoneNumberFieldStyles = tv({
  slots: {
    base: "flex flex-col gap-2",
    group: "relative",
    wrapper: "w-full",
    label: "",
    input: "border-base-divider-strong h-auto rounded-l-none border-l",
    description: "",
    error: "",
    select: "w-fit",
    selectTrigger:
      "hover:bg-interaction-muted-main-hover focus:bg-interaction-muted-main-hover active:bg-interaction-muted-main-active pressed:bg-interaction-muted-main-active h-auto min-w-auto rounded-r-none outline-offset-0 disabled:active:bg-inherit",
    selectIcon: "",
    selectItem: "flex flex-row items-center gap-2",
    selectItemLabel: "line-clamp-1 flex-1",
    selectItemCountryCode: "text-base-content-default/50 prose-caption-1",
    flag: "bg-interaction-support-disabled flex h-4 w-6 overflow-hidden rounded-sm [&_svg:not([class*='size-'])]:size-full",
    selectList: "",
    selectPopover: "",
  },
  variants: {
    variant: {},
    size: {
      xs: {
        input: "h-8.5",
        selectTrigger: "h-8.5 px-2 py-2",
      },
      sm: {
        input: "h-9.5",
        selectTrigger: "h-9.5 px-2 py-2.5",
      },
      md: {
        input: "h-10.5",
        selectTrigger: "h-10.5 px-2 py-3",
      },
    },
    isDisabled: {
      true: {
        input: "",
      },
    },
  },
  defaultVariants: {},
})

export type PhoneNumberFieldVariantProps = VariantProps<
  typeof phoneNumberFieldStyles
>

export type PhoneNumberFieldSlots = keyof ReturnType<
  typeof phoneNumberFieldStyles
>
