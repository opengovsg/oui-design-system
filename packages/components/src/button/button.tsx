"use client";

import { forwardRef, useMemo } from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import {
  Button as AriaButton,
  composeRenderProps,
} from "react-aria-components";

import { chain } from "@react-aria/utils";

import { buttonStyles, VariantProps } from "@unnamed/theme";
import { Ripple, useRipple } from "../ripple";
import { Spinner, SpinnerProps } from "../spinner";

export interface ButtonProps
  extends Omit<AriaButtonProps, "children">,
    VariantProps<typeof buttonStyles> {
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
  children: React.ReactNode;
  /**
   * The button start content.
   */
  startContent?: React.ReactNode;
  /**
   * The button end content.
   */
  endContent?: React.ReactNode;
  /**
   * Spinner to display when loading.
   * @default @unnamed/components/spinner
   */
  spinner?: React.ReactNode;

  /**
   * The spinner placement.
   * @default "start"
   */
  spinnerPlacement?: "start" | "end";

  /**
   * Display a button without text and show the icon passed to the `children` prop.
   */
  isIconOnly?: boolean;
}

/**
 * You probaby do not want to use this component if you are rendering a link.
 * Use `LinkButton` component instead.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      startContent,
      endContent,
      className,
      variant,
      colorScheme,
      radius,
      size = "md",
      spinnerPlacement = "start",
      onPress,
      children,
      disableRipple,
      isPending,
      spinner: spinnerProp,
      isIconOnly,
      ...props
    },
    ref
  ) => {
    const {
      onPress: onPressRipple,
      onClear: onClearRipple,
      ripples,
    } = useRipple();

    const spinner = useMemo(() => {
      if (spinnerProp) {
        return spinnerProp;
      }
      const buttonSpinnerSizeMap: Record<string, SpinnerProps["size"]> = {
        sm: "sm",
        md: "sm",
        lg: "md",
      };

      const spinnerSize = buttonSpinnerSizeMap[size];
      return <Spinner size={spinnerSize} />;
    }, []);

    return (
      <AriaButton
        {...props}
        isPending={isPending}
        ref={ref}
        onPress={chain(onPress, onPressRipple)}
        className={composeRenderProps(className, (className, renderProps) =>
          buttonStyles({
            ...renderProps,
            variant,
            size,
            className,
            colorScheme,
            radius,
          })
        )}
      >
        {startContent}
        {isPending && spinnerPlacement === "start" && spinner}
        {isPending && isIconOnly ? null : children}
        {isPending && spinnerPlacement === "end" && spinner}
        {endContent}
        {!disableRipple && <Ripple ripples={ripples} onClear={onClearRipple} />}
      </AriaButton>
    );
  }
);

Button.displayName = "Button";
