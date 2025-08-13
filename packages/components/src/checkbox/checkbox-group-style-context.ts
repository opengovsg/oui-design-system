"use client"

import type { CheckboxProps } from "./checkbox"
import { createContext } from "../system/react-utils"

export interface UseProvideCheckboxGroupStylesReturn {
  size: CheckboxProps["size"]
}

export const [CheckboxGroupStyleContext, useCheckboxGroupStyleContext] =
  createContext<UseProvideCheckboxGroupStylesReturn>({
    name: "CheckboxGroupStyleContext",
    strict: false,
    defaultValue: {
      size: "md",
    },
  })
