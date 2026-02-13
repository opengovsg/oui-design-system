"use client"

import { Calendar, MailIcon, Star, Wrench } from "lucide-react"

import {
  SidebarHeader,
  SidebarItem,
  SidebarList,
  SidebarRoot,
} from "@opengovsg/oui"

export default function SidebarComposition() {
  return (
    <SidebarRoot>
      <SidebarHeader>Mail</SidebarHeader>
      <SidebarItem
        isSelected
        startContent={<MailIcon />}
        href="#"
        tooltip="Go to Inbox"
      >
        Inbox
      </SidebarItem>
      <SidebarItem startContent={<Star />} href="#" tooltip="Go to Starred">
        Starred
      </SidebarItem>
      <SidebarItem
        startContent={<Calendar />}
        href="#"
        tooltip="Go to Activity"
      >
        Activity
      </SidebarItem>
      <SidebarList defaultIsExpanded label="Settings" startContent={<Wrench />}>
        <SidebarItem href="#" tooltip="Go to General">
          General
        </SidebarItem>
        <SidebarItem href="#" tooltip="Go to Security">
          Security
        </SidebarItem>
      </SidebarList>
    </SidebarRoot>
  )
}
