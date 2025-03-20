"use client"

import type {
  SelectProps as AriaSelectProps,
  ListBoxProps,
  ListLayoutOptions,
} from "react-aria-components"
import { useMemo } from "react"
import { ChevronDownIcon } from "lucide-react"
import {
  Select as AriaSelect,
  ListBox,
  ListLayout,
  Popover,
  Provider,
  SelectValue,
  Virtualizer,
} from "react-aria-components"

import type {
  SelectVariantProps,
  SelectVariantSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import { composeRenderProps, selectStyles } from "@opengovsg/oui-theme"

import { Button } from "../button"
import { Description, Label } from "../field"
import { mapPropsVariants } from "../system/utils"
import { SelectVariantContext } from "./select-variant-context"

export interface SelectProps<T>
  extends Omit<AriaSelectProps, "children">,
    VariantProps<typeof selectStyles> {
  classNames?: SlotsToClasses<SelectVariantSlots>

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

export function Select<T extends object>({
  label,
  description,
  classNames,
  ...originalProps
}: SelectProps<T>) {
  const [_props, variantProps] = mapPropsVariants(
    originalProps,
    selectStyles.variantKeys,
  )
  const { items, children, listLayoutOptions, ...props } = _props
  const styles = selectStyles(variantProps)

  const layoutOptions: ListLayoutOptions = useMemo(() => {
    return {
      estimatedRowHeight: calculateEstimatedRowHeight(
        variantProps.size ?? "md",
      ),
      ...listLayoutOptions,
    }
  }, [listLayoutOptions, variantProps.size])

  return (
    <Provider values={[[SelectVariantContext, variantProps]]}>
      <AriaSelect
        className={composeRenderProps(
          props.className,
          (className, renderProps) =>
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

          <ChevronDownIcon
            className={styles.icon({
              className: classNames?.icon,
            })}
          />
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
          <Virtualizer layout={ListLayout} layoutOptions={layoutOptions}>
            <ListBox
              autoFocus
              items={items}
              shouldFocusWrap
              className={composeRenderProps(
                classNames?.list,
                (className, renderProps) =>
                  styles.list({ className, ...renderProps }),
              )}
            >
              {children}
            </ListBox>
          </Virtualizer>
        </Popover>
      </AriaSelect>
    </Provider>
  )
}
