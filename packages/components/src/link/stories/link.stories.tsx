import type { Meta, StoryObj } from "@storybook/react-vite"

import { Link } from "../link"

export default {
  title: "Components/Link",
  component: Link,
  args: {
    children: "This is a link",
    href: "#",
  },
} as Meta<typeof Link>

type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: {},
}

export const NeutralColor: Story = {
  args: {
    color: "neutral",
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}
