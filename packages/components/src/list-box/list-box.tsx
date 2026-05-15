"use client"

import type { ForwardedRef } from "react"
import type { ListBoxItemProps as AriaListBoxItemProps } from "react-aria-components"
import { useMemo } from "react"
import {
  composeRenderProps,
  ListBoxItem as AriaListBoxItem,
  Text,
} from "react-aria-components"

import type {
  ListBoxItemSlots,
  ListBoxItemVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { listBoxItemStyles } from "@opengovsg/oui-theme"

import { forwardRef, mapPropsVariants } from "../system/utils"

export interface ListBoxItemProps
  extends AriaListBoxItemProps,
    ListBoxItemVariantProps {
  /**
   * Description for the item, if any
   */
  description?: React.ReactNode
  classNames?: SlotsToClasses<ListBoxItemSlots>
}

export const ListBoxItem = forwardRef(function ListBoxItem(
  originalProps: ListBoxItemProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: ForwardedRef<any>,
) {
  const [
    { className, description, children, classNames, ...props },
    variantProps,
  ] = mapPropsVariants(originalProps, listBoxItemStyles.variantKeys)

  const styles = listBoxItemStyles(variantProps)

  const defaultTextValue = useMemo(() => {
    if (props.textValue) {
      return props.textValue
    }
    if (typeof children === "string") {
      return children
    }
    return undefined
  }, [children, props.textValue])

  return (
    <AriaListBoxItem
      ref={ref}
      textValue={defaultTextValue}
      {...props}
      className={composeRenderProps(
        className ?? classNames?.container,
        (className, renderProps) =>
          styles.container({ ...renderProps, className }),
      )}
    >
      {(renderProps) => {
        if (typeof children === "function") {
          return children(renderProps)
        }
        return (
          <>
            <Text
              className={styles.label({ className: classNames?.label })}
              slot="label"
            >
              {children}
            </Text>
            {description && (
              <Text
                className={styles.description({
                  className: classNames?.description,
                })}
                slot="description"
              >
                {description}
              </Text>
            )}
          </>
        )
      }}
    </AriaListBoxItem>
  )
})
