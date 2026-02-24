import type { FocusEvents } from "react-aria"
import type {
  InputProps as AriaInputProps,
  TextFieldProps,
  ValidationResult,
} from "react-aria-components"
import type {
  Props as ComponentPhoneInputProps,
  Country,
  Value as E164Number,
  ExternalValue,
  FlagProps,
} from "react-phone-number-input"
import type { SetOptional } from "type-fest"
import { useCallback, useMemo, useRef, useState } from "react"
import { Provider, TextField } from "react-aria-components"
import BasePhoneInput, { getCountryCallingCode } from "react-phone-number-input"
import flags from "react-phone-number-input/flags"

import type {
  PhoneNumberFieldSlots,
  PhoneNumberFieldVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { cn, phoneNumberFieldStyles } from "@opengovsg/oui-theme"

import type { InputProps } from "../input"
import type { BasePhoneInputProps } from "./types"
import { Description, FieldError, FieldGroup, Label } from "../field"
import { useControllableState } from "../hooks"
import { Input as BaseInput } from "../input"
import { Select, SelectItem } from "../select"
import { useLocalizedStringFormatter } from "../system/l10n" // Imported from system as RPNI seems to not be properly retrieving locale otherwise

import { mapPropsVariants } from "../system/utils"
import { MOBILE_EXAMPLES } from "./constants"
import { PhoneInputContext, usePhoneInputContext } from "./context"
import { i18nStrings } from "./i18n"

export interface PhoneInputProps extends InputProps {
  onClear: () => void
}

export const PhoneInput = ({
  onClear,
  onKeyDown,
  ...props
}: PhoneInputProps) => {
  const {
    placeholderMode,
    examples,
    selectedCountry,
    styles,
    size,
    classNames,
  } = usePhoneInputContext()
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

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.metaKey && event.key === "Backspace") {
        // Prevent the default browser behavior (which is often also deleting the line, but react-phone-number-input doesn't handle this case by default)
        event.preventDefault()
        onClear()
      } else {
        onKeyDown?.(event)
      }
    },
    [onClear, onKeyDown],
  )

  return (
    <BaseInput
      variant="unstyled"
      placeholder={inputPlaceholder}
      type="tel"
      autoComplete="tel"
      size={size}
      {...props}
      onKeyDown={handleKeyDown}
      className={styles.input({
        className: cn(classNames?.input, props.className),
      })}
    />
  )
}

export interface PhoneNumberFieldProps
  extends Omit<
      Partial<ComponentPhoneInputProps<Omit<AriaInputProps, "size">>>,
      "disabled"
    >,
    BasePhoneInputProps,
    PhoneNumberFieldVariantProps {
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode | ((validation: ValidationResult) => string)

  isInvalid?: TextFieldProps["isInvalid"]

  classNames?: SlotsToClasses<PhoneNumberFieldSlots>
  defaultValue?: ExternalValue | E164Number
}

export const PhoneNumberField = (originalProps: PhoneNumberFieldProps) => {
  const [
    {
      placeholderMode = "polite",
      examples = MOBILE_EXAMPLES,
      label,
      description,
      errorMessage,
      classNames,
      isInvalid,
      ...props
    },
    variantProps,
  ] = mapPropsVariants(originalProps, phoneNumberFieldStyles.variantKeys)
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    props.defaultCountry ?? "SG",
  )

  const [value, setValue] = useControllableState<E164Number | undefined>({
    defaultValue: props.defaultValue as E164Number,
    value: props.value as E164Number,
    onChange: props.onChange,
  })

  const triggerRef = useRef<HTMLDivElement>(null)

  const { size = "md", isDisabled } = variantProps
  const styles = phoneNumberFieldStyles({
    ...variantProps,
    isDisabled,
    size,
  })

  return (
    <TextField
      isDisabled={isDisabled}
      className={styles.base({
        className: classNames?.base,
      })}
      isInvalid={isInvalid}
    >
      {label && (
        <Label size={size} className={classNames?.label}>
          {label}
        </Label>
      )}
      <Provider
        values={[
          [
            PhoneInputContext,
            {
              triggerRef,
              placeholderMode,
              examples,
              selectedCountry,
              classNames,
              styles,
              ...variantProps,
              size,
            },
          ],
        ]}
      >
        <FieldGroup
          ref={triggerRef}
          className={styles.group({
            className: classNames?.group,
          })}
        >
          <BasePhoneInput
            disabled={isDisabled}
            className={styles.wrapper({
              className: classNames?.wrapper,
            })}
            international={false}
            addInternationalOption={false}
            defaultCountry={selectedCountry}
            countryOptionsOrder={["SG"]}
            onCountryChange={setSelectedCountry}
            countrySelectComponent={CountrySelect}
            inputComponent={PhoneInput}
            onClear={() => setValue(undefined)}
            {...props}
            value={value}
            onChange={(v) => setValue(v as E164Number)}
          />
        </FieldGroup>
      </Provider>
      {description && (
        <Description size={size} className={classNames?.description}>
          {description}
        </Description>
      )}
      <FieldError size={size} className={classNames?.error}>
        {errorMessage}
      </FieldError>
    </TextField>
  )
}

type CountryItem = { label: string; value: Country | undefined }

export interface CountrySelectProps
  extends Pick<FocusEvents, "onBlur" | "onFocus"> {
  value: string
  options: CountryItem[]
  onChange: (country: Country) => void
  disabled?: boolean
}

export function CountrySelect(props: CountrySelectProps) {
  const { options, value, onChange, onBlur, onFocus } = props

  const { triggerRef, classNames, styles, size, isDisabled } =
    usePhoneInputContext()
  const stringFormatter = useLocalizedStringFormatter(i18nStrings)

  return (
    <Select
      size={size}
      popoverProps={{
        // Position popover relative to the wrapping div instead of the Button
        triggerRef,
      }}
      classNames={{
        base: styles.select({ className: classNames?.select }),
        trigger: styles.selectTrigger({
          className: classNames?.selectTrigger,
        }),
        icon: styles.selectIcon({ className: classNames?.selectIcon }), // Apply same styles as trigger for consistent sizing
        list: styles.selectList({ className: classNames?.selectList }),
        popover: styles.selectPopover({ className: classNames?.selectPopover }),
      }}
      enableSearch
      variant="unstyled"
      isDisabled={isDisabled}
      value={value}
      onChange={(v) => onChange(v as Country)}
      items={options}
      renderSelectValue={() => (
        <FlagComponent
          className={styles.flag({ className: classNames?.flag })}
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
              text: styles.selectItem({ className: classNames?.selectItem }),
            }}
            textValue={`${l10nLabel} ${country.label}`} // Allow search by both localized and non-localized country names
            id={country.value}
          >
            <FlagComponent
              className={styles.flag({ className: classNames?.flag })}
              country={country.value}
              countryName={l10nLabel}
            />
            <span
              className={styles.selectItemLabel({
                className: classNames?.selectItemLabel,
              })}
            >
              {l10nLabel}
            </span>
            {country.value && (
              <span
                className={styles.selectItemCountryCode({
                  className: classNames?.selectItemCountryCode,
                })}
              >{`+${getCountryCallingCode(country.value)}`}</span>
            )}
          </SelectItem>
        )
      }}
    </Select>
  )
}

export interface FlagComponentProps extends SetOptional<FlagProps, "country"> {
  className?: string
}

export const FlagComponent = ({
  country,
  countryName,
  className,
}: FlagComponentProps) => {
  const Flag = country && flags[country]

  return (
    <span className={className}>{Flag && <Flag title={countryName} />}</span>
  )
}
