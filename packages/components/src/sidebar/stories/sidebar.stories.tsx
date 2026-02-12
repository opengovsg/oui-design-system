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
import { SidebarList } from "../sidebar-list"
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
    tooltip: "Go to Inbox",
  },
  {
    children: "Notes",
    startContent: <Star />,
    onPress: () => alert("Notes"),
    tooltip: "Go to Notes",
  },
  {
    children: "Activity",
    startContent: <Calendar />,
    tooltip: "Go to Activity",
  },
  {
    children: "Explore",
    startContent: <Link />,
    tooltip: "Go to Explore",
  },
  {
    label: "Settings",
    startContent: <Wrench />,
    defaultIsExpanded: true,
    subItems: [
      {
        tooltip: "Go to Profile",
        startContent: <User />,
        children: "Profile",
      },
      {
        tooltip: "Go to Security & Privacy",
        children: "Security & Privacy",
        startContent: <Trash />,

        isSelected: true,
      },
      {
        tooltip: "Go to Notifications",
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

export const OnlyCaretToggle = {
  render: () => (
    <SidebarRoot>
      <SidebarItem>Child</SidebarItem>
      <SidebarList
        onlyCaretToggle
        label="Clicking this will not toggle the list, will need to click the caret"
      >
        <SidebarItem>Child item</SidebarItem>
      </SidebarList>
      <SidebarList defaultIsExpanded label="Default expanded">
        <SidebarItem onPress={() => alert("This could be a link too")}>
          Child button example
        </SidebarItem>
        <SidebarItem href="https://open.gov.sg">Child link example</SidebarItem>
      </SidebarList>
    </SidebarRoot>
  ),
}

export const Collapsed: Story = {
  args: {
    items: DEFAULT_ITEMS,
    isCollapsed: true,
  },
}
