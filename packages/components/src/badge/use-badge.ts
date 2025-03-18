import type { PressEvent } from "@react-types/shared"
import type { ReactNode } from "react"
import type { LocalizedStrings } from "react-aria"
import { cloneElement, isValidElement, useCallback, useMemo } from "react"
import { mergeProps } from "@react-aria/utils"
import { useFocusRing, useMessageFormatter, usePress } from "react-aria"
import { useDeepCompareMemo } from "use-deep-compare"

import type {
  BadgeSlots,
  BadgeVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { badgeCloseButtonStyles, badgeStyles, cn } from "@opengovsg/oui-theme"

import type { ReactRef } from "../system/react-utils"
import type { HtmlUiProps, PropGetter } from "../system/types"
import { useDomRef } from "../system/react-utils"
import { mapPropsVariants } from "../system/utils"

export interface UseBadgeProps extends HtmlUiProps, BadgeVariantProps {
  ref?: ReactRef<HTMLDivElement | null>
  /**
   * Element to be rendered in the left side of the badge.
   */
  startContent?: React.ReactNode
  /**
   * Element to be rendered in the right side of the badge.
   * if you pass this prop and the `onClose` prop, the passed element
   * will have the close button props and it will be rendered instead of the
   * default close button.
   */
  endContent?: React.ReactNode

  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Badge classNames={{
   *    base:"base-classes",
   *    dot: "dot-classes",
   *    content: "content-classes",
   *    closeButton: "close-button-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<BadgeSlots | "closeButton">
  /**
   * Callback fired when the badge is closed. if you pass this prop,
   * the badge will display a close button in the `endContent` slot.
   * @param e PressEvent
   */
  onClose?: (e: PressEvent) => void
}

const i18nStrings: LocalizedStrings = {
  "en-SG": {
    close: "Close badge",
  },
  "zh-SG": {
    close: "关闭徽章",
  },
  "ms-SG": {
    close: "Tutup lencana",
  },
  "ta-SG": {
    close: "பேட்ஜை மூடு",
  },
}

export function useBadge(originalProps: UseBadgeProps) {
  const [_props, variantProps] = mapPropsVariants(
    originalProps,
    badgeStyles.variantKeys,
  )
  const {
    ref,
    as,
    children,
    startContent,
    endContent,
    onClose,
    classNames,
    className,
    ...props
  } = _props

  const domRef = useDomRef(ref)

  const Component = useMemo(() => as || "div", [as])
  const baseClassName = cn(classNames?.base, className)

  const formatMessage = useMessageFormatter(i18nStrings)

  const isCloseable = !!onClose

  const {
    focusProps: closeFocusProps,
    isFocusVisible: isCloseButtonFocusVisible,
  } = useFocusRing()

  const slots = useDeepCompareMemo(
    () => ({
      ...badgeStyles({ isCloseable, ...variantProps }),
      closeButton: badgeCloseButtonStyles,
    }),
    [variantProps, isCloseable, badgeStyles, badgeCloseButtonStyles],
  )

  const { pressProps: closePressProps } = usePress({
    isDisabled: !!variantProps?.isDisabled,
    onPress: onClose,
  })

  const getContentClone = useCallback(
    (content: ReactNode) =>
      isValidElement(content)
        ? cloneElement(content, {
            // @ts-expect-error types are not full
            className: cn("max-h-[80%]", content.props?.className),
          })
        : null,
    [],
  )

  const getChipProps: PropGetter = useCallback(() => {
    return {
      ref: domRef,
      className: slots.base({ className: baseClassName }),
      ...props,
    }
  }, [baseClassName, domRef, props, slots])

  const getCloseButtonProps: PropGetter = useCallback(() => {
    return {
      role: "button",
      tabIndex: 0,
      className: slots.closeButton({
        className: classNames?.closeButton,
        isFocusVisible: isCloseButtonFocusVisible,
      }),
      "aria-label": formatMessage("close"),
      ...mergeProps(closePressProps, closeFocusProps),
    }
  }, [
    classNames?.closeButton,
    closeFocusProps,
    closePressProps,
    formatMessage,
    isCloseButtonFocusVisible,
    slots,
  ])

  return {
    Component,
    children,
    slots,
    classNames,
    isCloseable,
    startContent: getContentClone(startContent),
    endContent: getContentClone(endContent),
    getCloseButtonProps,
    getChipProps,
  }
}
