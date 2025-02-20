import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

export const comboBoxFuzzyHighlightedTextStyles = tv({
  base: "bg-utility-feedback-info-subtle",
  variants: {
    isSelected: {
      true: "bg-utility-focus-inverse",
    },
    isFocused: {
      true: "bg-utility-focus-inverse",
    },
  },
})

export type ComboBoxFuzzyVariantProps = VariantProps<
  typeof comboBoxFuzzyHighlightedTextStyles
>
export type ComboBoxFuzzySlots = keyof ReturnType<
  typeof comboBoxFuzzyHighlightedTextStyles
>
