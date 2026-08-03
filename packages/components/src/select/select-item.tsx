"use client"

import type {
  SelectItemVariantProps,
  SelectItemVariantSlots,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import { composeRenderProps, selectItemStyles } from "@opengovsg/oui-theme"
import type { ForwardedRef, ReactElement } from "react"
import type { ListBoxItemProps } from "react-aria-components"
import { ListBoxItem, useContextProps } from "react-aria-components"

import { forwardRef, mapPropsVariants } from "../system/utils"
import { SelectVariantContext } from "./select-variant-context"

export interface SelectItemProps<T extends object>
  extends ListBoxItemProps<T>, SelectItemVariantProps {
  classNames?: SlotsToClasses<SelectItemVariantSlots>
}

export const SelectItem = forwardRef(function SelectItem<T extends object>(
  { classNames, ...originalProps }: SelectItemProps<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: ForwardedRef<any>,
) {
  ;[originalProps, ref] = useContextProps(
    originalProps,
    ref,
    SelectVariantContext,
  )
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    selectItemStyles.variantKeys,
  )

  const styles = selectItemStyles(variantProps)

  return (
    <ListBoxItem
      textValue={
        typeof props.children === "string" ? props.children : undefined
      }
      {...props}
      ref={ref}
      className={composeRenderProps(
        props.className ?? classNames?.base,
        (className, renderProps) => styles.base({ className, ...renderProps }),
      )}
    >
      {(renderProps) => {
        if (typeof props.children === "function") {
          return props.children(renderProps)
        }
        return (
          <span
            className={styles.text({
              className: classNames?.text,
              ...renderProps,
            })}
          >
            {props.children}
          </span>
        )
      }}
    </ListBoxItem>
  )
}) as <T extends object>(props: SelectItemProps<T>) => ReactElement
