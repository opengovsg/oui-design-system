import type {
  SlotsToClasses,
  SpinnerSlots,
  SpinnerVariantProps,
} from "@opengovsg/oui-theme"
import type { Ref } from "react"
import { useCallback, useMemo } from "react"
import { cn, spinnerStyles } from "@opengovsg/oui-theme"
import { useDeepCompareMemo } from "use-deep-compare"

import type { HtmlUiProps, PropGetter } from "../system/types"
import { mapPropsVariants } from "../system/utils"

export interface UseSpinnerProps
  extends Omit<HtmlUiProps, "children">,
    SpinnerVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement | null>
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
  classNames?: SlotsToClasses<SpinnerSlots>
}

export const useSpinner = (originalProps: UseSpinnerProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    spinnerStyles.variantKeys,
  )

  const { className, classNames, ...otherProps } = props

  const slots = useDeepCompareMemo(
    () => spinnerStyles({ ...variantProps }),
    [variantProps],
  )

  const baseStyles = cn(classNames?.base, className)

  const ariaLabel = useMemo(() => {
    return !otherProps["aria-label"] ? "Loading" : ""
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only need to check specific prop
  }, [otherProps["aria-label"]])

  const getSpinnerProps = useCallback<PropGetter>(
    () => ({
      "aria-label": ariaLabel,
      role: "progressbar",
      className: slots.base({
        class: baseStyles,
      }),
      ...otherProps,
    }),
    [ariaLabel, slots, baseStyles, otherProps],
  )

  return { slots, classNames, getSpinnerProps }
}

export type UseSpinnerReturn = ReturnType<typeof useSpinner>
