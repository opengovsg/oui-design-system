import { forwardRef, useMemo } from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import {
  Button as AriaButton,
  composeRenderProps,
} from "react-aria-components";
import { chain } from "@react-aria/utils";
import { buttonStyles } from "@unnamed/theme";
import type { VariantProps } from "@unnamed/theme";
import { Ripple, useRipple } from "../ripple";
import type { SpinnerProps } from "../spinner";
import { Spinner } from "../spinner";

export interface ButtonProps
  extends Omit<AriaButtonProps, "children">,
    VariantProps<typeof buttonStyles> {
  /**
   * Whether the button should display a ripple effect on press.
   * @defaultValue false
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
   * @defaultValue \@unnamed/components/spinner
   */
  spinner?: React.ReactNode;

  /**
   * The spinner placement.
   * @defaultValue "start"
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
      className: classNameProp,
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
    }, [size, spinnerProp]);

    return (
      <AriaButton
        {...props}
        className={composeRenderProps(classNameProp, (className, renderProps) =>
          buttonStyles({
            ...renderProps,
            variant,
            size,
            className,
            colorScheme,
            radius,
          })
        )}
        isPending={isPending}
        onPress={chain(onPress, onPressRipple)}
        ref={ref}
      >
        {startContent}
        {isPending && spinnerPlacement === "start" ? spinner : null}
        {isPending && isIconOnly ? null : children}
        {isPending && spinnerPlacement === "end" ? spinner : null}
        {endContent}
        {!disableRipple && <Ripple onClear={onClearRipple} ripples={ripples} />}
      </AriaButton>
    );
  }
);

Button.displayName = "Button";
