import { themes } from "@storybook/theming";
import type { Preview } from "@storybook/react";

import "./style.css";

export const decorators: Preview["decorators"] = [];

const commonTheme = {
  brandTitle: "@Unnamed",
  brandUrl: "https://design.open.gov.sg",
  brandTarget: "_self",
};

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
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: "dark",
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
};

const locales = ["en-SG", "zh-SG", "ms-SG", "ta-SG"];

export const globalTypes: Preview["globalTypes"] = {
  locale: {
    toolbar: {
      icon: "globe",
      items: locales.map((locale) => ({
        value: locale,
        title: new Intl.DisplayNames(undefined, { type: "language" }).of(
          locale
        ),
        right:
          // @ts-ignore
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
};
