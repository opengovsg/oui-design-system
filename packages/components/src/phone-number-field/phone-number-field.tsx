import type { FocusEvents } from "react-aria"
import type {
  Props as ComponentPhoneInputProps,
  Country,
  Value as E164Number,
  FlagProps,
} from "react-phone-number-input"
import type { SetOptional } from "type-fest"
import { useMemo, useRef, useState } from "react"
import { Provider } from "react-aria-components"
import BasePhoneInput, { getCountryCallingCode } from "react-phone-number-input"
import flags from "react-phone-number-input/flags"

import type { InputProps } from "../input"
import type { BasePhoneInputProps } from "./types"
import { FieldGroup } from "../field"
import { Input as BaseInput } from "../input"
import { Select, SelectItem } from "../select"
import { useLocalizedStringFormatter } from "../system/l10n" // Imported from system as RPNI seems to not be properly retrieving locale otherwise

import { MOBILE_EXAMPLES } from "./constants"
import { PhoneInputContext, usePhoneInputContext } from "./context"
import { i18nStrings } from "./i18n"

const Input = (props: InputProps) => {
  const { placeholderMode, examples, selectedCountry } = usePhoneInputContext()
  const stringFormatter = useLocalizedStringFormatter(i18nStrings)

  const inputPlaceholder = useMemo(() => {
    const defaultPlaceholder = stringFormatter.format("Enter a phone number")
    if (placeholderMode === "off") {
      return props.placeholder ?? defaultPlaceholder
    }

    const exampleNumber = selectedCountry && examples[selectedCountry]

    if (placeholderMode === "aggressive") {
      return exampleNumber ?? props.placeholder ?? defaultPlaceholder
    }

    return props.placeholder ?? exampleNumber ?? defaultPlaceholder
  }, [
    props.placeholder,
    stringFormatter,
    placeholderMode,
    examples,
    selectedCountry,
  ])

  return (
    <BaseInput
      variant="unstyled"
      placeholder={inputPlaceholder}
      type="tel"
      autoComplete="tel"
      {...props}
    />
  )
}

export interface PhoneNumberFieldProps
  extends Omit<Partial<ComponentPhoneInputProps<InputProps>>, "disabled">,
    BasePhoneInputProps {}

export const PhoneNumberField = ({
  placeholderMode = "polite",
  examples = MOBILE_EXAMPLES,
  isDisabled,
  ...props
}: PhoneNumberFieldProps) => {
  const [value, setValue] = useState<E164Number>()
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    props.defaultCountry ?? "SG",
  )
  const triggerRef = useRef<HTMLDivElement>(null)

  return (
    <Provider
      values={[
        [
          PhoneInputContext,
          { triggerRef, placeholderMode, examples, selectedCountry },
        ],
      ]}
    >
      <FieldGroup ref={triggerRef} className="relative">
        <BasePhoneInput
          disabled={isDisabled}
          isDisabled={isDisabled}
          className="w-full"
          addInternationalOption={false}
          defaultCountry="SG"
          countryOptionsOrder={["SG"]}
          onCountryChange={setSelectedCountry}
          value={value}
          onChange={setValue}
          countrySelectComponent={CountrySelect}
          inputComponent={Input}
          {...props}
        />
      </FieldGroup>
    </Provider>
  )
}

type CountryItem = { label: string; value: Country | undefined }

interface CountrySelectProps extends Pick<FocusEvents, "onBlur" | "onFocus"> {
  value: string
  options: CountryItem[]
  onChange: (country: Country) => void
  disabled?: boolean
}

function CountrySelect(props: CountrySelectProps) {
  const { options, value, onChange, disabled, onBlur, onFocus } = props

  const { triggerRef } = usePhoneInputContext()
  const stringFormatter = useLocalizedStringFormatter(i18nStrings)

  return (
    <Select
      popoverProps={{
        // Position popover relative to the wrapping div instead of the Button
        triggerRef,
      }}
      classNames={{
        base: "w-fit",
      }}
      enableSearch
      variant="unstyled"
      isDisabled={disabled}
      value={value}
      onChange={(v) => onChange(v as Country)}
      items={options}
      renderSelectValue={() => (
        <FlagComponent
          country={value as Country}
          countryName={value && stringFormatter.format(value as Country)}
        />
      )}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {(country) => {
        const l10nLabel = country.value
          ? stringFormatter.format(country.value)
          : ""
        return (
          <SelectItem
            classNames={{
              text: "flex flex-row items-center gap-2",
            }}
            textValue={`${l10nLabel} ${country.label}`} // Allow search by both localized and non-localized country names
            id={country.value}
          >
            <FlagComponent country={country.value} countryName={l10nLabel} />
            <span className="line-clamp-1 flex-1">{l10nLabel}</span>
            {country.value && (
              <span className="text-base-content-default/50 text-sm">{`+${getCountryCallingCode(country.value)}`}</span>
            )}
          </SelectItem>
        )
      }}
    </Select>
  )
}

const FlagComponent = ({
  country,
  countryName,
}: SetOptional<FlagProps, "country">) => {
  const Flag = country && flags[country]

  return (
    <span className="bg-interaction-support-disabled flex h-4 w-6 overflow-hidden rounded-sm [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}
