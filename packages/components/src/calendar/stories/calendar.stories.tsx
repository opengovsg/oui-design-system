import type { Meta, StoryObj } from "@storybook/react"

import { Calendar } from "../calendar"

export default {
  title: "Components/Calendar",
  component: Calendar,
} as Meta<typeof Calendar>

type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  args: {
    classNames: {
      cell: "w-9 h-9 text-sm cursor-default rounded-full flex items-center justify-center forced-color-adjust-none selected:bg-slate-400",
    },
  },
}
