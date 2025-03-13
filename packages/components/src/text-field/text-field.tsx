"use client"

import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from "react-aria-components"

import {
  composeTailwindRenderProps,
  InputVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"

import { Description, FieldError, Label } from "../field"
import { Input, InputProps } from "../input"

export interface TextFieldProps extends AriaTextFieldProps, InputVariantProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  classNames?: SlotsToClasses<
    "base" | "label" | "input" | "description" | "error"
  >
  inputProps?: InputProps
}

export function TextField({
  label,
  description,
  errorMessage,
  classNames,
  className,
  inputProps,
  size,
  variant,
  ...props
}: TextFieldProps) {
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
      <Input
        size={size}
        variant={variant}
        className={classNames?.input}
        {...inputProps}
      />
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
