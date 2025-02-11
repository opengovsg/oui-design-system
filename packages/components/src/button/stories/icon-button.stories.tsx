import type { Meta, StoryObj } from "@storybook/react"
import { HeadphonesIcon } from "lucide-react"

import type { ButtonProps } from "../button"
import { Button } from "../button"
import buttonMeta from "./button.stories"

export default {
  title: "Components/Button/IconButton",
  parameters: {
    docs: {
      description: {
        component:
          "To get an icon button, just use the `Button` component with the `isIconOnly` prop set to `true`.",
      },
    },
  },
  component: Button,
  argTypes: {
    isIconOnly: {
      control: {
        type: "boolean",
      },
    },
    ...buttonMeta.argTypes,
  },
  args: {
    ...buttonMeta.args,
    children: <HeadphonesIcon />,
    isIconOnly: true,
    "aria-label": "Example icon button",
  },
} as Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Sizes: Story = {
  render: (args: ButtonProps) => {
    return (
      <div className="space-x-4">
        <Button {...args} size="xs" />
        <Button {...args} size="sm" />
        <Button {...args} size="md" />
        <Button {...args} size="lg" />
      </div>
    )
  },
}

function ColorTemplate(args: ButtonProps) {
  return (
    <div className="space-y-4">
      <div className="space-x-4">
        <Button {...args} color="main" />
        <Button {...args} color="success" />
        <Button {...args} color="warning" />
        <Button {...args} color="critical" />
        <Button {...args} color="sub" />
        <Button {...args} color="neutral" />
        <Button {...args} color="inverse" />
      </div>
      <div className="space-x-4">
        <Button {...args} color="main" isDisabled />
        <Button {...args} color="success" isDisabled />
        <Button {...args} color="warning" isDisabled />
        <Button {...args} color="critical" isDisabled />
        <Button {...args} color="sub" isDisabled />
        <Button {...args} color="neutral" isDisabled />
        <Button {...args} color="inverse" isDisabled />
      </div>
      <div className="space-x-4">
        <Button {...args} color="main" isPending />
        <Button {...args} color="success" isPending />
        <Button {...args} color="warning" isPending />
        <Button {...args} color="critical" isPending />
        <Button {...args} color="sub" isPending />
        <Button {...args} color="neutral" isPending />
        <Button {...args} color="inverse" isPending />
      </div>
    </div>
  )
}

export const SolidColors: Story = {
  render: ColorTemplate,
  args: {
    variant: "solid",
  },
}

export const OutlineColors: Story = {
  render: ColorTemplate,
  args: {
    variant: "outline",
  },
}

export const ClearColors: Story = {
  render: ColorTemplate,
  args: {
    variant: "clear",
  },
}

export const ReverseColors: Story = {
  render: ColorTemplate,
  args: {
    variant: "reverse",
  },
}

export const DisableRipple: Story = {
  args: {
    disableRipple: true,
  },
}

export const CustomWithClassNames: Story = {
  args: {
    radius: "full",
    className:
      "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
  },
}
