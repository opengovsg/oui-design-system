"use client"

import { MailIcon, Star, Wrench } from "lucide-react"

import { SidebarItem, SidebarList, SidebarRoot } from "@opengovsg/oui"

export default function SidebarOnlyCaretToggle() {
  return (
    <SidebarRoot>
      <SidebarItem startContent={<MailIcon />} href="#" tooltip="Go to Inbox">
        Inbox
      </SidebarItem>
      <SidebarList
        onlyCaretToggle
        label="Settings"
        startContent={<Wrench />}
        href="#"
      >
        <SidebarItem href="#" tooltip="Go to General">
          General
        </SidebarItem>
        <SidebarItem href="#" tooltip="Go to Security">
          Security
        </SidebarItem>
      </SidebarList>
      <SidebarList defaultIsExpanded label="Favorites" startContent={<Star />}>
        <SidebarItem href="#" tooltip="Go to Dashboard">
          Dashboard
        </SidebarItem>
        <SidebarItem href="#" tooltip="Go to Reports">
          Reports
        </SidebarItem>
      </SidebarList>
    </SidebarRoot>
  )
}
