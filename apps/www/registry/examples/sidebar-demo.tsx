"use client"

import { Calendar, Link, MailIcon, Star } from "lucide-react"

import type { SidebarProps } from "@opengovsg/oui"
import { Sidebar } from "@opengovsg/oui"

const items: SidebarProps["items"] = [
  { type: "header", children: "Mail" },
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
  {
    children: "Explore",
    startContent: <Link />,
    href: "#",
    tooltip: "Go to Explore",
  },
]

export default function SidebarDemo() {
  return <Sidebar items={items} />
}
