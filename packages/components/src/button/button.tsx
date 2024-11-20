"use client";

import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { forwardRef } from "react";
import {
  Button as AriaButton,
  composeRenderProps,
} from "react-aria-components";

import { button, VariantProps } from "@unnamed/theme";

export interface ButtonProps
  extends AriaButtonProps,
    VariantProps<typeof button> {}

/**
 * You probaby do not want to use this component if you are rendering a link.
 * Use `LinkButton` component instead.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, colorScheme, size, ...props }, ref) => {
    return (
      <AriaButton
        {...props}
        ref={ref}
        className={composeRenderProps(className, (className, renderProps) =>
          button({
            ...renderProps,
            variant,
            size,
            className,
            colorScheme,
          })
        )}
      />
    );
  }
);
Button.displayName = "Button";
