import type { RadioGroupVariantProps } from "@opengovsg/oui-theme"

import { createContext } from "../system/react-utils"

export interface RadioGroupVariantContextValue extends RadioGroupVariantProps {
  size: RadioGroupVariantProps["size"]
}

export const [RadioGroupVariantContext, useRadioGroupVariantContext] =
  createContext<RadioGroupVariantContextValue, false>({
    name: "RadioGroupVariantContext",
    strict: false,
    defaultValue: {
      size: "md",
    },
  })
