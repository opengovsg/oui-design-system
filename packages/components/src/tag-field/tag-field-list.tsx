import { createContext, ForwardedRef, ReactNode, useContext } from "react"
import { dataAttr, SlotsToClasses, TagFieldSlots } from "@opengovsg/oui-theme"
import { Virtualizer } from "@tanstack/react-virtual"
import { UseComboboxPropGetters } from "downshift"
import { ContextValue, SlotProps, useContextProps } from "react-aria-components"

import { forwardRefGeneric } from "../system/utils"
import { TagFieldStateContext } from "./tag-field-state-context"
import { TagFieldItem, TagFieldListRenderProps } from "./types"

export interface TagFieldListContextValue
  extends SlotProps,
    ReturnType<UseComboboxPropGetters<object>["getMenuProps"]> {
  rowVirtualizer: Virtualizer<HTMLElement, Element>
}

export const TagFieldListContext =
  createContext<ContextValue<TagFieldListContextValue, HTMLUListElement>>(null)

interface TagFieldListProps<T extends TagFieldItem>
  extends Partial<TagFieldListContextValue> {
  classNames?: Pick<SlotsToClasses<TagFieldSlots>, "list" | "listItem">
  children?: ReactNode | ((values: TagFieldListRenderProps<T>) => ReactNode)
}

type TagFieldListItemProps<T extends TagFieldItem> = Omit<
  TagFieldListRenderProps<T>,
  "key"
>

const TagFieldListItemInner = <T extends TagFieldItem>(
  { item, isHighlighted, itemProps }: TagFieldListItemProps<T>,
  ref: ForwardedRef<HTMLLIElement>,
) => {
  const { itemToKey, itemToText } = useContext(TagFieldStateContext)!

  return (
    <li
      ref={ref}
      key={itemToKey(item)}
      {...itemProps}
      data-rac
      data-hovered={dataAttr(isHighlighted)}
    >
      <span>{itemToText(item)}</span>
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

  const { slot, classNames, rowVirtualizer, ...rest } = props

  return (
    <ul
      slot={slot ?? undefined}
      ref={ref}
      {...rest}
      className={classNames?.list}
    >
      {props.children !== undefined && typeof props.children !== "function" ? (
        props.children
      ) : (
        <>
          <li
            key="total-size"
            style={{ height: rowVirtualizer?.getTotalSize() }}
          />
          {rowVirtualizer?.getVirtualItems().map((virtualRow) => {
            const item = items[virtualRow.index]
            const itemProps = getItemProps({
              item,
              index: virtualRow.index,
              className: classNames?.listItem,
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
              },
            })
            const childProps = {
              item,
              itemProps,
              isHighlighted: highlightedIndex === virtualRow.index,
              key: virtualRow.key,
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
