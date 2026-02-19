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
        onPress: () => alert("Profile clicked"),
      },
      {
        tooltip: "Go to Security & Privacy",
        children: "Security & Privacy",
        startContent: <Trash />,
        onPress: () => alert("Security & Privacy clicked"),
        isSelected: true,
      },
      {
        tooltip: "Go to Notifications",
        children: "Notifications",
        startContent: <Clock5 />,
        onPress: () => alert("Notifications clicked"),
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
        onPress: () => alert("Billing clicked"),
      },
      {
        tooltip: "Go to Usage",
        children: "Usage",
        onPress: () => alert("Usage clicked"),
      },
    ],
  },
]

export default function SidebarCollapsibleSections() {
  return <Sidebar items={items} />
}
