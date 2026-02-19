"use client"

import { MailIcon, Star, Wrench } from "lucide-react"

import { SidebarItem, SidebarList, SidebarRoot } from "@opengovsg/oui"

export default function SidebarOnlyCaretToggle() {
  return (
    <SidebarRoot>
      <SidebarItem
        startContent={<MailIcon />}
        onPress={() => alert("Inbox clicked")}
        tooltip="Go to Inbox"
      >
        Inbox
      </SidebarItem>
      <SidebarList
        onlyCaretToggle
        label="Clicking this will not expand/collapse the section"
        startContent={<Wrench />}
        onPress={() =>
          alert(
            "onPress/href will be triggered instead. Click the caret to expand/collapse.",
          )
        }
      >
        <SidebarItem
          onPress={() => alert("General clicked")}
          tooltip="Go to General"
        >
          General
        </SidebarItem>
        <SidebarItem
          onPress={() => alert("Security clicked")}
          tooltip="Go to Security"
        >
          Security
        </SidebarItem>
      </SidebarList>
      <SidebarList defaultIsExpanded label="Favorites" startContent={<Star />}>
        <SidebarItem
          onPress={() => alert("Dashboard clicked")}
          tooltip="Go to Dashboard"
        >
          Dashboard
        </SidebarItem>
        <SidebarItem
          onPress={() => alert("Reports clicked")}
          tooltip="Go to Reports"
        >
          Reports
        </SidebarItem>
      </SidebarList>
    </SidebarRoot>
  )
}
