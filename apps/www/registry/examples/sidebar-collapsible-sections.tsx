"use client"

import { Clock5, Trash, User, Wrench } from "lucide-react"

import type { SidebarProps } from "@opengovsg/oui"
import { Sidebar } from "@opengovsg/oui"

const items: SidebarProps["items"] = [
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
      {
        tooltip: "Go to Security & Privacy",
        children: "Security & Privacy",
        startContent: <Trash />,
        href: "#",
        isSelected: true,
      },
      {
        tooltip: "Go to Notifications",
        children: "Notifications",
        startContent: <Clock5 />,
        href: "#",
      },
    ],
  },
  {
    label: "Account",
    startContent: <User />,
    subItems: [
      {
        tooltip: "Go to Billing",
        children: "Billing",
        href: "#",
      },
      {
        tooltip: "Go to Usage",
        children: "Usage",
        href: "#",
      },
    ],
  },
]

export default function SidebarCollapsibleSections() {
  return <Sidebar items={items} />
}
