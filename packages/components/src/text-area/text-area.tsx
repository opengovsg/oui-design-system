"use client"

import type { VariantProps } from "@opengovsg/oui-theme"
import { composeRenderProps, textAreaStyles } from "@opengovsg/oui-theme"
import { forwardRef } from "react"
import type { TextAreaProps as AriaTextAreaProps } from "react-aria-components"
import { TextArea as AriaTextArea } from "react-aria-components"

export interface TextAreaProps
  extends
    VariantProps<typeof textAreaStyles>,
    Omit<AriaTextAreaProps, "size"> {}

/**
 * This component should not be used by itself. Use the `TextField` component from `@opengovsg/oui/text-field` instead.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ size, variant, isDisabled, ...props }, ref) => {
    return (
      <AriaTextArea
        {...props}
        disabled={isDisabled}
        className={composeRenderProps(
          props.className,
          (className, renderProps) =>
            textAreaStyles({ ...renderProps, className, size, variant }),
        )}
        ref={ref}
      />
    )
  },
)
TextArea.displayName = "TextArea"
