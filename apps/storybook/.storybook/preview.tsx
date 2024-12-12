import type { Preview } from "@storybook/react"
import { themes } from "@storybook/theming"
import { I18nProvider } from "react-aria-components"

import "../tailwind.css"

export const decorators: Preview["decorators"] = [
  (Story, { globals }) => {
    const { locale } = globals
    return (
      <I18nProvider locale={locale}>
        <Story />
      </I18nProvider>
    )
  },
]

const commonTheme = {
  brandTitle: "@Unnamed",
  brandUrl: "https://design.open.gov.sg",
  brandTarget: "_self",
}

export const parameters: Preview["parameters"] = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Foundations", "Components"],
    },
  },
  controls: {
    matchers: {
      // eslint-disable-next-line prefer-named-capture-group -- unnecessary
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: "light",
    stylePreview: true,
    darkClass: "dark",
    lightClass: "light",
    classTarget: "html",
    dark: {
      ...themes.dark,
      ...commonTheme,
    },
    light: {
      ...themes.light,
      ...commonTheme,
    },
  },
}

const locales = ["en-SG", "zh-SG", "ms-SG", "ta-SG"]

export const globalTypes: Preview["globalTypes"] = {
  locale: {
    toolbar: {
      icon: "globe",
      items: locales.map((locale) => ({
        value: locale,
        title: new Intl.DisplayNames(undefined, { type: "language" }).of(
          locale,
        ),
        right:
          // @ts-expect-error - Will always exist.
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unnecessary-condition -- may be undefined, taking the risk
          new Intl.Locale(locale)?.textInfo?.direction === "rtl"
            ? "Right to Left"
            : undefined,
      })),
    },
  },
  disableAnimation: {
    name: "Disable Animation",
    description: "Disable all animations in the stories",
    toolbar: {
      icon: "photodrag",
      items: [
        { value: true, title: "True" },
        { value: false, title: "False" },
      ],
    },
  },
}
export const tags = ["autodocs"]
