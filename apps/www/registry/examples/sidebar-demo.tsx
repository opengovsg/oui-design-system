"use client"

import type { SidebarProps } from "@opengovsg/oui"
import { Sidebar } from "@opengovsg/oui"
import { Calendar, Link, MailIcon, Star } from "lucide-react"

const items: SidebarProps["items"] = [
  { type: "header", children: "Mail" },
  {
    startContent: <MailIcon />,
    onPress: () => alert("Inbox clicked"),
    children: "Inbox",
    tooltip: "Go to Inbox",
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
    children: "Explore",
    startContent: <Link />,
    onPress: () => alert("Explore clicked"),
    tooltip: "Go to Explore",
  },
]

export default function SidebarDemo() {
  return <Sidebar items={items} />
}
