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
      if (spinnerProp) {
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
            {isPending && spinnerPlacement === "start"
              ? renderChildren(renderProps, spinner)
              : null}
            {isPending ? null : renderChildren(renderProps, children)}
            {isPending && loadingText ? loadingText : null}
            {isPending && pendingElement
              ? renderChildren(renderProps, pendingElement)
              : null}
            {isPending && spinnerPlacement === "end"
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
