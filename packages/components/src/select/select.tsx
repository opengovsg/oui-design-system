"use client"

import { useMemo } from "react"
import {
  composeRenderProps,
  SelectItemVariantSlots,
  selectStyles,
  SelectVariantProps,
  SelectVariantSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import { ChevronsUpDownIcon } from "lucide-react"
import { Key } from "react-aria"
import {
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  ListBox,
  ListBoxProps,
  ListLayout,
  ListLayoutOptions,
  Popover,
  SelectValue,
  Virtualizer,
} from "react-aria-components"

import { Button } from "../button"
import { Description, Label } from "../field"
import { mapPropsVariants } from "../system/utils"
import { SelectItem } from "./select-item"

export interface SelectProps<T extends SelectItemType = SelectItemType>
  extends Omit<AriaSelectProps, "children">,
    VariantProps<typeof selectStyles> {
  classNames?: SlotsToClasses<SelectVariantSlots>
  itemClassNames?: SlotsToClasses<SelectItemVariantSlots>

  /**
   * Any additional props to be spread to the list layout.
   */
  listLayoutOptions?: ListLayoutOptions

  label?: string
  description?: string | null

  /** The list of Select options to render */
  items: NonNullable<ListBoxProps<T>["items"]>

  children?: ListBoxProps<T>["children"]
}

type SelectItemType = {
  textValue: string
  id: Key
}

const calculateEstimatedRowHeight = (
  size: NonNullable<SelectVariantProps["size"]>,
): number => {
  switch (size) {
    case "xs":
      return 44
    case "sm":
      return 44
    case "md":
      return 48
  }
}

export function Select<T extends SelectItemType>({
  label,
  description,
  classNames,
  itemClassNames,
  ...originalProps
}: SelectProps<T>) {
  const [_props, variantProps] = mapPropsVariants(
    originalProps,
    selectStyles.variantKeys,
  )
  const { items, children, listLayoutOptions, ...props } = _props
  const styles = selectStyles(variantProps)

  const layout = useMemo(() => {
    return new ListLayout({
      estimatedRowHeight: calculateEstimatedRowHeight(
        variantProps.size ?? "md",
      ),
      ...listLayoutOptions,
    })
  }, [listLayoutOptions, variantProps.size])

  return (
    <AriaSelect
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles.base({ className, ...renderProps }),
      )}
      {...props}
    >
      {label && (
        <Label size={variantProps.size} className={classNames?.label}>
          {label}
        </Label>
      )}
      <Button
        size={variantProps.size}
        variant={variantProps.variant ?? selectStyles.defaultVariants.variant}
        color={variantProps.color ?? selectStyles.defaultVariants.color}
        className={composeRenderProps(
          classNames?.trigger,
          (className, renderProps) =>
            styles.trigger({ className, ...renderProps }),
        )}
      >
        <SelectValue
          className={styles.selectedText({
            className: classNames?.selectedText,
          })}
        />
        <ChevronsUpDownIcon className="h-4 w-4" />
      </Button>
      {description && (
        <Description
          size={variantProps.size}
          className={classNames?.description}
        >
          {description}
        </Description>
      )}
      <Popover className={styles.popover({ className: classNames?.popover })}>
        {/* TODO: Allow search field in select. See PR commit for prior implementation. */}
        <Virtualizer layout={layout}>
          <ListBox
            items={items}
            shouldFocusWrap
            className={composeRenderProps(
              classNames?.list,
              (className, renderProps) =>
                styles.list({ className, ...renderProps }),
            )}
          >
            {(item) => {
              if (typeof children === "function") {
                return children(item)
              }
              return (
                <SelectItem
                  classNames={itemClassNames}
                  size={variantProps.size}
                >
                  {item.textValue}
                </SelectItem>
              )
            }}
          </ListBox>
        </Virtualizer>
      </Popover>
    </AriaSelect>
  )
}
