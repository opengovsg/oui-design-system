"use client"

import type { Virtualizer } from "@tanstack/react-virtual"
import type { UseComboboxPropGetters } from "downshift"
import type { ForwardedRef, ReactNode } from "react"
import type { ContextValue, SlotProps } from "react-aria-components"
import { createContext, useContext } from "react"
import { useContextProps } from "react-aria-components"

import type { TagFieldItemProps } from "./tag-field-item"
import type { TagFieldListRenderProps } from "./types"
import { forwardRefGeneric } from "../system/utils"
import { TagFieldItem } from "./tag-field-item"
import { TagFieldStateContext } from "./tag-field-state-context"

export interface TagFieldListContextValue
  extends SlotProps,
    ReturnType<UseComboboxPropGetters<object>["getMenuProps"]> {
  rowVirtualizer: Virtualizer<HTMLElement, Element> | null
}

export const TagFieldListContext =
  createContext<ContextValue<TagFieldListContextValue, HTMLUListElement>>(null)

interface TagFieldListProps<T extends object>
  extends Partial<TagFieldListContextValue> {
  className?: string
  itemClassNames?: TagFieldItemProps<T>["classNames"]
  children?: ReactNode | ((values: TagFieldListRenderProps<T>) => ReactNode)
}

const TagFieldListInner = <T extends object>(
  props: TagFieldListProps<T>,
  ref: ForwardedRef<HTMLUListElement>,
) => {
  ;[props, ref] = useContextProps(props, ref, TagFieldListContext)
  const { items, getItemProps, highlightedIndex, itemToKey } =
    useContext(TagFieldStateContext)!

  const { slot, rowVirtualizer, itemClassNames, ...rest } = props

  return (
    <ul slot={slot ?? undefined} ref={ref} {...rest}>
      {props.children !== undefined && typeof props.children !== "function" ? (
        props.children
      ) : rowVirtualizer ? (
        <>
          <li
            key="total-size"
            aria-hidden
            style={{ height: rowVirtualizer.getTotalSize() }}
          />
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
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
            const childProps: Omit<TagFieldListRenderProps<T>, "itemProps"> = {
              item,
              isHighlighted: highlightedIndex === virtualRow.index,
              key: virtualRow.key,
              classNames: itemClassNames,
            }
            if (typeof props.children === "function") {
              return props.children({ ...childProps, itemProps })
            }
            return (
              <TagFieldItem
                {...childProps}
                {...itemProps}
                key={childProps.key}
              />
            )
          })}
        </>
      ) : (
        items.map((item, index) => {
          const itemProps = getItemProps({ item, index })
          const key = itemToKey(item)
          const childProps: Omit<TagFieldListRenderProps<T>, "itemProps"> = {
            item,
            isHighlighted: highlightedIndex === index,
            key,
            classNames: itemClassNames,
          }
          if (typeof props.children === "function") {
            return props.children({ ...childProps, itemProps })
          }
          return (
            <TagFieldItem
              {...childProps}
              {...itemProps}
              key={key}
            />
          )
        })
      )}
    </ul>
  )
}
export const TagFieldList = forwardRefGeneric(TagFieldListInner)
