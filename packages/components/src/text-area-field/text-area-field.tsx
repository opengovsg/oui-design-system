import {
  composeTailwindRenderProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from "react-aria-components"

import { Description, FieldError, Label } from "../field"
import { TextArea, TextAreaProps } from "../text-area"

export interface TextAreaFieldProps extends AriaTextFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
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
      {label && <Label className={classNames?.label}>{label}</Label>}
      <TextArea className={classNames?.input} {...inputProps} />
      {description && (
        <Description className={classNames?.description}>
          {description}
        </Description>
      )}
      <FieldError className={classNames?.error}>{errorMessage}</FieldError>
    </AriaTextField>
  )
}
