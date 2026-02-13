"use client"

import { Calendar, MailIcon, Star } from "lucide-react"

import type { SidebarProps } from "@opengovsg/oui"
import { Sidebar } from "@opengovsg/oui"

const items: SidebarProps["items"] = [
  {
    startContent: <MailIcon />,
    href: "#",
    children: "Inbox",
    tooltip: "Go to Inbox",
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
