import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const phoneNumberFieldStyles = tv({
  slots: {
    base: "flex flex-col gap-2",
    group: "group/field relative overflow-hidden",
    wrapper: "inline-flex w-full items-center overflow-hidden",
    label: "",
    input: "h-auto",
    description: "",
    error: "",
    select: "w-fit",
    selectTrigger:
      "border-base-divider-strong hover:bg-interaction-muted-main-hover focus:bg-interaction-muted-main-hover active:bg-interaction-muted-main-active pressed:bg-interaction-muted-main-active h-auto min-w-auto rounded-r-none border-r outline-offset-0 disabled:active:bg-inherit",
    selectIcon: "",
    selectItem: "flex flex-row items-center gap-2",
    selectItemLabel: "line-clamp-1 flex-1",
    selectItemCountryCode: "text-base-content-default/50 prose-caption-1",
    flag: "bg-interaction-support-disabled flex shrink-0 overflow-hidden",
    selectList: "",
    selectPopover: "",
  },
  variants: {
    variant: {
      local: {},
      international: {},
    },
    size: {
      xs: {
        input: "h-8.5",
        selectTrigger: "h-8.5 px-2 py-2",
        flag: "[&_svg]:h-3 [&_svg]:w-4.5",
      },
      sm: {
        input: "h-9.5",
        selectTrigger: "h-9.5 px-2 py-2.5",
        flag: "[&_svg]:h-4 [&_svg]:w-6",
      },
      md: {
        input: "h-10.5",
        selectTrigger: "h-10.5 px-2 py-3",
        flag: "[&_svg]:h-4 [&_svg]:w-6",
      },
    },
    isDisabled: {
      true: {
        input: "",
      },
    },
  },
  compoundVariants: [
    {
      size: "xs",
      variant: "local",
      className: {
        flag: "mr-2",
      },
    },
    {
      size: "sm",
      variant: "local",
      className: {
        flag: "mr-2",
      },
    },
    {
      size: "md",
      variant: "local",
      className: {
        flag: "mr-3.5",
      },
    },
  ],
  defaultVariants: {
    size: "md",
  },
})

export type PhoneNumberFieldVariantProps = VariantProps<
  typeof phoneNumberFieldStyles
>

export type PhoneNumberFieldSlots = keyof ReturnType<
  typeof phoneNumberFieldStyles
>
