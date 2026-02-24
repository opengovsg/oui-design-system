import type { LocalizedStringFormatter } from "react-aria"
import type { Country } from "react-phone-number-input"
import type { SetRequired } from "type-fest"

import type {
  PhoneNumberFieldSlots,
  phoneNumberFieldStyles,
  PhoneNumberFieldVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"

import type { i18nStrings } from "./i18n"
import type { BasePhoneInputProps } from "./types"
import { createContext } from "../system/react-utils"

export interface UseProvidePhoneInputContextReturn
  extends SetRequired<BasePhoneInputProps, "placeholderMode" | "examples">,
    PhoneNumberFieldVariantProps {
  triggerRef: React.RefObject<HTMLDivElement | null>
  selectedCountry: Country | undefined
  classNames?: SlotsToClasses<PhoneNumberFieldSlots>
  styles: ReturnType<typeof phoneNumberFieldStyles>

  stringFormatter: LocalizedStringFormatter<
    keyof (typeof i18nStrings)[keyof typeof i18nStrings]
  >
}

export const [PhoneInputContext, usePhoneInputContext] =
  createContext<UseProvidePhoneInputContextReturn>({
    name: "PhoneInputContext",
  })
