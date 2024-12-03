import type { Config } from "tailwindcss";
import racPlugin from "tailwindcss-react-aria-components";
import { animations } from "./animations";

/**
 * Preset to set design tokens and plugins for the design system.
 */
export const basePreset: Config = {
  content: [],
  safelist: ["dark"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
        1.5: "1.5px",
        3: "3px",
        5: "5px",
      },
      animation: animations.animation,
      keyframes: animations.keyframes,
      textColor: {
        content: {
          fg: "rgb(var(--content-fg))",
        },
      },
      outlineColor: {
        focus: "rgb(var(--outline-focus))",
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
          hover: "rgb(var(--bg-primary-hover))",
          active: "rgb(var(--bg-primary-active))",
          subtle: {
            DEFAULT: "rgb(var(--bg-primary-subtle))",
            hover: "rgb(var(--bg-primary-subtle-hover))",
            active: "rgb(var(--bg-primary-subtle-active))",
          },
          tinted: {
            DEFAULT: "rgb(var(--bg-primary-tinted))",
            hover: "rgb(var(--bg-primary-tinted-hover))",
            active: "rgb(var(--bg-primary-tinted-active))",
          },
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
  },
  plugins: [racPlugin],
};
