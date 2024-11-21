import plugin from "tailwindcss/plugin";

// TODO: decide between interface
interface ColorTokensAlt {
  bg: {
    default: string;
    alt: string;
    brand: string;
    inverse: string;
    system: {
      disabled: string;
      tooltip: string;
      input: string;
      "tab-container": {
        DEFAULT: string;
        primary: string;
      };
    };
  };
}

// Should loosen it to just record if using this style
// interface ColorTokens {
//   "bg-default": string;
//   "bg-alt": string;
//   "bg-brand": string;
//   "bg-inverse": string;
//   "bg-system-disabled": string;
//   "bg-system-tooltip": string;
//   "bg-system-input": string;
//   "bg-system-tab-container": string;
//   "bg-primary-default": string;
//   "bg-primary-subtle": string;
//   "bg-primary-tinted": string;
//   "bg-neutral-subtle": string;
//   "bg-neutral-tinted": string;
//   "bg-danger": string;
//   "bg-danger-subtle": string;
//   "bg-warning": string;
//   "bg-warning-subtle": string;
//   "bg-success": string;
//   "bg-success-subtle": string;
// }
type ColorTokens = Record<string, string>;

// TODO: Sync with some output generated from Figma Variables
interface Colors {
  light: ColorTokens;
  dark: ColorTokens;
}

export const ogpDsColorPlugin = plugin.withOptions(
  (colors: Colors) =>
    ({ addBase }) => {
      addBase({
        ":root": {
          ...Object.keys(colors.light).reduce((acc, key) => {
            return {
              ...acc,
              [`--${key}`]: colors.light[key],
            };
          }, {}),
        },
        ".dark": {
          ...Object.keys(colors.dark).reduce((acc, key) => {
            return {
              ...acc,
              [`--${key}`]: colors.dark[key],
            };
          }, {}),
        },
      });
    }
);
