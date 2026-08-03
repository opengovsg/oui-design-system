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
]

export default function SidebarCustomTooltip() {
  return (
    <Sidebar
      items={items}
      isCollapsed
      tooltipProps={{
        placement: "right",
        offset: 8,
        className:
          "bg-base-canvas-default prose-label-3 text-base-content-strong rounded-md border px-2.5 py-1.5 shadow-md",
      }}
      tooltipTriggerProps={{ delay: 200 }}
    />
  )
}
