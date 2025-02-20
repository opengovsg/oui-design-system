"use client"

import { useDeferredValue, useMemo } from "react"
import {
  comboBoxFuzzyHighlightedTextStyles,
  ComboBoxFuzzyVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import fuzzysort from "fuzzysort"
import { SetRequired } from "type-fest"

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

interface ComboBoxFuzzyProps<T extends ComboBoxItem>
  extends SetRequired<
    ComboBoxProps<T>,
    "inputValue" | "onInputChange" | "onSelectionChange" | "selectedKey"
  > {
  itemClassNames?: ComboBoxProps<T>["itemClassNames"] &
    SlotsToClasses<"highlight">
}

/**
 * Controlled variant of ComboBox, allows for fuzzy search and item highlight.
 */
export function ComboBoxFuzzy<T extends ComboBoxItem>({
  items,
  itemClassNames,
  ...props
}: ComboBoxFuzzyProps<T>) {
  const deferredInputValue = useDeferredValue(props.inputValue)

  const preparedItems = useMemo(() => {
    return items.map((item) => ({
      ...item,
      prepared: fuzzysort.prepare(item.name),
    }))
  }, [items])

  const fuzzyResults = useMemo(() => {
    if (!deferredInputValue) return { items, result: {} }
    const results = fuzzysort.go(deferredInputValue, preparedItems, {
      key: "prepared",
    })

    return results.reduce(
      (acc, result) => {
        acc.items.push(result.obj)
        acc.result[result.obj.name] = result
        return acc
      },
      { items: [] as T[], result: {} as Record<string, Fuzzysort.Result> },
    )
  }, [deferredInputValue, items, preparedItems])

  return (
    <ComboBox
      {...props}
      items={fuzzyResults.items}
      dependencies={[deferredInputValue]}
    >
      {(item) => (
        <ComboBoxItem
          classNames={itemClassNames}
          key={item.name}
          label={({ isSelected, isFocused }) => (
            <HighlightedText
              className={itemClassNames?.highlight}
              result={fuzzyResults.result?.[item.name]}
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
