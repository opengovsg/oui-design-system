"use client"

import { Calendar, MailIcon, Star, User, Wrench } from "lucide-react"

import type { SidebarProps } from "@opengovsg/oui"
import { Sidebar } from "@opengovsg/oui"

const items: SidebarProps["items"] = [
  {
    startContent: <MailIcon />,
    href: "#",
    children: "Inbox",
    tooltip: "Go to Inbox",
    isSelected: true,
  },
  {
    children: "Starred",
    startContent: <Star />,
    href: "#",
    tooltip: "Go to Starred",
  },
  {
    children: "Activity",
    startContent: <Calendar />,
    href: "#",
    tooltip: "Go to Activity",
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
        href: "#",
      },
    ],
  },
]

export default function SidebarSelected() {
  return <Sidebar items={items} />
}
