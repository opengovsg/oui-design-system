"use client"

import type { SidebarProps } from "@opengovsg/oui"
import { Sidebar } from "@opengovsg/oui"
import { Calendar, MailIcon, Star, User, Wrench } from "lucide-react"

const items: SidebarProps["items"] = [
  {
    startContent: <MailIcon />,
    onPress: () => alert("Inbox clicked"),
    children: "Inbox",
    tooltip: "Go to Inbox",
    isSelected: true,
  },
  {
    children: "Starred",
    startContent: <Star />,
    onPress: () => alert("Starred clicked"),
    tooltip: "Go to Starred",
  },
  {
    children: "Activity",
    startContent: <Calendar />,
    onPress: () => alert("Activity clicked"),
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
        onPress: () => alert("Profile clicked"),
      },
    ],
  },
]

export default function SidebarSelected() {
  return <Sidebar items={items} />
}
