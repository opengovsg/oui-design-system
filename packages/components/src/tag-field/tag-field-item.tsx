"use client"

import type { ForwardedRef } from "react"
import { useContext } from "react"

import type { SlotsToClasses, TagFieldItemSlots } from "@opengovsg/oui-theme"
import { dataAttr, tagFieldItemStyles } from "@opengovsg/oui-theme"

import type { TagFieldBaseItemProps, TagFieldListRenderProps } from "./types"
import { forwardRefGeneric } from "../system/utils"
import { TagFieldStateContext } from "./tag-field-state-context"

export interface TagFieldItemProps<T extends object>
  extends Omit<TagFieldListRenderProps<T>, "key" | "itemProps">,
    TagFieldBaseItemProps<T> {
  classNames?: SlotsToClasses<TagFieldItemSlots>
}

const TagFieldItemInner = <T extends object>(
  { item, isHighlighted, classNames, ...itemProps }: TagFieldItemProps<T>,
  ref: ForwardedRef<HTMLLIElement>,
) => {
  const { itemToText, size } = useContext(TagFieldStateContext)!
  const styles = tagFieldItemStyles({ size })

  return (
    <li
      ref={ref}
      {...itemProps}
      className={styles.container({ className: classNames?.container })}
      data-rac
      data-hovered={dataAttr(isHighlighted)}
    >
      <span className={styles.label({ className: classNames?.label })}>
        {itemToText(item)}
      </span>
    </li>
  )
}
export const TagFieldItem = forwardRefGeneric(TagFieldItemInner)
