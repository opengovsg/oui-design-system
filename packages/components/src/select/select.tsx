"use client"

import React from "react"
import {
  composeRenderProps,
  selectStyles,
  SelectVariantSlots,
  SlotsToClasses,
  VariantProps,
} from "@opengovsg/oui-theme"
import { ChevronsUpDownIcon, SearchIcon, XIcon } from "lucide-react"
import { Key, useFilter } from "react-aria"
import {
  Button as AriaButton,
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  Autocomplete,
  AutocompleteProps,
  ListBox,
  ListBoxProps,
  Popover,
  SearchField,
  SelectValue,
} from "react-aria-components"

import { Button } from "../button"
import { Label } from "../field"
import { Input } from "../input"
import { mapPropsVariants } from "../system/utils"
import { SelectItem } from "./select-item"

export interface SelectProps<T extends SelectItemType = SelectItemType>
  extends Omit<AriaSelectProps, "children">,
    VariantProps<typeof selectStyles> {
  classNames?: SlotsToClasses<SelectVariantSlots>
  label?: string

  /**
   * An optional filter function used to determine if an option should be included in the autocomplete list.
   * @precondition `showSearch` is true
   * @defaultValue `useFilter#contains`
   */
  searchFilter?: AutocompleteProps["filter"]

  /**
   * Whether or not to allow the search bar to be displayed in the select component.
   */
  showSearch?: boolean
  /**
   * Placeholder text for the search bar.
   * @precondition `showSearch` is true
   */
  searchPlaceholder?: string

  items: NonNullable<ListBoxProps<T>["items"]>

  children?: ListBoxProps<T>["children"]
}

type SelectItemType = {
  textValue: string
  id: Key
}

const SearchAutocomplete = <T extends SelectItemType = SelectItemType>({
  children,
  showSearch,
  searchFilter,
  searchPlaceholder,
}: Pick<SelectProps<T>, "searchFilter" | "searchPlaceholder" | "showSearch"> & {
  children: React.ReactNode
}) => {
  const { contains } = useFilter({ sensitivity: "base" })

  if (!showSearch) {
    return children
  }

  return (
    <Autocomplete filter={searchFilter ?? contains}>
      <SearchField
        aria-label="Search"
        autoFocus
        className="has-focus:border-sky-600 group m-1 flex items-center rounded-full border-2 border-gray-300 bg-white forced-colors:bg-[Field]"
      >
        <SearchIcon
          aria-hidden
          className="ml-2 h-4 w-4 text-gray-600 forced-colors:text-[ButtonText]"
        />
        <Input
          placeholder={searchPlaceholder}
          className="min-w-0 flex-1 border-none bg-white px-2 py-1 font-[inherit] text-base text-gray-800 placeholder-gray-500 outline outline-0 [&::-webkit-search-cancel-button]:hidden"
        />
        <AriaButton className="pressed:bg-black/10 mr-1 flex w-6 items-center justify-center rounded-full border-0 bg-transparent p-1 text-center text-sm text-gray-600 transition hover:bg-black/[5%] group-empty:invisible">
          <XIcon aria-hidden className="h-4 w-4" />
        </AriaButton>
      </SearchField>
      {children}
    </Autocomplete>
  )
}

export function Select<T extends SelectItemType>({
  label,
  classNames,
  ...originalProps
}: SelectProps<T>) {
  const [_props, variantProps] = mapPropsVariants(
    originalProps,
    selectStyles.variantKeys,
  )
  const {
    searchFilter,
    showSearch,
    searchPlaceholder,
    items,
    children,
    ...props
  } = _props
  const styles = selectStyles(variantProps)

  return (
    <AriaSelect
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles.base({ className, ...renderProps }),
      )}
      {...props}
    >
      {label && <Label className={classNames?.label}>{label}</Label>}
      <Button
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
      <Popover className="entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out w-(--trigger-width) flex !max-h-80 flex-col rounded-md bg-white text-base shadow-lg ring-1 ring-black/5">
        <SearchAutocomplete
          showSearch={showSearch}
          searchFilter={searchFilter}
          searchPlaceholder={searchPlaceholder}
        >
          <ListBox
            items={items}
            shouldFocusWrap
            className="outline-hidden flex-1 scroll-pb-1 overflow-auto p-1"
          >
            {(item) => {
              if (typeof children === "function") {
                return children(item)
              }
              return <SelectItem>{item.textValue}</SelectItem>
            }}
          </ListBox>
        </SearchAutocomplete>
      </Popover>
    </AriaSelect>
  )
}
