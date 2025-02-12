import type { VariantProps } from "@oui/theme"
import type { ButtonProps as AriaButtonProps } from "react-aria-components"
import { forwardRef, useMemo } from "react"
import { chain } from "@react-aria/utils"
import { buttonStyles } from "@oui/theme"
import { Button as AriaButton, composeRenderProps } from "react-aria-components"

import type { SpinnerProps } from "../spinner"
import { Ripple, useRipple } from "../ripple"
import { Spinner } from "../spinner"

interface _ButtonProps
  extends Omit<AriaButtonProps, "children">,
    VariantProps<typeof buttonStyles> {
  /**
   * Whether the button should display a ripple effect on press.
   * @defaultValue false
   */
  disableRipple?: boolean
  children: React.ReactNode
  /**
   * The button start content.
   */
  startContent?: React.ReactNode
  /**
   * The button end content.
   */
  endContent?: React.ReactNode
  /**
   * Spinner to display when loading.
   * @defaultValue \@oui/components/spinner
   */
  spinner?: React.ReactNode

  /**
   * Text to show when the button is loading.
   * If not provided, the button will only show the loading spinner.
   */
  loadingText?: string

  /**
   * The spinner placement.
   * @defaultValue "start"
   */
  spinnerPlacement?: "start" | "end"
}

export type ButtonProps = Omit<_ButtonProps, "aria-label"> &
  (
    | { isIconOnly: true; "aria-label": string }
    | { isIconOnly?: false; "aria-label"?: string }
  )

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
      onPress,
      children,
      disableRipple,
      isPending,
      spinner: spinnerProp,
      isIconOnly,
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
          }),
        )}
        isPending={isPending}
        onPress={chain(onPress, onPressRipple)}
        ref={ref}
      >
        {startContent}
        {isPending && spinnerPlacement === "start" ? spinner : null}
        {isPending ? null : children}
        {isPending && loadingText ? loadingText : null}
        {isPending && spinnerPlacement === "end" ? spinner : null}
        {endContent}
        {!disableRipple && <Ripple onClear={onClearRipple} ripples={ripples} />}
      </AriaButton>
    )
  },
)

Button.displayName = "Button"
