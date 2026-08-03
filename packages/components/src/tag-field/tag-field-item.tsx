"use client"

import type { ListBoxItemSlots, SlotsToClasses } from "@opengovsg/oui-theme"
import {
  checkboxStyles,
  cn,
  dataAttr,
  listBoxItemStyles,
} from "@opengovsg/oui-theme"
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
  classNames?: SlotsToClasses<ListBoxItemSlots>
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
  const styles = listBoxItemStyles({ size })
  const checkbox = checkboxStyles({ size, isSelected })

  return (
    <li
      ref={ref}
      {...itemProps}
      className={styles.container({
        className: cn(classNames?.container, "flex-row items-center gap-2"),
        isFocused: isHighlighted,
        isDisabled: itemProps["aria-disabled"],
      })}
      data-rac
      data-focused={dataAttr(isHighlighted)}
      data-disabled={dataAttr(itemProps["aria-disabled"])}
      data-selected={dataAttr(isSelected)}
    >
      <span aria-hidden className={checkbox.box({ className: "shrink-0" })}>
        {isSelected && <Check className={checkbox.icon()} />}
      </span>
      <span className={styles.label({ className: classNames?.label })}>
        {itemToText(item)}
      </span>
    </li>
  )
}
export const TagFieldItem = forwardRefGeneric(TagFieldItemInner)
