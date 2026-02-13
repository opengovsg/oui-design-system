"use client"

import { useState } from "react"
import {
  Calendar,
  Link,
  MailIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Star,
} from "lucide-react"

import type { SidebarProps } from "@opengovsg/oui"
import { Button, Sidebar } from "@opengovsg/oui"

const items: SidebarProps["items"] = [
  {
    startContent: <MailIcon />,
    href: "#",
    children: "Inbox",
    tooltip: "Inbox",
  },
  {
    children: "Starred",
    startContent: <Star />,
    href: "#",
    tooltip: "Starred",
  },
  {
    children: "Activity",
    startContent: <Calendar />,
    href: "#",
    tooltip: "Activity",
  },
  {
    children: "Explore",
    startContent: <Link />,
    href: "#",
    tooltip: "Explore",
  },
]

export default function SidebarControlled() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onPress={() => setIsCollapsed((prev) => !prev)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </Button>
        <Sidebar
          items={items}
          isCollapsed={isCollapsed}
          onCollapsedChange={setIsCollapsed}
        />
      </div>
    </div>
  )
}
