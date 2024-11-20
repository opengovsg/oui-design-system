import type { Config } from "tailwindcss";
import racPlugin from "tailwindcss-react-aria-components";

export const config: Config = {
  content: [],
  theme: {
    textColor: {
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
      default: "var(--color-text-default)",
      "default-soft": "var(--color-text-default-soft)",
      inverse: "var(--color-text-inverse)",
      "inverse-soft": "var(--color-text-inverse-soft)",
    },
    backgroundColor: {
      default: "var(--color-bg-default)",
      alt: "var(--color-bg-alt)",
      brand: "var(--color-bg-brand)",
      inverse: "var(--color-bg-inverse)",
      system: {
        disabled: "var(--color-bg-system-disabled)",
        tooltip: "var(--color-bg-system-tooltip)",
        input: "var(--color-bg-system-input)",
        "tab-container": {
          DEFAULT: "var(--color-bg-system-tab-container)",
          primary: "var(--color-bg-system-tab-container-primary)",
        },
      },
      primary: {
        DEFAULT: "var(--background-primary-default)",
        subtle: "var(--background-primary-subtle)",
        tinted: "var(--color-bg-primary-tinted)",
      },
      neutral: {
        subtle: "var(--color-bg-neutral-subtle)",
        tinted: "var(--color-bg-neutral-tinted)",
      },
      danger: {
        DEFAULT: "var(--color-bg-danger)",
        subtle: "var(--color-bg-danger-subtle)",
      },
      warning: {
        DEFAULT: "var(--color-bg-warning)",
        subtle: "var(--color-bg-warning-subtle)",
      },
      success: {
        DEFAULT: "var(--color-bg-success)",
        subtle: "var(--color-bg-success-subtle)",
      },
    },
  },
  plugins: [racPlugin],
};
