import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const numberFieldStyles = tv({
  slots: {
    base: "group text-base-content-default flex flex-col gap-1",
    label: "",
    field: "",
    description: "",
    error: "",
    input: "px-0",
    stepperContainer: "-m-px flex flex-row",
    increment: "rounded-s-none",
    decrement: "rounded-none",
  },
  variants: {
    variant: {},
    size: {
      xs: {
        input:
          "data-[has-end-content=true]:pr-1 data-[has-start-content=true]:pl-1",
        field: "pl-3 group-data-[hide-steppers=true]:pr-3",
      },
      sm: {
        input:
          "data-[has-end-content=true]:pr-1 data-[has-start-content=true]:pl-1",
        field: "pl-3 group-data-[hide-steppers=true]:pr-3",
      },
      md: {
        input:
          "data-[has-end-content=true]:pr-1.5 data-[has-start-content=true]:pl-1.5",
        field: "pl-4 group-data-[hide-steppers=true]:pr-4",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type NumberFieldVariantProps = VariantProps<typeof numberFieldStyles>
export type NumberFieldSlots = keyof ReturnType<typeof numberFieldStyles>
