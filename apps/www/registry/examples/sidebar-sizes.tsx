"use client"

import { Calendar, MailIcon, Star } from "lucide-react"

import type { SidebarProps } from "@opengovsg/oui"
import { Sidebar } from "@opengovsg/oui"

const items: SidebarProps["items"] = [
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
]

export default function SidebarSizes() {
  return (
    <div className="flex gap-8">
      <div>
        <p className="prose-body-2 text-base-content-medium mb-2">
          Medium (default)
        </p>
        <Sidebar items={items} size="md" />
      </div>
      <div>
        <p className="prose-body-2 text-base-content-medium mb-2">Small</p>
        <Sidebar items={items} size="sm" />
      </div>
    </div>
  )
}
