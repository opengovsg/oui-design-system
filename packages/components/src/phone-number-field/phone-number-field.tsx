"use client"

import type {
  TextFieldProps as AriaTextFieldProps,
  InputProps,
  ValidationResult,
} from "react-aria-components"
import { useState } from "react"
import { useLocalizedStringFormatter } from "react-aria"
import { TextField as AriaTextField, Input } from "react-aria-components"

import type {
  phoneNumberFieldStyles,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import { composeTailwindRenderProps } from "@opengovsg/oui-theme"

import type { CountryCode } from "./constants"
import { Description, FieldError, FieldGroup, Label } from "../field"
import { Select, SelectItem } from "../select"
import {
  COUNTRY_CODE_TO_EMOJI,
  COUNTRY_CODE_TO_NAME,
  getCountrySelectOptions,
  MOBILE_EXAMPLES,
} from "./constants"
import { i18nStrings } from "./i18n"

interface PhoneNumberFieldProps
  extends AriaTextFieldProps,
    VariantProps<typeof phoneNumberFieldStyles> {
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode | ((validation: ValidationResult) => string)
  classNames?: SlotsToClasses<
    "base" | "label" | "input" | "description" | "error"
  >
  inputProps?: InputProps
}

export const PhoneNumberField = ({
  className,
  label,
  size,
  variant,
  inputProps,
  description,
  errorMessage,
  classNames,
  ...props
}: PhoneNumberFieldProps) => {
  const stringFormatter = useLocalizedStringFormatter(i18nStrings)

  const [countryCode, setCountryCode] = useState<CountryCode | "">("")

  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(
        className ?? classNames?.base,
        "flex flex-col gap-2",
      )}
    >
      {label && (
        <Label size={size} className={classNames?.label}>
          {label}
        </Label>
      )}
      <FieldGroup>
        <Select
          variant="unstyled"
          value={countryCode}
          onChange={(value) => setCountryCode(value ?? "")}
          aria-label={stringFormatter.format("Select a country")}
          classNames={{
            base: "w-fit",
            popover: "w-auto",
          }}
          renderSelectValue={({
            selectedItems,
            selectedText,
            isPlaceholder,
          }) => {
            if (isPlaceholder) return "🏳️"
            const selectedCode = selectedItems[0]?.id
            if (!selectedCode) return selectedText
            return COUNTRY_CODE_TO_EMOJI[selectedCode]
          }}
          items={getCountrySelectOptions()}
          enableSearch
        >
          {(option) => <SelectItem id={option.id}>{option.value}</SelectItem>}
        </Select>
        <Input
          placeholder={countryCode ? MOBILE_EXAMPLES[countryCode] : ""}
          type="tel"
          className={classNames?.input}
          {...inputProps}
        />
      </FieldGroup>
      {description && (
        <Description size={size} className={classNames?.description}>
          {description}
        </Description>
      )}
      <FieldError size={size} className={classNames?.error}>
        {errorMessage}
      </FieldError>
    </AriaTextField>
  )
}
