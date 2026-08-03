"use client"

import type { SlotsToClasses, TagFieldItemSlots } from "@opengovsg/oui-theme"
import { dataAttr, tagFieldItemStyles } from "@opengovsg/oui-theme"
import { Check } from "lucide-react"
import type { ForwardedRef } from "react"
import { useContext } from "react"

import { forwardRefGeneric } from "../system/utils"
import { TagFieldStateContext } from "./tag-field-state-context"
import type { TagFieldBaseItemProps, TagFieldListRenderProps } from "./types"

export interface TagFieldItemProps<T extends object>
  extends
    Omit<TagFieldListRenderProps<T>, "key" | "itemProps">,
    TagFieldBaseItemProps<T> {
  classNames?: SlotsToClasses<TagFieldItemSlots>
}

const TagFieldItemInner = <T extends object>(
  {
    item,
    isHighlighted,
    isSelected,
    classNames,
    ...itemProps
  }: TagFieldItemProps<T>,
  ref: ForwardedRef<HTMLLIElement>,
) => {
  const { itemToText, size } = useContext(TagFieldStateContext)!
  const styles = tagFieldItemStyles({ size, isSelected })

  return (
    <li
      ref={ref}
      {...itemProps}
      className={styles.container({
        className: classNames?.container,
        isFocused: isHighlighted,
        isDisabled: itemProps["aria-disabled"],
      })}
      data-rac
      data-focused={dataAttr(isHighlighted)}
      data-disabled={dataAttr(itemProps["aria-disabled"])}
      data-selected={dataAttr(isSelected)}
    >
      <span
        aria-hidden
        className={styles.checkboxBox({ className: classNames?.checkboxBox })}
      >
        {isSelected && (
          <Check
            className={styles.checkboxIcon({
              className: classNames?.checkboxIcon,
            })}
          />
        )}
      </span>
      <span className={styles.label({ className: classNames?.label })}>
        {itemToText(item)}
      </span>
    </li>
  )
}
export const TagFieldItem = forwardRefGeneric(TagFieldItemInner)
