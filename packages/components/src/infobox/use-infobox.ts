import type {
  InfoboxSlots,
  InfoboxVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { infoboxStyles } from "@opengovsg/oui-theme"
import { useMemo } from "react"
import { useDeepCompareMemo } from "use-deep-compare"

import type { HtmlUiProps } from "../system/types"
import { mapPropsVariants } from "../system/utils"

export interface UseInfoboxProps extends HtmlUiProps, InfoboxVariantProps {
  /**
   * Icon to show on the left of the infobox.
   * If not specified, a default icon will be used according to the infobox variant.
   * Pass `null` to explicitly hide the icon.
   */
  icon?: React.ReactNode | null
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Infobox classNames={{
   *    base: "base-classes",
   *    icon: "icon-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<InfoboxSlots>
}

export function useInfobox(originalProps: UseInfoboxProps) {
  const [_props, variantProps] = mapPropsVariants(
    originalProps,
    infoboxStyles.variantKeys,
  )

  const { children, as, classNames, icon } = _props

  const Component = useMemo(() => as || "div", [as])

  const slots = useDeepCompareMemo(
    () => ({
      ...infoboxStyles({ ...variantProps }),
    }),
    [variantProps, infoboxStyles],
  )

  return {
    Component,
    children,
    slots,
    classNames,
    icon,
    variant: variantProps.variant,
  }
}
