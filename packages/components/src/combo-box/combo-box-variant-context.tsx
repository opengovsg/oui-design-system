import type { ContextValue } from "react-aria-components"

import type { ComboBoxVariantProps } from "@opengovsg/oui-theme"

import { createContext } from "../system/react-utils"

export const [ComboBoxVariantContext, useComboBoxVariantContext] =
  createContext<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ContextValue<ComboBoxVariantProps, any>
  >({
    name: "ComboBoxVariantContext",
    strict: true,
  })
