const colors = require("tailwindcss/colors");
const { basePreset } = require("@unnamed/theme");
const { ogpDsColorPlugin } = require("@unnamed/theme/plugins");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./.storybook/welcome.stories.mdx",
    "../../packages/components/*/src/**/*.{js,jsx,ts,tsx}",
    "../../packages/components/*/stories/**/*.{js,jsx,ts,tsx}",
    "../../packages/theme/src/components/**/*.{js,jsx,ts,tsx}",
    "../../packages/theme/src/utils/**/*.{js,jsx,ts,tsx}",
    "../../packages/theme/stories/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  presets: [basePreset],
  plugins: [
    // Example of using a plugin from the theme package
    ogpDsColorPlugin({
      light: {
        "bg-primary-default": "0 107 255",
        "bg-primary-hover": "5 82 196",
        "bg-primary-active": "0 64 146",
        "content-fg": "255 255 255",
        "outline-focus": "0 107 255",
        "bg-system-disabled": "245 245 245",
      },
      dark: {
        "bg-primary-default": "0 107 255",
        "bg-primary-hover": "5 82 196",
        "bg-primary-active": "0 64 146",
        "content-fg": "255 255 255",
        "outline-focus": "0 107 255",
        "bg-system-disabled": "26 26 26",
      },
    }),
  ],
};
