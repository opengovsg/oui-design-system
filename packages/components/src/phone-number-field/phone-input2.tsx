import type { FocusEvents } from "react-aria"
import type {
  Props as BasePhoneInputProps,
  Country,
  Value as E164Number,
  FlagProps,
} from "react-phone-number-input"
import { useMemo, useRef, useState } from "react"
import { Provider } from "react-aria-components"
import BasePhoneInput, { getCountryCallingCode } from "react-phone-number-input"
import flags from "react-phone-number-input/flags"

import type { InputProps } from "../input"
import { FieldGroup } from "../field"
import { Input as BaseInput } from "../input"
import { Select, SelectItem } from "../select"
import { useLocalizedStringFormatter } from "../system/l10n" // Imported from system as RPNI seems to not be properly retrieving locale otherwise

import { PhoneInputContext, usePhoneInputContext } from "./context"
import { i18nStrings } from "./i18n"

const Input = (props: InputProps) => {
  const stringFormatter = useLocalizedStringFormatter(i18nStrings)

  return (
    <BaseInput
      variant="unstyled"
      placeholder={stringFormatter.format("Enter a phone number")}
      type="tel"
      autoComplete="tel"
      {...props}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PhoneInputProps
  extends Partial<BasePhoneInputProps<InputProps>> {}

export const PhoneInput = (props: PhoneInputProps) => {
  const [value, setValue] = useState<E164Number>()
  const triggerRef = useRef<HTMLDivElement>(null)

  return (
    <Provider values={[[PhoneInputContext, { triggerRef }]]}>
      <FieldGroup ref={triggerRef} className="relative">
        <BasePhoneInput
          defaultCountry="SG"
          countryOptionsOrder={["SG"]}
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

type CountryItem = { label: string; value: Country }

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

  // Filter invalid options (e.g. when value is empty string)
  const validOptions = useMemo(
    () => options.filter((option) => !!option.value),
    [options],
  )
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
      items={validOptions}
      renderSelectValue={() => (
        <FlagComponent
          country={value as Country}
          countryName={stringFormatter.format(value as Country)}
        />
      )}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {(country) => {
        const l10nLabel = stringFormatter.format(country.value)
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
            <span className="text-base-content-default/50 text-sm">{`+${getCountryCallingCode(country.value)}`}</span>
          </SelectItem>
        )
      }}
    </Select>
  )
}

const FlagComponent = ({ country, countryName }: FlagProps) => {
  const Flag = flags[country]

  return (
    <span className="bg-interaction-support-disabled flex h-4 w-6 overflow-hidden rounded-sm [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}
