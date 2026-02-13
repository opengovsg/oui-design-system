"use client"

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

import type { SidebarProps } from "@opengovsg/oui"
import { Sidebar } from "@opengovsg/oui"

const items: SidebarProps["items"] = [
  { type: "header", children: "Mail" },
  {
    startContent: <MailIcon />,
    href: "#",
    children: "Inbox",
    tooltip: "Inbox",
  },
  {
    children: "Starred",
    startContent: <Star />,
    href: "#",
    tooltip: "Starred",
  },
  {
    children: "Activity",
    startContent: <Calendar />,
    href: "#",
    tooltip: "Activity",
  },
  {
    children: "Explore",
    startContent: <Link />,
    href: "#",
    tooltip: "Explore",
  },
  {
    label: "Settings",
    startContent: <Wrench />,
    defaultIsExpanded: true,
    subItems: [
      {
        tooltip: "Profile",
        startContent: <User />,
        children: "Profile",
        href: "#",
      },
      {
        tooltip: "Security & Privacy",
        children: "Security & Privacy",
        startContent: <Trash />,
        href: "#",
      },
      {
        tooltip: "Notifications",
        children: "Notifications",
        startContent: <Clock5 />,
        href: "#",
      },
    ],
  },
]

export default function SidebarCollapsed() {
  return <Sidebar items={items} isCollapsed />
}
