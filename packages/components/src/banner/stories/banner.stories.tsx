import type { Meta, StoryObj } from "@storybook/react"
import { withChromaticModes } from "@oui/chromatic"

import { Banner } from "../banner"

export default {
  title: "Components/Banner",
  component: Banner,
  args: {},
} as Meta<typeof Banner>

type Story = StoryObj<typeof Banner>

export const Default: Story = {
  args: {
    children:
      "Singpass will be undergoing scheduled maintenance on Sunday 23rd August 1990 from 12am-4am.",
  },
}

export const IsDismissable: Story = {
  args: {
    isDismissable: true,
    children: "This banner can be dismissed.",
  },
}

export const SizesAndVariants: Story = {
  args: {
    isDismissable: true,
  },
  parameters: {
    chromatic: withChromaticModes,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Banner {...args} variant="info" size="sm">
          This is a small banner with some text.
        </Banner>
        <Banner {...args} variant="warning" size="sm">
          This is a small banner with some text.
        </Banner>
        <Banner {...args} variant="error" size="sm">
          This is a small banner with some text.
        </Banner>
      </div>
      <div className="flex flex-col gap-1">
        <Banner {...args} variant="info" size="md">
          This is a medium banner with some text.
        </Banner>
        <Banner {...args} variant="warning" size="md">
          This is a medium banner with some text.
        </Banner>
        <Banner {...args} variant="error" size="md">
          This is a medium banner with some text.
        </Banner>
      </div>
    </div>
  ),
}

export const CustomStartContent: Story = {
  args: {
    startContent: "🎉",
    children: "This banner has custom start content.",
  },
}
