import type { Decorator, Preview } from "@storybook/react"
import { CalendarDate } from "@internationalized/date"
import { viewport } from "@oui/chromatic"
import FakeTimers from "@sinonjs/fake-timers"
import { withThemeByClassName } from "@storybook/addon-themes"
import { I18nProvider } from "react-aria-components"

import "../tailwind.css"

const now = new Date()
let clock: FakeTimers.Clock | undefined

export const withMockDate: Decorator = (storyFn, context) => {
  const mockDate = context.parameters.mockDate

  if (!mockDate || !(mockDate instanceof CalendarDate)) {
    if (clock) {
      clock.setSystemTime(now)
    }
    return storyFn(context)
  }

  const mockedDate = mockDate.toDate("UTC")
  if (!clock) {
    clock = FakeTimers.install({
      toFake: ["Date"],
      ...(mockDate && { now: mockedDate }),
    })
  } else {
    clock.setSystemTime(mockedDate)
  }

  return (
    <>
      <div
        className="z-docked fixed top-0 right-0 bg-white p-1 text-xs"
        data-a11y-ignore="true"
      >
        Mocking date: {mockedDate.toISOString()}
      </div>
      {storyFn(context)}
    </>
  )
}

export const decorators: Preview["decorators"] = [
  withMockDate,
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
  (Story, { globals }) => {
    const { locale } = globals
    return (
      <I18nProvider locale={locale ?? "en-SG"}>
        <div className="antialiased">
          <Story />
        </div>
      </I18nProvider>
    )
  },
]

export const parameters: Preview["parameters"] = {
  backgrounds: {
    options: {
      dark: { name: "dark", value: "#3a3e46" },
      light: { name: "light", value: "#ffffff" },
    },
  },
  viewport,
  a11y: {
    config: {
      rules: [
        {
          id: "region",
          enabled: false,
        },
        {
          id: "explicit-ignore",
          selector: '[data-a11y-ignore="true"]',
        },
      ],
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Foundations", "Components"],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  /**
   * If tablet view is needed, add it on a per-story basis.
   * @example
   * ```
   * export const SomeStory: Story = {
   *   parameters: {
   *     chromatic: withChromaticModes(["mobile", "tablet", "desktop"]),
   *   }
   * }
   * ```
   */
  chromatic: {
    prefersReducedMotion: "reduce",
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

// Fixes concurrent axe instances. See https://github.com/storybookjs/storybook/issues/30385.
export const initialGlobals: Preview["initialGlobals"] = {
  a11y: {
    manual: true,
  },
}

export const tags = ["autodocs"]
