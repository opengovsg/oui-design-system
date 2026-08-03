"use client"

import type { SidebarProps } from "@opengovsg/oui"
import { Button, Sidebar } from "@opengovsg/oui"
import {
  Calendar,
  Link,
  MailIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Star,
} from "lucide-react"
import { useState } from "react"

const items: SidebarProps["items"] = [
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
