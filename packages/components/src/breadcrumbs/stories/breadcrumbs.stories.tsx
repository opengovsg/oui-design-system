import type { Meta, StoryObj } from "@storybook/react-vite"

import { Breadcrumb, Breadcrumbs } from "../breadcrumbs"

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
} as Meta<typeof Breadcrumbs>

type Story = StoryObj<typeof Breadcrumbs>

const Template = (args: Story["args"]) => {
  return (
    <Breadcrumbs {...args}>
      <Breadcrumb href="#">Home</Breadcrumb>
      <Breadcrumb href="#">React Aria</Breadcrumb>
      <Breadcrumb>Breadcrumbs</Breadcrumb>
    </Breadcrumbs>
  )
}

export const Default: Story = {
  render: Template,
}

export const CustomTypography: Story = {
  render: Template,
  args: {
    className: "prose-caption-1",
  },
}

export const SlashSeparator: Story = {
  render: Template,
  args: {
    separator: "slash",
  },
}
