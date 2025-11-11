"use client"

import type {
  NumberFieldProps as AriaNumberFieldProps,
  ValidationResult,
} from "react-aria-components"
import { Minus, Plus } from "lucide-react"
import { NumberField as AriaNumberField } from "react-aria-components"

import type {
  NumberFieldSlots,
  NumberFieldVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import {
  cn,
  composeTailwindRenderProps,
  dataAttr,
  fieldBorderStyles,
  numberFieldStyles,
} from "@opengovsg/oui-theme"

import type { InputProps } from "../input"
import { Button } from "../button"
import { Description, FieldError, FieldGroup, Label } from "../field"
import { Input } from "../input"
import { mapPropsVariants } from "../system/utils"

export interface NumberFieldProps
  extends AriaNumberFieldProps,
    NumberFieldVariantProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)

  classNames?: SlotsToClasses<NumberFieldSlots>

  inputProps?: Partial<InputProps>

  /**
   * If true, hides the stepper buttons
   */
  hideSteppers?: boolean

  /**
   * Content to be displayed at the start of the input field
   */
  startContent?: React.ReactNode

  /**
   * Content to be displayed at the end of the input field
   */
  endContent?: React.ReactNode
}

export function NumberField(originalProps: NumberFieldProps) {
  const [
    {
      label,
      description,
      errorMessage,
      classNames,
      inputProps,
      startContent,
      endContent,
      hideSteppers,
      ...props
    },
    variantProps,
  ] = mapPropsVariants(originalProps, numberFieldStyles.variantKeys)

  const styles = numberFieldStyles(variantProps)

  return (
    <AriaNumberField
      {...props}
      data-hide-steppers={dataAttr(!!hideSteppers)}
      data-has-start-content={dataAttr(!!startContent)}
      data-has-end-content={dataAttr(!!endContent)}
      className={composeTailwindRenderProps(
        props.className,
        styles.base({
          className: classNames?.base,
        }),
      )}
    >
      {label && (
        <Label
          className={styles.label({ className: classNames?.label })}
          size={variantProps.size}
        >
          {label}
        </Label>
      )}
      <FieldGroup className={styles.field({ className: classNames?.field })}>
        {(renderProps) => (
          <>
            {startContent}
            <Input
              size={variantProps.size}
              variant="unstyled"
              className={styles.input({
                className: classNames?.input,
              })}
              {...inputProps}
            />
            {endContent}
            {!hideSteppers && (
              <div
                className={fieldBorderStyles({
                  ...renderProps,
                  className: cn(
                    styles.stepperContainer({
                      className: classNames?.stepperContainer,
                    }),
                  ),
                })}
              >
                <Button
                  className={styles.decrement({
                    className: classNames?.decrement,
                  })}
                  size={variantProps.size}
                  isIconOnly
                  variant="clear"
                  color="neutral"
                  slot="decrement"
                >
                  <Minus aria-hidden />
                </Button>
                <Button
                  className={styles.increment({
                    className: classNames?.increment,
                  })}
                  size={variantProps.size}
                  isIconOnly
                  variant="clear"
                  color="neutral"
                  slot="increment"
                >
                  <Plus aria-hidden />
                </Button>
              </div>
            )}
          </>
        )}
      </FieldGroup>
      {description && (
        <Description
          className={styles.description({
            className: classNames?.description,
          })}
          size={variantProps.size}
        >
          {description}
        </Description>
      )}
      <FieldError
        className={styles.error({
          className: classNames?.error,
        })}
        size={variantProps.size}
      >
        {errorMessage}
      </FieldError>
    </AriaNumberField>
  )
}
