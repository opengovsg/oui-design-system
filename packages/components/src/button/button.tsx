"use client"

import type {
  ButtonProps as AriaButtonProps,
  RenderProps,
} from "react-aria-components"
import { forwardRef, useMemo } from "react"
import { chain } from "@react-aria/utils"
import { Button as AriaButton, composeRenderProps } from "react-aria-components"

import type { ButtonVariantProps } from "@opengovsg/oui-theme"
import { buttonStyles } from "@opengovsg/oui-theme"

import type { SpinnerProps } from "../spinner"
import { Ripple, useRipple } from "../ripple"
import { Spinner } from "../spinner"
import { renderChildren } from "../system/react-utils/children"

export interface ButtonProps extends AriaButtonProps, ButtonVariantProps {
  /**
   * Whether the button should display a ripple effect on press.
   * @defaultValue false
   */
  disableRipple?: boolean
  /**
   * The button start content.
   */
  startContent?: RenderProps<ButtonProps>["children"]
  /**
   * The button end content.
   */
  endContent?: RenderProps<ButtonProps>["children"]
  /**
   * Spinner to display when loading.
   * @defaultValue \@opengovsg/oui/components/spinner
   */
  spinner?: RenderProps<ButtonProps>["children"]

  /**
   * Text to show when the button is loading.
   * If not provided, the button will only show the loading spinner.
   *
   * @deprecated Use `pendingElement` instead.
   */
  loadingText?: string

  /**
   * Text to show when the button is loading.
   * If not provided, the button will only show the loading spinner.
   */
  pendingElement?: RenderProps<ButtonProps>["children"]

  /**
   * The spinner placement.
   * @defaultValue "start"
   */
  spinnerPlacement?: "start" | "end"

  /**
   * Whether the button only contains an icon.
   * If true, you must provide an `aria-label` for accessibility.
   */
  isIconOnly?: boolean

  /**
   * Whether to preserve the button's width while pending to prevent layout
   * shift. When enabled, the children are kept in the layout (hidden via
   * `opacity-0` and `aria-hidden`) and the spinner is overlaid on top.
   *
   * Only applies when no `loadingText` or `pendingElement` is provided, since
   * those replace the children with content of a different width.
   * @defaultValue true
   */
  preserveWidth?: boolean
}

/**
 * You probably do not want to use this component if you are rendering a link.
 * Use `LinkButton` component instead.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      startContent,
      endContent,
      className: classNameProp,
      variant,
      color,
      layout,
      radius,
      size = "md",
      spinnerPlacement = "start",
      loadingText,
      pendingElement,
      onPress,
      children,
      disableRipple,
      isPending,
      spinner: spinnerProp,
      isIconOnly,
      isAttached,
      preserveWidth = true,
      ...props
    },
    ref,
  ) => {
    const {
      onPress: onPressRipple,
      onClear: onClearRipple,
      ripples,
    } = useRipple()

    const spinner = useMemo(() => {
      if (spinnerProp !== undefined) {
        return spinnerProp
      }
      const buttonSpinnerSizeMap: Record<string, SpinnerProps["size"]> = {
        xs: "xs",
        sm: "sm",
        md: "sm",
        lg: "md",
      }

      const spinnerSize = buttonSpinnerSizeMap[size]
      return <Spinner size={spinnerSize} />
    }, [size, spinnerProp])

    // Keep the children in the layout (hidden) and overlay the spinner so the
    // button width doesn't collapse while pending. Only when no replacement
    // content (loadingText/pendingElement) is supplied.
    const shouldPreserveWidth =
      isPending && preserveWidth && !loadingText && !pendingElement

    return (
      <AriaButton
        {...props}
        className={composeRenderProps(classNameProp, (className, renderProps) =>
          buttonStyles({
            ...renderProps,
            variant,
            size,
            className,
            layout,
            color,
            radius,
            isIconOnly,
            isAttached,
          }),
        )}
        isPending={isPending}
        onPress={chain(onPress, onPressRipple)}
        ref={ref}
      >
        {(renderProps) => (
          <>
            {renderChildren(renderProps, startContent)}
            {isPending && !shouldPreserveWidth && spinnerPlacement === "start"
              ? renderChildren(renderProps, spinner)
              : null}
            {!isPending ? (
              renderChildren(renderProps, children)
            ) : shouldPreserveWidth ? (
              <span className="relative inline-flex items-center justify-center">
                <span aria-hidden className="opacity-0">
                  {renderChildren(renderProps, children)}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  {renderChildren(renderProps, spinner)}
                </span>
              </span>
            ) : null}
            {isPending && loadingText ? loadingText : null}
            {isPending && pendingElement
              ? renderChildren(renderProps, pendingElement)
              : null}
            {isPending && !shouldPreserveWidth && spinnerPlacement === "end"
              ? renderChildren(renderProps, spinner)
              : null}
            {renderChildren(renderProps, endContent)}
            {!disableRipple && (
              <Ripple onClear={onClearRipple} ripples={ripples} />
            )}
          </>
        )}
      </AriaButton>
    )
  },
)

Button.displayName = "Button"
