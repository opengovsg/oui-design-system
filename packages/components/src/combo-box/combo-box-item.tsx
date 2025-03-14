"use client"

import type { ForwardedRef } from "react"
import type { ListBoxItemProps } from "react-aria-components"
import { useMemo } from "react"
import {
  composeRenderProps,
  ListBoxItem,
  Text,
  useContextProps,
} from "react-aria-components"

import type {
  ComboBoxItemSlots,
  ComboBoxItemVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { comboBoxItemStyles } from "@opengovsg/oui-theme"

import { forwardRef, mapPropsVariants } from "../system/utils"
import { ComboBoxVariantContext } from "./combo-box-variant-context"

export interface ComboBoxItemProps
  extends ListBoxItemProps,
    ComboBoxItemVariantProps {
  /**
   * Description for the item, if any
   */
  description?: React.ReactNode
  classNames?: SlotsToClasses<ComboBoxItemSlots>
}

export const ComboBoxItem = forwardRef(function ComboBoxItem(
  originalProps: ComboBoxItemProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: ForwardedRef<any>,
) {
  ;[originalProps, ref] = useContextProps(
    originalProps,
    ref,
    ComboBoxVariantContext,
  )
  const [
    { className, description, children, classNames, ...props },
    variantProps,
  ] = mapPropsVariants(originalProps, comboBoxItemStyles.variantKeys)

  const styles = comboBoxItemStyles(variantProps)

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
    <ListBoxItem
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
    </ListBoxItem>
  )
})
