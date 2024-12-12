import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: [
    "./welcome.stories.mdx",
    "../../../packages/components/**/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../packages/theme/stories/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  viteFinal(viteConfig) {
    // customize the Vite config here
    return {
      ...viteConfig,
      define: { "process.env": {} },
      resolve: {
        alias: [],
      },
    }
  },

  docs: {},
}

export default config
