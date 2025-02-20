import type { Meta, StoryObj } from "@storybook/react"
import { TagField } from "../tag-field"

export default {
  title: "Components/TagField",
  component: TagField,
} as Meta<typeof TagField>

type Story = StoryObj<typeof TagField>

export const Default: Story = {
  args: {},
}
