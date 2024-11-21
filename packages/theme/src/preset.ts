import type { Config } from "tailwindcss";
import racPlugin from "tailwindcss-react-aria-components";

/**
 * Preset to set design tokens and plugins for the design system.
 */
export const basePreset: Config = {
  content: [],
  safelist: ["dark"],
  theme: {
    textColor: {
      content: {
        fg: "rgb(var(--content-fg))",
      },
    },
    backgroundColor: {
      default: "rgb(var(--bg-default))",
      alt: "rgb(var(--bg-alt))",
      brand: "rgb(var(--bg-brand))",
      inverse: "rgb(var(--bg-inverse))",
      system: {
        disabled: "rgb(var(--bg-system-disabled))",
        tooltip: "rgb(var(--bg-system-tooltip))",
        input: "rgb(var(--bg-system-input))",
        "tab-container": {
          DEFAULT: "rgb(var(--bg-system-tab-container))",
          primary: "rgb(var(--bg-system-tab-container-primary))",
        },
      },
      primary: {
        DEFAULT: "rgb(var(--bg-primary-default))",
        subtle: "rgb(var(--bg-primary-subtle))",
        tinted: "rgb(var(--bg-primary-tinted))",
      },
      neutral: {
        subtle: "rgb(var(--bg-neutral-subtle))",
        tinted: "rgb(var(--bg-neutral-tinted))",
      },
      danger: {
        DEFAULT: "rgb(var(--bg-danger))",
        subtle: "rgb(var(--bg-danger-subtle))",
      },
      warning: {
        DEFAULT: "rgb(var(--bg-warning))",
        subtle: "rgb(var(--bg-warning-subtle))",
      },
      success: {
        DEFAULT: "rgb(var(--bg-success))",
        subtle: "rgb(var(--bg-success-subtle))",
      },
    },
  },
  plugins: [racPlugin],
};
