"use client"

import { createContext } from "../system/react-utils"
import type { CheckboxProps } from "./checkbox"

export interface UseProvideCheckboxGroupStylesReturn {
  size: CheckboxProps["size"]
}

export const [CheckboxGroupStyleContext, useCheckboxGroupStyleContext] =
  createContext<UseProvideCheckboxGroupStylesReturn, false>({
    name: "CheckboxGroupStyleContext",
    strict: false,
    defaultValue: {
      size: "md",
    },
  })
