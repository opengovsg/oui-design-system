"use client"

import type {
  SelectProps as AriaSelectProps,
  ListBoxProps,
  ListLayoutOptions,
  SelectValueRenderProps,
  ValidationResult,
} from "react-aria-components"
import { cloneElement, isValidElement, useMemo } from "react"
import { ChevronDownIcon } from "lucide-react"
import { useLocalizedStringFormatter } from "react-aria"
import {
  Select as AriaSelect,
  Autocomplete,
  Input,
  ListBox,
  ListLayout,
  Provider,
  SearchField,
  SelectValue,
  useFilter,
  Virtualizer,
} from "react-aria-components"

import type {
  SelectVariantProps,
  SelectVariantSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import { cn, composeRenderProps, selectStyles } from "@opengovsg/oui-theme"

import type { PopoverProps } from "../popover"
import type { ChildrenOrFunction } from "../system/react-utils/children"
import { Button } from "../button"
import { Description, FieldError, Label } from "../field"
import { Popover } from "../popover"
import { useElementWidth } from "../system/react-utils/sizing"
import { mapPropsVariants } from "../system/utils"
import { i18nStrings } from "./i18n"
import { SelectVariantContext } from "./select-variant-context"

export interface SelectProps<T>
  extends Omit<AriaSelectProps, "children">,
    VariantProps<typeof selectStyles> {
  classNames?: SlotsToClasses<SelectVariantSlots | "error">

  /**
   * Any additional props to be spread to the list layout.
   */
  listLayoutOptions?: ListLayoutOptions

  label?: React.ReactNode
  description?: React.ReactNode | null

  errorMessage?:
    | React.ReactNode
    | ((validation: ValidationResult) => React.ReactNode)

  /** The list of Select options to render */
  items?: NonNullable<ListBoxProps<T>["items"]>

  children?: ListBoxProps<T>["children"]

  /**
   * Enable search/autocomplete functionality with a search field
   * @default false
   */
  enableSearch?: boolean

  /**
   * Placeholder text for the search field.
   * If not provided, a localized default will be used.
   */
  searchPlaceholder?: string

  /**
   * Icon to display in the search field. If not provided, no icon will be displayed.
   */
  searchIcon?: React.ReactNode

  /**
   * Custom renderer for the selected value displayed in the trigger button.
   * If not provided, the default renderer will display the selected option's text.
   * The render prop function receives the same props as the children of SelectValue.
   * You can use these props to conditionally render based on the selected option's state (e.g. isPlaceholder).
   */
  renderSelectValue?: ChildrenOrFunction<SelectValueRenderProps<T>>

  popoverProps?: Partial<PopoverProps>
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
  errorMessage,
  ...originalProps
}: SelectProps<T>) {
  const stringFormatter = useLocalizedStringFormatter(i18nStrings)
  const [_props, variantProps] = mapPropsVariants(
    originalProps,
    selectStyles.variantKeys,
  )
  const {
    items,
    children,
    listLayoutOptions,
    enableSearch = false,
    searchPlaceholder,
    searchIcon,
    renderSelectValue,
    popoverProps,
    ...props
  } = _props
  const styles = selectStyles(variantProps)

  const triggerWidth = useElementWidth(popoverProps?.triggerRef)

  const { contains } = useFilter({ sensitivity: "base" })

  const layoutOptions: ListLayoutOptions = useMemo(() => {
    return {
      estimatedRowHeight: calculateEstimatedRowHeight(
        variantProps.size ?? "md",
      ),
      ...listLayoutOptions,
    }
  }, [listLayoutOptions, variantProps.size])

  const renderedSearchIcon = useMemo(() => {
    if (!enableSearch || !searchIcon) return null
    if (isValidElement(searchIcon)) {
      const iconElement = searchIcon as React.ReactElement<{
        className?: string
      }>
      return cloneElement(iconElement, {
        className: styles.searchIcon({
          className: cn(classNames?.searchIcon, iconElement.props.className),
        }),
      })
    }
    return (
      <span
        className={styles.searchIcon({ className: classNames?.searchIcon })}
      >
        {searchIcon}
      </span>
    )
  }, [classNames?.searchIcon, enableSearch, searchIcon, styles])

  const listContent = (
    <Virtualizer layout={ListLayout} layoutOptions={layoutOptions}>
      <ListBox
        autoFocus={!enableSearch}
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
  )

  return (
    <Provider values={[[SelectVariantContext, variantProps]]}>
      <AriaSelect
        {...props}
        className={composeRenderProps(
          props.className ?? classNames?.base,
          (className, renderProps) =>
            styles.base({ className, ...renderProps }),
        )}
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
          >
            {renderSelectValue}
          </SelectValue>

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
        <FieldError size={variantProps.size} className={classNames?.error}>
          {errorMessage}
        </FieldError>
        <Popover
          className={styles.popover({ className: classNames?.popover })}
          {...(triggerWidth !== null
            ? {
                style: {
                  "--trigger-width": triggerWidth,
                } as React.CSSProperties,
              }
            : {})}
          {...popoverProps}
        >
          {enableSearch ? (
            <Autocomplete filter={contains}>
              <SearchField
                autoFocus
                aria-label={stringFormatter.format("Search options")}
                className={styles.searchField({
                  className: classNames?.searchField,
                })}
              >
                {renderedSearchIcon}
                <Input
                  placeholder={
                    searchPlaceholder ?? stringFormatter.format("Search...")
                  }
                  className={styles.searchInput({
                    className: classNames?.searchInput,
                  })}
                />
              </SearchField>
              {listContent}
            </Autocomplete>
          ) : (
            listContent
          )}
        </Popover>
      </AriaSelect>
    </Provider>
  )
}
