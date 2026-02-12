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
import { SidebarHeader } from "../sidebar-header"
import { SidebarItem } from "../sidebar-item"
import { SidebarRoot } from "../sidebar-root"

export default {
  title: "Components/Sidebar",
  component: Sidebar,
} as Meta<typeof Sidebar>

type Story = StoryObj<typeof Sidebar>

const DEFAULT_ITEMS: SidebarProps["items"] = [
  { type: "header", children: "Header" },
  {
    startContent: <MailIcon />,
    href: "#",
    children: "Inbox",
  },
  { children: "Notes", startContent: <Star />, onPress: () => alert("Notes") },
  { children: "Activity", startContent: <Calendar /> },
  { children: "Explore", startContent: <Link /> },
  {
    label: "Settings",
    startContent: <Wrench />,
    defaultIsExpanded: true,
    isSelected: true,
    subItems: [
      {
        startContent: <User />,
        children: "Profile",
      },
      {
        children: "Security & Privacy",
        startContent: <Trash />,

        isSelected: true,
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

export const BuildByComponents = {
  render: () => (
    <SidebarRoot>
      <SidebarHeader>Header</SidebarHeader>
      <SidebarItem isSelected startContent={<Star />}>
        Item 1
      </SidebarItem>
      <SidebarItem startContent={<Star />}>Item 2</SidebarItem>
      <SidebarItem startContent={<Star />}>Item 3</SidebarItem>
      <SidebarItem startContent={<Star />}>Item 4</SidebarItem>
      <SidebarItem startContent={<Star />}>Item 5</SidebarItem>
    </SidebarRoot>
  ),
}
