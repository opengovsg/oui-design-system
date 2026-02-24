export {
  PhoneNumberField,
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "./phone-number-field"
export type {
  PhoneNumberFieldProps,
  CountrySelectProps,
  FlagComponentProps,
  PhoneInputProps,
} from "./phone-number-field"

export {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  parsePhoneNumber,
  isPossiblePhoneNumber,
  /**
   * @deprecated Use `isPossiblePhoneNumber` instead. The rationale is that telephone numbering plans can and sometimes do change, meaning that `isValidPhoneNumber()` function may one day become outdated on a website that isn't actively maintained anymore.
   */
  isValidPhoneNumber,
} from "react-phone-number-input"
