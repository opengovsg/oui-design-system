"use client";

import { forwardRef } from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import {
  Button as AriaButton,
  composeRenderProps,
} from "react-aria-components";

import { chain } from "@react-aria/utils";

import { buttonStyles, VariantProps } from "@unnamed/theme";
import { Ripple, useRipple } from "../ripple";

export interface ButtonProps
  extends Omit<AriaButtonProps, "children">,
    VariantProps<typeof buttonStyles> {
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
      size,
      onPress,
      children,
      disableRipple,
      ...props
    },
    ref
  ) => {
    const {
      onPress: onPressRipple,
      onClear: onClearRipple,
      ripples,
    } = useRipple();

    return (
      <AriaButton
        {...props}
        ref={ref}
        onPress={chain(onPress, onPressRipple)}
        className={composeRenderProps(className, (className, renderProps) =>
          buttonStyles({
            ...renderProps,
            variant,
            size,
            className,
            colorScheme,
          })
        )}
      >
        {startContent}
        {children}
        {endContent}
        {!disableRipple && <Ripple ripples={ripples} onClear={onClearRipple} />}
      </AriaButton>
    );
  }
);

Button.displayName = "Button";
