import type { Meta, StoryObj } from "@storybook/react"
import { CheckIcon } from "lucide-react"

import { Badge } from "../badge"

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "subtle", "outline", "dot"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["main", "sub", "success", "warning", "critical"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    isCloseable: {
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    children: "Badge",
  },
} as Meta<typeof Badge>

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {},
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}

export const StartContent = {
  args: {
    startContent: (
      <span aria-label="celebration" className="ml-1" role="img">
        🎉
      </span>
    ),
  },
}

export const EndContent = {
  args: {
    endContent: (
      <span aria-label="rocket" className="mr-1" role="img">
        🚀
      </span>
    ),
  },
}

export const Closeable = {
  args: {
    onClose: () => console.log("Close"),
  },
}

export const CustomCloseIcon = {
  args: {
    endContent: <CheckIcon />,
    onClose: () => console.log("Close"),
  },
}

export const Sizes: Story = {
  render: ({ children, ...args }) => {
    return (
      <div className="space-x-4">
        <Badge {...args} size="xs">
          {children} xs
        </Badge>
        <Badge {...args} size="sm">
          {children} sm
        </Badge>
        <Badge {...args} size="md">
          {children} md
        </Badge>
        <Badge {...args} size="lg">
          {children} lg
        </Badge>
      </div>
    )
  },
}
