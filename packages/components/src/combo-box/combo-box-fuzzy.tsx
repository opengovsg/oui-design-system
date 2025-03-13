"use client"

import { useCallback, useDeferredValue, useMemo, useState } from "react"
import fuzzysort from "fuzzysort"
import { Key } from "react-aria"
import { SetRequired } from "type-fest"

import {
  comboBoxFuzzyHighlightedTextStyles,
  ComboBoxFuzzyVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"

import { ComboBox, ComboBoxItem, ComboBoxProps } from "./combo-box"

interface HighlightedTextProps extends ComboBoxFuzzyVariantProps {
  result?: Fuzzysort.Result
  originalText?: string
  className?: string
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

export interface ComboBoxFuzzyProps<T extends ComboBoxItem = ComboBoxItem>
  extends SetRequired<
    ComboBoxProps<T>,
    | "inputValue"
    | "onInputChange"
    | "onSelectionChange"
    | "selectedKey"
    | "items"
  > {
  itemClassNames?: ComboBoxProps<T>["itemClassNames"] &
    SlotsToClasses<"highlight">
}

/**
 * Controlled variant of ComboBox, allows for fuzzy search and item highlight.
 */
export function ComboBoxFuzzy<T extends ComboBoxItem = ComboBoxItem>({
  items,
  itemClassNames,
  onSelectionChange: onSelectionChangeProp,
  onInputChange: onInputChangeProp,
  ...props
}: ComboBoxFuzzyProps<T>) {
  const deferredInputValue = useDeferredValue(props.inputValue)
  const preparedItems = useMemo(() => {
    return (
      items?.map((item) => ({
        ...item,
        prepared: fuzzysort.prepare(item.name),
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
            acc.result[result.obj.name] = result
            return acc
          },
          { items: [] as T[], result: {} as Record<string, Fuzzysort.Result> },
        )
      setFilteredResults(results)
    },
    [onInputChangeProp, preparedItems],
  )

  return (
    <ComboBox
      {...props}
      items={filteredResults.items}
      dependencies={[deferredInputValue]}
      onSelectionChange={onSelectionChange}
      onInputChange={onInputChange}
    >
      {(item) => (
        <ComboBoxItem
          classNames={itemClassNames}
          key={item.name}
          label={({ isSelected, isFocused }) => (
            <HighlightedText
              className={itemClassNames?.highlight}
              result={filteredResults.result?.[item.name]}
              originalText={item.name}
              isSelected={isSelected}
              isFocused={isFocused}
            />
          )}
          description={item.description}
          textValue={item.name}
          id={item.value}
        />
      )}
    </ComboBox>
  )
}
