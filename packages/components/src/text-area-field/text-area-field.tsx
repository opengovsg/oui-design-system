"use client"

import type { SlotsToClasses, TextAreaVariantProps } from "@opengovsg/oui-theme"
import { composeTailwindRenderProps } from "@opengovsg/oui-theme"
import type {
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from "react-aria-components"
import { TextField as AriaTextField } from "react-aria-components"

import { Description, FieldError, Label } from "../field"
import type { TextAreaProps } from "../text-area"
import { TextArea } from "../text-area"

export interface TextAreaFieldProps
  extends AriaTextFieldProps, TextAreaVariantProps {
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?:
    | React.ReactNode
    | ((validation: ValidationResult) => React.ReactNode)
  classNames?: SlotsToClasses<
    "base" | "label" | "input" | "description" | "error"
  >
  inputProps?: TextAreaProps
}

export function TextAreaField({
  label,
  description,
  errorMessage,
  classNames,
  className,
  inputProps,
  size,
  variant,
  ...props
}: TextAreaFieldProps) {
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
      <TextArea
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
