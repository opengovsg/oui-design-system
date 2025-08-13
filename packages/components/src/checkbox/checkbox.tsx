"use client"

import type {
  CheckboxGroupProps as AriaCheckboxGroupProps,
  CheckboxProps as AriaCheckboxProps,
  ValidationResult,
} from "react-aria-components"
import { Check, Minus } from "lucide-react"
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  composeRenderProps,
} from "react-aria-components"

import type {
  CheckboxSlots,
  FieldErrorSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import { checkboxGroupStyles, checkboxStyles } from "@opengovsg/oui-theme"

import { Description, FieldError, Label } from "../field"
import { mapPropsVariants } from "../system/utils"

interface CheckboxProps
  extends AriaCheckboxProps,
    VariantProps<typeof checkboxStyles> {
  classNames?: SlotsToClasses<CheckboxSlots>
}

export const Checkbox = ({
  classNames,
  className,
  ...originalProps
}: CheckboxProps) => {
  const [props, variants] = mapPropsVariants(
    originalProps,
    checkboxStyles.variantKeys,
  )
  const styles = checkboxStyles(variants)
  return (
    <AriaCheckbox
      {...props}
      isDisabled={variants.isDisabled}
      isInvalid={variants.isInvalid}
      isSelected={variants.isSelected}
      className={composeRenderProps(
        className ?? classNames?.input,
        (className, renderProps) => styles.input({ ...renderProps, className }),
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <>
          <div
            className={styles.box({
              isSelected: isSelected || isIndeterminate,
              ...renderProps,
              className: classNames?.box,
            })}
          >
            {isIndeterminate ? (
              <Minus
                aria-hidden
                className={styles.icon({ className: classNames?.icon })}
              />
            ) : isSelected ? (
              <Check
                aria-hidden
                className={styles.icon({ className: classNames?.icon })}
              />
            ) : null}
          </div>
          {props.children}
        </>
      )}
    </AriaCheckbox>
  )
}
export interface CheckboxGroupProps
  extends Omit<AriaCheckboxGroupProps, "children"> {
  label?: string
  children?: React.ReactNode
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  classNames?: SlotsToClasses<"label" | "base" | "description"> & {
    error?: SlotsToClasses<FieldErrorSlots>
  }
}

export function CheckboxGroup({
  description,
  errorMessage,
  classNames,
  ...props
}: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      className={composeRenderProps(
        props.className ?? classNames?.base,
        (className, renderProps) =>
          checkboxGroupStyles({ ...renderProps, className }),
      )}
    >
      <Label className={classNames?.label}>{props.label}</Label>
      {props.children}
      {description && (
        <Description className={classNames?.description}>
          {description}
        </Description>
      )}
      <FieldError classNames={classNames?.error}>{errorMessage}</FieldError>
    </AriaCheckboxGroup>
  )
}
