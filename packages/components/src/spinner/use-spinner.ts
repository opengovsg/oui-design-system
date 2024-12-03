import { objectToDeps } from "@unnamed/internal-utils";
import type { HtmlUiProps, PropGetter } from "@unnamed/system-rsc";
import { mapPropsVariants } from "@unnamed/system-rsc";
import {
  clsx,
  spinnerStyles,
  type SlotsToClasses,
  type SpinnerSlots,
  type SpinnerVariantProps,
} from "@unnamed/theme";
import type { Ref } from "react";
import { useMemo, useCallback } from "react";

export interface UseSpinnerProps
  extends Omit<HtmlUiProps, "children">,
    SpinnerVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement | null>;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Spinner classNames={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    circle1: "circle1-classes",
   *    circle2: "circle2-classes",
   *    label: "label-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<SpinnerSlots>;
}

export const useSpinner = (originalProps: UseSpinnerProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    spinnerStyles.variantKeys
  );

  const { className, classNames, ...otherProps } = props;

  const slots = useMemo(
    () => spinnerStyles({ ...variantProps }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- explicit stringify
    [objectToDeps(variantProps)]
  );

  const baseStyles = clsx(classNames?.base, className);

  const ariaLabel = useMemo(() => {
    return !otherProps["aria-label"] ? "Loading" : "";
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only need to check specific prop
  }, [otherProps["aria-label"]]);

  const getSpinnerProps = useCallback<PropGetter>(
    () => ({
      "aria-label": ariaLabel,
      className: slots.base({
        class: baseStyles,
      }),
      ...otherProps,
    }),
    [ariaLabel, slots, baseStyles, otherProps]
  );

  return { slots, classNames, getSpinnerProps };
};

export type UseSpinnerReturn = ReturnType<typeof useSpinner>;
