"use client"

import type {
  ComboBoxFuzzyVariantProps,
  ListBoxItemSlots,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import {
  comboBoxFuzzyHighlightedTextStyles,
  comboBoxStyles,
  listBoxItemStyles,
} from "@opengovsg/oui-theme"
import fuzzysort from "fuzzysort"
import { useCallback, useDeferredValue, useMemo, useState } from "react"
import type { Key } from "react-aria"
import { Text } from "react-aria-components"
import type { SetRequired } from "type-fest"

import { mapPropsVariants } from "../system/utils"
import type { ComboBoxProps } from "./combo-box"
import { ComboBox } from "./combo-box"
import { ComboBoxItem } from "./combo-box-item"

interface HighlightedTextProps extends ComboBoxFuzzyVariantProps {
  result?: Fuzzysort.Result
  originalText?: string
  className?: string
}

type ComboBoxItem = {
  id: Key
  textValue: string
  description?: string
}

function HighlightedText({
  result,
  originalText,
  isFocused,
  isSelected,
  className,
}: HighlightedTextProps) {
  if (!result || result.indexes.length === 0) return originalText
  return result.highlight((m, i) => (
    <mark
      className={comboBoxFuzzyHighlightedTextStyles({
        className,
        isFocused,
        isSelected,
      })}
      key={i}
    >
      {m}
    </mark>
  ))
}

export interface ComboBoxFuzzyProps<
  T extends ComboBoxItem = ComboBoxItem,
> extends SetRequired<
  ComboBoxProps<T>,
  "inputValue" | "onInputChange" | "onSelectionChange" | "selectedKey" | "items"
> {
  itemClassNames?: SlotsToClasses<ListBoxItemSlots> &
    SlotsToClasses<"highlight">
}

/**
 * Controlled variant of ComboBox, allows for fuzzy search and item highlight.
 * @deprecated Use ComboBox instead (and bring your own fuzzysearch).
 */
export function ComboBoxFuzzy<T extends ComboBoxItem = ComboBoxItem>(
  originalProps: ComboBoxFuzzyProps<T>,
) {
  const [_props, variantProps] = mapPropsVariants(
    originalProps,
    comboBoxStyles.variantKeys,
  )
  const {
    items,
    itemClassNames,
    onSelectionChange: onSelectionChangeProp,
    onInputChange: onInputChangeProp,
    inputValue,
    ...props
  } = _props

  const deferredInputValue = useDeferredValue(inputValue)
  const preparedItems = useMemo(() => {
    return (
      items?.map((item) => ({
        ...item,
        prepared: fuzzysort.prepare(item.textValue),
      })) ?? []
    )
  }, [items])
  const [filteredResults, setFilteredResults] = useState({ items, result: {} })

  const onSelectionChange = useCallback(
    (key: Key | null) => {
      onSelectionChangeProp(key)
      // Reset items
      setFilteredResults({ items: preparedItems, result: {} })
    },
    [onSelectionChangeProp, preparedItems],
  )

  const onInputChange = useCallback(
    (value: string) => {
      onInputChangeProp(value)
      if (!value) {
        setFilteredResults({ items: preparedItems, result: {} })
        return
      }
      const results = fuzzysort
        .go(value, preparedItems, {
          key: "prepared",
        })
        .reduce(
          (acc, result) => {
            acc.items.push(result.obj)
            acc.result[result.obj.textValue] = result
            return acc
          },
          { items: [] as T[], result: {} as Record<string, Fuzzysort.Result> },
        )
      setFilteredResults(results)
    },
    [onInputChangeProp, preparedItems],
  )

  const itemStyles = listBoxItemStyles(variantProps)

  return (
    <ComboBox
      {...props}
      inputValue={inputValue}
      items={filteredResults.items}
      dependencies={[deferredInputValue]}
      onSelectionChange={onSelectionChange}
      onInputChange={onInputChange}
    >
      {(item) => (
        <ComboBoxItem key={item.id} textValue={item.textValue} id={item.id}>
          {({ isSelected, isFocused }) => (
            <>
              <Text
                className={itemStyles.label({
                  className: itemClassNames?.label,
                })}
                slot="label"
              >
                <HighlightedText
                  className={itemClassNames?.highlight}
                  result={filteredResults.result?.[item.textValue]}
                  originalText={item.textValue}
                  isSelected={isSelected}
                  isFocused={isFocused}
                />
              </Text>
              {item.description && (
                <Text
                  className={itemStyles.description({
                    className: itemClassNames?.description,
                  })}
                  slot="description"
                >
                  {item.description}
                </Text>
              )}
            </>
          )}
        </ComboBoxItem>
      )}
    </ComboBox>
  )
}
