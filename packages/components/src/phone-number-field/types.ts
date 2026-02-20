import type { Country } from "react-phone-number-input"

export interface BasePhoneInputProps {
  /**
   * Set the input's placeholder to an example number for the selected country,
   * and update it if the country changes.
   *
   * By default it is set to "polite", which means it will only set the
   * placeholder if the input doesn't already have one. You can also set it to
   * "aggressive", which will replace any existing placeholder, or "off" to not
   * show any example numbers in the placeholder.
   */
  placeholderMode?: "polite" | "aggressive" | "off"

  /**
   * Examples to retrieve placeholder number from, if any. Defaults to
   * `MOBILE_EXAMPLES` if none provided.
   */
  examples?: { [country in Country]: string }
}
