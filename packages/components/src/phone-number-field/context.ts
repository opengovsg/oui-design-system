import type { Country } from "react-phone-number-input"
import type { SetRequired } from "type-fest"

import type { BasePhoneInputProps } from "./types"
import { createContext } from "../system/react-utils"

export interface UseProvidePhoneInputContextReturn
  extends SetRequired<BasePhoneInputProps, "placeholderMode" | "examples"> {
  triggerRef: React.RefObject<HTMLDivElement | null>
  selectedCountry: Country | undefined
}

export const [PhoneInputContext, usePhoneInputContext] =
  createContext<UseProvidePhoneInputContextReturn>({
    name: "PhoneInputContext",
  })
