"use client"

import {
  SidebarHeader,
  SidebarItem,
  SidebarList,
  SidebarRoot,
} from "@opengovsg/oui"
import { Calendar, MailIcon, Star, Wrench } from "lucide-react"

export default function SidebarComposition() {
  return (
    <SidebarRoot>
      <SidebarHeader>Mail</SidebarHeader>
      <SidebarItem
        isSelected
        startContent={<MailIcon />}
        onPress={() => alert("Inbox clicked")}
        tooltip="Go to Inbox"
      >
        Inbox
      </SidebarItem>
      <SidebarItem
        startContent={<Star />}
        onPress={() => alert("Starred clicked")}
        tooltip="Go to Starred"
      >
        Starred
      </SidebarItem>
      <SidebarItem
        startContent={<Calendar />}
        onPress={() => alert("Activity clicked")}
        tooltip="Go to Activity"
      >
        Activity
      </SidebarItem>
      <SidebarList defaultIsExpanded label="Settings" startContent={<Wrench />}>
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
    </SidebarRoot>
  )
}
