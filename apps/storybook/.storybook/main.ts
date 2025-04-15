import { dirname, join } from "path"
import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: [
    "./welcome.stories.mdx",
    "../../../packages/components/**/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../packages/theme/stories/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("storybook-dark-mode"),
    getAbsolutePath("@storybook/experimental-addon-test"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
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
  features: {
    backgroundsStoryGlobals: true,
  },
  docs: {},
}

export default config

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")))
}
