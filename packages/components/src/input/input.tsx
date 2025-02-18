import { forwardRef } from "react"
import {
  composeRenderProps,
  inputStyles,
  VariantProps,
} from "@opengovsg/oui-theme"
import {
  Input as AriaInput,
  InputProps as AriaInputProps,
} from "react-aria-components"

export interface InputProps
  extends VariantProps<typeof inputStyles>,
    Omit<AriaInputProps, "size"> {}

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
