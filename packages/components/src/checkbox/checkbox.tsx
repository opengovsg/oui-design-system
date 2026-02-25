"use client"

import type {
  CheckboxGroupProps as AriaCheckboxGroupProps,
  CheckboxProps as AriaCheckboxProps,
  CheckboxRenderProps,
  ValidationResult,
} from "react-aria-components"
import { Check, Minus } from "lucide-react"
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  composeRenderProps,
  Provider,
} from "react-aria-components"

import type {
  CheckboxSlots,
  FieldErrorSlots,
  SlotsToClasses,
  SlotsToClassesWithRenderProps,
  VariantProps,
} from "@opengovsg/oui-theme"
import { checkboxGroupStyles, checkboxStyles } from "@opengovsg/oui-theme"

import { Description, FieldError, Label } from "../field"
import { renderChildren } from "../system/react-utils/children"
import { mapPropsVariants } from "../system/utils"
import {
  CheckboxGroupStyleContext,
  useCheckboxGroupStyleContext,
} from "./checkbox-group-style-context"

export interface CheckboxProps
  extends AriaCheckboxProps,
    VariantProps<typeof checkboxStyles> {
  classNames?: SlotsToClassesWithRenderProps<CheckboxSlots, CheckboxRenderProps>
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
  const context = useCheckboxGroupStyleContext()
  const styles = checkboxStyles({ size: context?.size, ...variants })
  return (
    <AriaCheckbox
      {...props}
      isDisabled={variants.isDisabled}
      isInvalid={variants.isInvalid}
      isSelected={variants.isSelected}
      className={composeRenderProps(
        className ?? classNames?.base,
        (className, renderProps) => styles.base({ ...renderProps, className }),
      )}
    >
      {(renderProps) => {
        const { isSelected, isIndeterminate, ...restRenderProps } = renderProps
        return (
          <>
            <div
              className={styles.box({
                isSelected: isSelected || isIndeterminate,
                ...restRenderProps,
                className: renderChildren(renderProps, classNames?.box),
              })}
            >
              {isIndeterminate ? (
                <Minus
                  aria-hidden
                  className={styles.icon({
                    className: renderChildren(renderProps, classNames?.icon),
                  })}
                />
              ) : isSelected ? (
                <Check
                  aria-hidden
                  className={styles.icon({
                    className: renderChildren(renderProps, classNames?.icon),
                  })}
                />
              ) : null}
            </div>
            {props.children}
          </>
        )
      }}
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
  size?: CheckboxProps["size"]
}

export function CheckboxGroup({
  description,
  errorMessage,
  classNames,
  size,
  ...props
}: CheckboxGroupProps) {
  const context = {
    size,
  }

  return (
    <Provider values={[[CheckboxGroupStyleContext, context]]}>
      <AriaCheckboxGroup
        {...props}
        className={composeRenderProps(
          props.className ?? classNames?.base,
          (className, renderProps) =>
            checkboxGroupStyles({ ...renderProps, size, className }),
        )}
      >
        <Label size={size} className={classNames?.label}>
          {props.label}
        </Label>
        {props.children}
        {description && (
          <Description size={size} className={classNames?.description}>
            {description}
          </Description>
        )}
        <FieldError size={size} classNames={classNames?.error}>
          {errorMessage}
        </FieldError>
      </AriaCheckboxGroup>
    </Provider>
  )
}
