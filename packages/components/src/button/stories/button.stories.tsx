import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { AlertTriangle, User2Icon } from "lucide-react"

import type { ButtonProps } from "../button"
import { Button } from "../button"

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "outline", "clear", "reverse"],
    },
    loadingText: {
      control: {
        type: "text",
      },
    },
    layout: {
      control: {
        type: "select",
      },
      options: ["stretch", "default"],
    },
    color: {
      control: {
        type: "select",
      },
      options: [
        "main",
        "success",
        "warning",
        "critical",
        "sub",
        "neutral",
        "inverse",
      ],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "md", "lg"],
    },
    spinnerPlacement: {
      control: {
        type: "select",
      },
      options: ["start", "end"],
    },
    isPending: {
      control: {
        type: "boolean",
      },
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    children: "Button",
  },
} as Meta<typeof Button>

type Story = StoryObj<typeof Button>

function StateTemplate(args: ButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handlePress = () => {
    console.log("Pressed")
    setIsOpen((prev) => !prev)
  }

  return (
    <Button
      {...args}
      aria-label="Open"
      aria-pressed={isOpen}
      onPress={handlePress}
    >
      {isOpen ? "Close" : "Open"}
    </Button>
  )
}

export const Default: Story = {}

export const Sizes: Story = {
  render: (args: ButtonProps) => {
    return (
      <div className="space-x-4">
        <Button {...args} size="xs">
          Extra Small
        </Button>
        <Button {...args} size="sm">
          Small
        </Button>
        <Button {...args} size="md">
          Medium
        </Button>
        <Button {...args} size="lg">
          Large
        </Button>
      </div>
    )
  },
  args: {},
}

function ColorTemplate(args: ButtonProps) {
  return (
    <div className="space-y-4">
      <div className="space-x-4">
        <Button {...args} color="main">
          Main
        </Button>
        <Button {...args} color="success">
          Success
        </Button>
        <Button {...args} color="warning">
          Warning
        </Button>
        <Button {...args} color="critical">
          Critical
        </Button>
        <Button {...args} color="sub">
          Sub
        </Button>
        <Button {...args} color="neutral">
          Neutral
        </Button>
        <Button {...args} color="inverse">
          Inverse
        </Button>
      </div>
      <div className="space-x-4">
        <Button {...args} color="main" isDisabled>
          Main
        </Button>
        <Button {...args} color="success" isDisabled>
          Success
        </Button>
        <Button {...args} color="warning" isDisabled>
          Warning
        </Button>
        <Button {...args} color="critical" isDisabled>
          Critical
        </Button>
        <Button {...args} color="sub" isDisabled>
          Sub
        </Button>
        <Button {...args} color="neutral" isDisabled>
          Neutral
        </Button>
        <Button {...args} color="inverse" isDisabled>
          Inverse
        </Button>
      </div>
      <div className="space-x-4">
        <Button {...args} color="main" isPending>
          Main
        </Button>
        <Button {...args} color="success" isPending>
          Success
        </Button>
        <Button {...args} color="warning" isPending>
          Warning
        </Button>
        <Button {...args} color="critical" isPending>
          Critical
        </Button>
        <Button {...args} color="sub" isPending>
          Sub
        </Button>
        <Button {...args} color="neutral" isPending>
          Neutral
        </Button>
        <Button {...args} color="inverse" isPending>
          Inverse
        </Button>
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

export const WithState: Story = {
  render: StateTemplate,
  args: {},
}

export const WithLoadingText: Story = {
  args: {
    isPending: true,
    loadingText: "Loading",
  },
}

export const DisableRipple: Story = {
  args: {
    disableRipple: true,
  },
}

export const WithIcons: Story = {
  args: {
    startContent: <AlertTriangle />,
    endContent: <User2Icon />,
  },
}

export const CustomWithClassNames: Story = {
  args: {
    radius: "full",
    className:
      "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
  },
  parameters: {
    // This option disables all automatic a11y checks on this story,
    // since there are false positives, and is an example story anyways
    a11y: { test: "todo" },
  },
}
