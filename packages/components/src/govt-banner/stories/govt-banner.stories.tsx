import type { Meta, StoryObj } from "@storybook/react-vite"

import { GovtBanner } from "../govt-banner"

// TODO: Add viewport and locale modes for testing
export default {
  title: "Components/GovtBanner",
  component: GovtBanner,
  argTypes: {
    environment: {
      control: {
        type: "text",
      },
      options: ["staging", "production", "uat"],
    },
  },
} as Meta<typeof GovtBanner>

type Story = StoryObj<typeof GovtBanner>

export const Default: Story = {}

export const Expanded: Story = {
  args: {
    defaultExpanded: true,
  },
}

export const WithEnvironment: Story = {
  args: {
    environment: "staging",
  },
}

export const CustomPadding: Story = {
  args: {
    classNames: {
      banner: "px-20",
      mainContentContainer: "py-20",
    },
  },
}
