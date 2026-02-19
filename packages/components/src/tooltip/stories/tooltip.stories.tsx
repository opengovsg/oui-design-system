import type { Meta, StoryObj } from "@storybook/react-vite"
import { Edit } from "lucide-react"

import { Button } from "../../button"
import { Tooltip, TooltipTrigger } from "../tooltip"

export default {
  title: "Components/Tooltip",
  component: Tooltip,
} as Meta<typeof Tooltip>

type Story = StoryObj<typeof Tooltip>

const Template = (args: Story["args"]) => (
  <TooltipTrigger delay={0} defaultOpen>
    <Button isIconOnly aria-label="Edit" color="sub">
      <Edit size={18} />
    </Button>
    <Tooltip placement="end" {...args}>
      Display tooltip content here this should be quite long
    </Tooltip>
  </TooltipTrigger>
)

export const Default: Story = {
  args: {},
  render: Template,
}

export const WithoutArrow: Story = {
  args: {
    showArrow: false,
  },
  render: Template,
}
