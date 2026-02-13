"use client"

import {
  Calendar,
  Link,
  MailIcon,
  Menu,
  Star,
  User,
  Wrench,
} from "lucide-react"
import { DialogTrigger } from "react-aria-components"

import type { SidebarProps } from "@opengovsg/oui"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Sidebar,
} from "@opengovsg/oui"

const items: SidebarProps["items"] = [
  { type: "header", children: "Mail" },
  {
    startContent: <MailIcon />,
    href: "#",
    children: "Inbox",
    tooltip: "Go to Inbox",
    isSelected: true,
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
  {
    label: "Settings",
    startContent: <Wrench />,
    defaultIsExpanded: true,
    subItems: [
      {
        tooltip: "Go to Profile",
        startContent: <User />,
        children: "Profile",
        href: "#",
      },
    ],
  },
]

export default function SidebarInDrawer() {
  return (
    <DialogTrigger>
      <Button variant="outline" aria-label="Open navigation">
        <Menu />
        Menu
      </Button>
      <Modal
        isDismissable
        animation="slide-start"
        placement="start"
        classNames={{
          base: "m-0 h-full max-h-full max-w-70 rounded-none sm:mx-0 sm:my-0",
        }}
      >
        <ModalContent>
          <ModalHeader>Navigation</ModalHeader>
          <ModalBody className="px-0">
            <Sidebar items={items} size="sm" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </DialogTrigger>
  )
}
