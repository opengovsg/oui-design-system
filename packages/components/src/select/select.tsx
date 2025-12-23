"use client"

import type { LocalizedStrings } from "react-aria"
import type {
  SelectProps as AriaSelectProps,
  ListBoxProps,
  ListLayoutOptions,
  ValidationResult,
} from "react-aria-components"
import { useMemo } from "react"
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
import { composeRenderProps, selectStyles } from "@opengovsg/oui-theme"

import { Button } from "../button"
import { Description, FieldError, Label } from "../field"
import { Popover } from "../popover"
import { mapPropsVariants } from "../system/utils"
import { SelectVariantContext } from "./select-variant-context"

const i18nStrings: LocalizedStrings = {
  "en-SG": {
    searchPlaceholder: "Search...",
    searchAriaLabel: "Search options",
  },
  "zh-SG": {
    searchPlaceholder: "搜索...",
    searchAriaLabel: "搜索选项",
  },
  "ms-SG": {
    searchPlaceholder: "Cari...",
    searchAriaLabel: "Cari pilihan",
  },
  "ta-SG": {
    searchPlaceholder: "தேடு...",
    searchAriaLabel: "தேடல் விருப்பங்கள்",
  },
}

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
  const formatter = useLocalizedStringFormatter(i18nStrings)
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
    ...props
  } = _props
  const styles = selectStyles(variantProps)

  const { contains } = useFilter({ sensitivity: "base" })

  const layoutOptions: ListLayoutOptions = useMemo(() => {
    return {
      estimatedRowHeight: calculateEstimatedRowHeight(
        variantProps.size ?? "md",
      ),
      ...listLayoutOptions,
    }
  }, [listLayoutOptions, variantProps.size])

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
        <FieldError size={variantProps.size} className={classNames?.error}>
          {errorMessage}
        </FieldError>
        <Popover className={styles.popover({ className: classNames?.popover })}>
          {enableSearch ? (
            <Autocomplete filter={contains}>
              <SearchField
                autoFocus
                aria-label={formatter.format("searchAriaLabel")}
                className={styles.searchField({
                  className: classNames?.searchField,
                })}
              >
                {searchIcon}
                <Input
                  placeholder={searchPlaceholder ?? formatter.format("searchPlaceholder")}
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
