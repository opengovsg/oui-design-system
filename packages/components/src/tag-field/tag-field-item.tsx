"use client"

import type { ListBoxItemSlots, SlotsToClasses } from "@opengovsg/oui-theme"
import { dataAttr, listBoxItemStyles } from "@opengovsg/oui-theme"
import type { ForwardedRef } from "react"
import { useContext } from "react"

import { forwardRefGeneric } from "../system/utils"
import { TagFieldStateContext } from "./tag-field-state-context"
import type { TagFieldBaseItemProps, TagFieldListRenderProps } from "./types"

export interface TagFieldItemProps<T extends object>
  extends
    Omit<TagFieldListRenderProps<T>, "key" | "itemProps">,
    TagFieldBaseItemProps<T> {
  classNames?: SlotsToClasses<ListBoxItemSlots>
}

const TagFieldItemInner = <T extends object>(
  { item, isHighlighted, classNames, ...itemProps }: TagFieldItemProps<T>,
  ref: ForwardedRef<HTMLLIElement>,
) => {
  const { itemToText, size } = useContext(TagFieldStateContext)!
  const styles = listBoxItemStyles({ size })

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
    >
      <span className={styles.label({ className: classNames?.label })}>
        {itemToText(item)}
      </span>
    </li>
  )
}
export const TagFieldItem = forwardRefGeneric(TagFieldItemInner)
