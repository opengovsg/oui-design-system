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

import { Description, FieldError, Label } from "../field"
import { mapPropsVariants } from "../system/utils"
import {
  RadioGroupVariantContext,
  useRadioGroupVariantContext,
} from "./radio-group-variant-context"

export interface RadioProps
  extends AriaRadioProps,
    VariantProps<typeof radioStyles> {
  classNames?: SlotsToClasses<RadioSlots>
  description?: string
}

export const Radio = ({
  classNames,
  className,
  children,
  description,
  ...originalProps
}: RadioProps) => {
  const [props, variants] = mapPropsVariants(
    originalProps,
    radioStyles.variantKeys,
  )

  const groupContext = useRadioGroupVariantContext()

  const styles = radioStyles({ size: groupContext?.size, ...variants })

  return (
    <AriaRadio
      {...props}
      isDisabled={variants.isDisabled}
      className={composeRenderProps(
        className ?? classNames?.base,
        (className, renderProps) => styles.base({ ...renderProps, className }),
      )}
    >
      {(renderProps) => {
        const content =
          typeof children === "function" ? children(renderProps) : children
        return (
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
            <span className={styles.label({ className: classNames?.label })}>
              {content}
            </span>
            {description && (
              <Description
                size={groupContext?.size}
                className={styles.description({
                  className: classNames?.description,
                })}
              >
                {description}
              </Description>
            )}
          </>
        )
      }}
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
