import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "../input"

export default {
  title: "Components/Input",
  component: Input,
} as Meta<typeof Input>

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: "test placeholder" },
}

export const Sizes: Story = {
  render(args) {
    return (
      <div className="space-y-4">
        <Input {...args} placeholder="xs" size="xs" />
        <Input {...args} placeholder="sm" size="sm" />
        <Input {...args} placeholder="md" size="md" />
      </div>
    )
  },
}
