"use client"

import type { InputProps as AriaInputProps } from "react-aria-components"
import { forwardRef } from "react"
import { Input as AriaInput } from "react-aria-components"

import type { VariantProps } from "@opengovsg/oui-theme"
import { composeRenderProps, inputStyles } from "@opengovsg/oui-theme"

export interface InputProps
  extends VariantProps<typeof inputStyles>,
    Omit<AriaInputProps, "size"> {
  ref: React.Ref<HTMLInputElement>
}

/**
 * This component should not be used by itself. Use the `TextField` component from `@opengovsg/oui/text-field` instead.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size, variant, isDisabled, ...props }, ref) => {
    return (
      <AriaInput
        {...props}
        disabled={isDisabled}
        className={composeRenderProps(
          props.className,
          (className, renderProps) =>
            inputStyles({ ...renderProps, className, size, variant }),
        )}
        ref={ref}
      />
    )
  },
)
Input.displayName = "Input"
