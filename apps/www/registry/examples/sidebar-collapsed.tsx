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
    onPress: () => alert("Inbox clicked"),
    children: "Inbox",
    tooltip: "Inbox",
  },
  {
    children: "Starred",
    startContent: <Star />,
    onPress: () => alert("Starred clicked"),
    tooltip: "Starred",
  },
  {
    children: "Activity",
    startContent: <Calendar />,
    onPress: () => alert("Activity clicked"),
    tooltip: "Activity",
  },
  {
    children: "Explore",
    startContent: <Link />,
    onPress: () => alert("Explore clicked"),
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
        onPress: () => alert("Profile clicked"),
      },
      {
        tooltip: "Security & Privacy",
        children: "Security & Privacy",
        startContent: <Trash />,
        onPress: () => alert("Security & Privacy clicked"),
      },
      {
        tooltip: "Notifications",
        children: "Notifications",
        startContent: <Clock5 />,
        onPress: () => alert("Notifications clicked"),
      },
    ],
  },
]

export default function SidebarCollapsed() {
  return <Sidebar items={items} isCollapsed />
}
