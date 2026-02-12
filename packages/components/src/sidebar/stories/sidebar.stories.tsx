import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Calendar,
  Clock5,
  Link,
  MailIcon,
  Star,
  Trash,
  User,
  Wrench,
} from "lucide-react"

import type { SidebarProps } from "../sidebar"
import { Sidebar } from "../sidebar"

export default {
  title: "Components/Sidebar",
  component: Sidebar,
} as Meta<typeof Sidebar>

type Story = StoryObj<typeof Sidebar>

const DEFAULT_ITEMS: SidebarProps["items"] = [
  { type: "header", children: "Header" },
  {
    startContent: <MailIcon />,
    children: () => <a href="#">Inbox</a>,
  },
  { children: "Notes", startContent: <Star /> },
  { children: "Activity", startContent: <Calendar /> },
  { children: "Explore", startContent: <Link /> },
  {
    label: "Settings",
    startContent: <Wrench />,
    defaultIsExpanded: true,
    isActive: true,
    subItems: [
      {
        startContent: <User />,
        children: "Profile",
      },
      {
        children: "Security & Privacy",
        startContent: <Trash />,

        isActive: true,
      },
      {
        children:
          "Notifications With Long Label That Definitely Overflows In Mobile",
        startContent: <Clock5 />,
      },
    ],
  },
]

export const Default: Story = {
  args: {
    items: DEFAULT_ITEMS,
  },
}
