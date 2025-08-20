import type { Meta, StoryObj } from "@storybook/react-vite"
import { HelpCircle } from "lucide-react"
import { Dialog, DialogTrigger, Heading } from "react-aria-components"

import type { PopoverProps } from "../popover"
import { Button } from "../../button"
import { Popover } from "../popover"

export default {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    // This option disables all automatic a11y checks on this story,
    // since the popover transitions are causing false positives
    a11y: { test: "todo" },
  },
} as Meta<typeof Popover>

type Story = StoryObj<typeof Popover>

const Template = (args: PopoverProps) => {
  return (
    <DialogTrigger>
      <Button isIconOnly aria-label="Help">
        <HelpCircle className="size-4" />
      </Button>
      <Popover {...args} className="max-w-[250px] p-2">
        <Dialog>
          <Heading slot="title" className="mb-2 text-lg font-semibold">
            Help
          </Heading>
          <p className="text-sm">
            For help accessing your account, please contact support.
          </p>
        </Dialog>
      </Popover>
    </DialogTrigger>
  )
}

export const Example: Story = {
  args: {},
  render: Template,
}

export const WithArrow: Story = {
  args: {
    showArrow: true,
  },
  render: Template,
}
