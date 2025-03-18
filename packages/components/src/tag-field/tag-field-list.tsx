"use client"

import type { Virtualizer } from "@tanstack/react-virtual"
import type { UseComboboxPropGetters } from "downshift"
import type { ForwardedRef, ReactNode } from "react"
import type { ContextValue, SlotProps } from "react-aria-components"
import { createContext, useContext } from "react"
import { useContextProps } from "react-aria-components"

import type { SlotsToClasses, TagFieldItemSlots } from "@opengovsg/oui-theme"
import { dataAttr, tagFieldItemStyles } from "@opengovsg/oui-theme"

import type { TagFieldItem, TagFieldListRenderProps } from "./types"
import { forwardRefGeneric } from "../system/utils"
import { TagFieldStateContext } from "./tag-field-state-context"

export interface TagFieldListContextValue
  extends SlotProps,
    ReturnType<UseComboboxPropGetters<object>["getMenuProps"]> {
  rowVirtualizer: Virtualizer<HTMLElement, Element>
}

export const TagFieldListContext =
  createContext<ContextValue<TagFieldListContextValue, HTMLUListElement>>(null)

interface TagFieldListProps<T extends TagFieldItem>
  extends Partial<TagFieldListContextValue> {
  className?: string
  itemClassNames?: SlotsToClasses<TagFieldItemSlots>
  children?: ReactNode | ((values: TagFieldListRenderProps<T>) => ReactNode)
}

interface TagFieldListItemProps<T extends TagFieldItem>
  extends Omit<TagFieldListRenderProps<T>, "key"> {
  classNames?: TagFieldListProps<T>["itemClassNames"]
}

const TagFieldListItemInner = <T extends TagFieldItem>(
  { item, isHighlighted, classNames, ...itemProps }: TagFieldListItemProps<T>,
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
export const TagFieldListItem = forwardRefGeneric(TagFieldListItemInner)

const TagFieldListInner = <T extends TagFieldItem>(
  props: TagFieldListProps<T>,
  ref: ForwardedRef<HTMLUListElement>,
) => {
  ;[props, ref] = useContextProps(props, ref, TagFieldListContext)
  const { items, getItemProps, highlightedIndex } =
    useContext(TagFieldStateContext)!

  const { slot, rowVirtualizer, itemClassNames, ...rest } = props

  return (
    <ul slot={slot ?? undefined} ref={ref} {...rest}>
      {props.children !== undefined && typeof props.children !== "function" ? (
        props.children
      ) : (
        <>
          <li
            key="total-size"
            aria-hidden
            style={{ height: rowVirtualizer?.getTotalSize() }}
          />
          {rowVirtualizer?.getVirtualItems().map((virtualRow) => {
            const item = items[virtualRow.index]
            const itemProps = getItemProps({
              item,
              index: virtualRow.index,
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
              },
            })
            const childProps: TagFieldListRenderProps<T> = {
              item,
              isHighlighted: highlightedIndex === virtualRow.index,
              key: virtualRow.key,
              itemClassNames,
              ...itemProps,
            }
            if (typeof props.children === "function") {
              return props.children(childProps)
            }
            return <TagFieldListItem {...childProps} key={childProps.key} />
          })}
        </>
      )}
    </ul>
  )
}
export const TagFieldList = forwardRefGeneric(TagFieldListInner)
