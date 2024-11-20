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
  plugins: [],
};
