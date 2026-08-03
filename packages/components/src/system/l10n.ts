// Reexported useLocalizedStringFormatter due to some third party libraries not properly using `useLocale` to retrieve current locale

import type {
  LocalizedString,
  LocalizedStrings,
} from "@internationalized/string"
import { LocalizedStringFormatter } from "@internationalized/string"
import { useLocalizedStringDictionary } from "@react-aria/i18n"
import { useMemo } from "react"
import { useLocale } from "react-aria-components"

/**
 * Provides localized string formatting for the current locale. Supports interpolating variables,
 * selecting the correct pluralization, and formatting numbers. Automatically updates when the locale changes.
 *
 * @param strings - A mapping of languages to localized strings by key.
 */
export function useLocalizedStringFormatter<
  K extends string = string,
  T extends LocalizedString = string,
>(
  strings: LocalizedStrings<K, T>,
  packageName?: string,
): LocalizedStringFormatter<K, T> {
  const { locale } = useLocale()
  const dictionary = useLocalizedStringDictionary(strings, packageName)
  return useMemo(
    () => new LocalizedStringFormatter(locale, dictionary),
    [locale, dictionary],
  )
}
