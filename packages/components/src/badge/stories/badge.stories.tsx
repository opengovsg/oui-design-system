import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bell, CheckIcon } from "lucide-react"

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
      options: ["xs", "sm"],
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
    onClose: undefined,
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
    startContent: <Bell className="size-3" />,
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

const SizesTemplate: Story["render"] = ({ children, ...args }) => {
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
    </div>
  )
}

const ColorsTemplate: Story["render"] = (args) => {
  return (
    <div className="space-x-4">
      <Badge {...args} color="main">
        Main
      </Badge>
      <Badge {...args} color="sub">
        Sub
      </Badge>
      <Badge {...args} color="neutral">
        Neutral
      </Badge>
      <Badge {...args} color="success">
        Success
      </Badge>
      <Badge {...args} color="warning">
        Warning
      </Badge>
      <Badge {...args} color="critical">
        Critical
      </Badge>
    </div>
  )
}

export const SolidColors: Story = {
  args: {
    variant: "solid",
  },
  render: ColorsTemplate,
}

export const SolidSizes: Story = {
  args: {
    variant: "solid",
    isCloseable: true,
  },
  render: SizesTemplate,
}

export const SubtleColors: Story = {
  args: {
    variant: "subtle",
  },
  render: ColorsTemplate,
}

export const SubtleSizes: Story = {
  args: {
    variant: "subtle",
  },
  render: SizesTemplate,
}

export const OutlineColors: Story = {
  args: {
    variant: "outline",
  },
  render: ColorsTemplate,
}

export const OutlineSizes: Story = {
  args: {
    variant: "outline",
  },
  render: SizesTemplate,
}

export const DotColors: Story = {
  args: {
    variant: "dot",
  },
  render: ColorsTemplate,
}

export const DotSizes: Story = {
  args: {
    variant: "dot",
  },
  render: SizesTemplate,
}
