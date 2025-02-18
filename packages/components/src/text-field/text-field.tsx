import {
  cn,
  composeTailwindRenderProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { CircleAlert } from "lucide-react"
import {
  FieldError as AriaFieldError,
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  FieldErrorProps,
  Label,
  Text,
  TextProps,
  ValidationResult,
} from "react-aria-components"

import { Input, InputProps } from "../input"

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  classNames?: SlotsToClasses<
    "base" | "label" | "input" | "description" | "error"
  >
  inputProps?: InputProps
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={cn("prose-body-2 text-base-content-medium", props.className)}
    />
  )
}

export function FieldError({ children, className, ...props }: FieldErrorProps) {
  return (
    <AriaFieldError
      {...props}
      className={composeTailwindRenderProps(
        className,
        "prose-body-2 text-utility-feedback-critical flex flex-row flex-wrap items-center gap-2",
      )}
    >
      <>
        <CircleAlert className="h-4 w-4" />
        {children}
      </>
    </AriaFieldError>
  )
}

export function TextField({
  label,
  description,
  errorMessage,
  classNames,
  className,
  inputProps,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(
        className ?? classNames?.base,
        "flex flex-col gap-1",
      )}
    >
      {label && <Label>{label}</Label>}
      <Input className={classNames?.input} {...inputProps} />
      {description && (
        <Description className={classNames?.description}>
          {description}
        </Description>
      )}
      <FieldError className={classNames?.error}>{errorMessage}</FieldError>
    </AriaTextField>
  )
}
