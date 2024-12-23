import { cloneElement, useCallback } from "react"
import {
  composeTailwindRenderProps,
  SlotsToClasses,
  ToggleSlots,
  toggleStyles,
  VariantProps,
} from "@unnamed/theme"
import { mergeProps } from "react-aria"
import {
  Switch as AriaSwitch,
  SwitchProps as AriaSwitchProps,
  SwitchRenderProps,
} from "react-aria-components"

import { mapPropsVariants } from "../system/utils"

export interface ToggleThumbIconProps extends SwitchRenderProps {
  className: string
}

export interface ToggleProps
  extends Omit<AriaSwitchProps, "children">,
    VariantProps<typeof toggleStyles> {
  classNames?: SlotsToClasses<ToggleSlots>
  children?: React.ReactNode
  /**
   * The icon to be displayed inside the thumb.
   */
  thumbIcon?:
    | React.ReactElement
    | ((props: ToggleThumbIconProps) => React.ReactNode)
}

export const Toggle = ({
  children,
  classNames,
  thumbIcon,
  ...originalProps
}: ToggleProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    toggleStyles.variantKeys,
  )

  const slots = toggleStyles(variantProps)

  const clonedThumbIcon = useCallback((renderProps: SwitchRenderProps) => {
    const baseProps: Pick<ToggleThumbIconProps, "className"> = {
      className: slots.thumbIcon({ className: classNames?.thumbIcon }),
    }
    return typeof thumbIcon === "function"
      ? thumbIcon(mergeProps(baseProps, renderProps))
      : thumbIcon && cloneElement(thumbIcon, baseProps)
  }, [])

  return (
    <AriaSwitch
      {...props}
      className={composeTailwindRenderProps(
        props.className ?? classNames?.base,
        slots.base(),
      )}
    >
      {(renderProps) => (
        <>
          <div className={slots.track({ className: classNames?.track })}>
            <span className={slots.thumb({ className: classNames?.thumb })}>
              {thumbIcon && clonedThumbIcon(renderProps)}
            </span>
          </div>
          {children}
        </>
      )}
    </AriaSwitch>
  )
}
