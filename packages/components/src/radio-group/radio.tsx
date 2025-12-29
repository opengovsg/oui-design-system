"use client"

import type {
  RadioGroupProps as AriaRadioGroupProps,
  // RadioGroupProps as AriaRadioGroupProps,
  RadioProps as AriaRadioProps,
  ValidationResult,
} from "react-aria-components"
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  composeRenderProps,
  Provider,
} from "react-aria-components"

import type {
  FieldErrorSlots,
  RadioGroupVariantProps,
  RadioSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import { radioGroupStyles, radioStyles } from "@opengovsg/oui-theme"

import { FieldError, Label } from "../field"
import { mapPropsVariants } from "../system/utils"
import {
  RadioGroupVariantContext,
  useRadioGroupVariantContext,
} from "./radio-group-variant-context"

export interface RadioProps
  extends AriaRadioProps,
    VariantProps<typeof radioStyles> {
  classNames?: SlotsToClasses<RadioSlots>
}

export const Radio = ({
  classNames,
  className,
  children,
  ...originalProps
}: RadioProps) => {
  const [props, variants] = mapPropsVariants(
    originalProps,
    radioStyles.variantKeys,
  )

  const { size } = useRadioGroupVariantContext()

  const styles = radioStyles({ size, ...variants })

  return (
    <AriaRadio
      {...props}
      isDisabled={variants.isDisabled}
      className={composeRenderProps(
        className ?? classNames?.base,
        (className, renderProps) => styles.base({ ...renderProps, className }),
      )}
    >
      {(renderProps) => (
        <>
          <span
            className={styles.circle({
              ...renderProps,
              className: classNames?.circle,
            })}
          >
            <span
              className={styles.icon({
                ...renderProps,
                className: classNames?.icon,
              })}
            />
          </span>
          {children}
        </>
      )}
    </AriaRadio>
  )
}

export interface RadioGroupProps
  extends Omit<AriaRadioGroupProps, "children">,
    RadioGroupVariantProps {
  /**
   * Label for the radio group
   */
  label?: string

  /**
   * Radio components
   */
  children?: React.ReactNode

  /**
   * Error message - can be string or function for validation
   */
  errorMessage?: string | ((validation: ValidationResult) => string)

  /**
   * Optional classNames for different parts of the group
   */
  classNames?: SlotsToClasses<"label" | "base" | "description"> & {
    error?: SlotsToClasses<FieldErrorSlots>
  }

  /**
   * Size of all Radio children
   * Will be propagated via context
   */
  size?: RadioProps["size"]
}

export const RadioGroup = ({
  label,
  errorMessage,
  classNames,
  size,
  ...props
}: RadioGroupProps) => {
  const context = { size }

  return (
    <Provider values={[[RadioGroupVariantContext, context]]}>
      <AriaRadioGroup
        {...props}
        className={composeRenderProps(
          props.className ?? classNames?.base,
          (className, renderProps) =>
            radioGroupStyles({ ...renderProps, size, className }),
        )}
      >
        {label && (
          <Label size={size} className={classNames?.label}>
            {label}
          </Label>
        )}

        {props.children}

        <FieldError size={size} className={classNames?.error?.text}>
          {errorMessage}
        </FieldError>
      </AriaRadioGroup>
    </Provider>
  )
}
