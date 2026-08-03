import type {
  AvatarGroupSlots,
  AvatarGroupVariantProps,
  AvatarVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { avatarGroupStyles, cn } from "@opengovsg/oui-theme"
import type { ReactNode } from "react"
import { cloneElement, useMemo } from "react"

import type { ReactRef } from "../system/react-utils"
import { createContext, useDomRef } from "../system/react-utils"
import { getValidChildren } from "../system/react-utils/children"
import type { HtmlUiProps, PropGetter } from "../system/types"
import type { AvatarProps } from "./index"

export type UseAvatarGroupContextReturn = {
  size?: UseAvatarGroupProps["size"]
  color?: UseAvatarGroupProps["color"]
  radius?: UseAvatarGroupProps["radius"]
  prominence?: UseAvatarGroupProps["prominence"]
}

export const [AvatarGroupProvider, useAvatarGroupContext] = createContext<
  UseAvatarGroupContextReturn,
  false
>({
  name: "AvatarGroupContext",
  strict: false,
})

export interface UseAvatarGroupProps
  extends
    HtmlUiProps<"div">,
    AvatarGroupVariantProps,
    Pick<AvatarVariantProps, "size" | "color" | "prominence" | "radius"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>
  /**
   * The maximum number of visible avatars
   * @default 5
   */
  max?: number
  /**
   * Control the number of avatar not visible
   */
  total?: number
  /**
   * This allows you to render a custom count component.
   */
  renderCount?: (count: number) => ReactNode

  /**
   * Props to be passed to the count component.
   */
  countProps?: Partial<AvatarProps>

  /**
   * Classname or List of classes to change the classNames of the avatar group.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <AvatarGroup classNames={{
   *    base: "base-classes",
   *    count: "count-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<AvatarGroupSlots>
}

export function useAvatarGroup(props: UseAvatarGroupProps = {}) {
  const {
    as,
    ref,
    max = 5,
    total,
    size,
    color,
    prominence,
    radius,
    children,
    renderCount,
    className,
    classNames,
    countProps,
    ...otherProps
  } = props

  const domRef = useDomRef(ref)

  const Component = as || "div"

  const context = useMemo<UseAvatarGroupContextReturn>(
    () => ({
      size,
      color,
      radius,
      prominence,
    }),
    [size, color, radius, prominence],
  )
  const slots = useMemo(
    () => avatarGroupStyles({ className: className ?? classNames?.base }),
    [className, classNames?.base],
  )

  const validChildren = getValidChildren(children)
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren

  const remainingCount = total
    ? total
    : max != null
      ? validChildren.length - max
      : -1

  const clones = childrenWithinMax.map((child, index) => {
    return cloneElement(child, {
      // @ts-expect-error: CSS variable is not recognized as a valid style property
      style: {
        "--avatar-zindex": childrenWithinMax.length - index,
      },
    })
  })

  const getAvatarGroupProps: PropGetter = () => {
    return {
      ref: domRef,
      className: slots.base({
        class: cn(classNames?.base, className),
      }),
      role: "group",
      ...otherProps,
    }
  }

  const getAvatarGroupCountProps = () => {
    return {
      className: slots.counter({
        class: classNames?.counter,
      }),
      ...countProps,
    } satisfies Partial<AvatarProps>
  }

  return {
    Component,
    context,
    remainingCount,
    clones,
    renderCount,
    getAvatarGroupProps,
    getAvatarGroupCountProps,
  }
}

export type UseAvatarReturn = ReturnType<typeof useAvatarGroup>
