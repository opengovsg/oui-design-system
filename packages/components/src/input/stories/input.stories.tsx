import type { Meta, StoryObj } from "@storybook/react"

import { Input } from "../input"

export default {
  title: "Components/Input",
  component: Input,
} as Meta<typeof Input>

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: "test placeholder" },
}
