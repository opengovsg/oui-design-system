"use client"

import type { SidebarProps } from "@opengovsg/oui"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Sidebar,
} from "@opengovsg/oui"
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

const items: SidebarProps["items"] = [
  { type: "header", children: "Mail" },
  {
    startContent: <MailIcon />,
    onPress: () => alert("Inbox clicked"),
    children: "Inbox",
    tooltip: "Go to Inbox",
    isSelected: true,
  },
  {
    children: "Starred",
    startContent: <Star />,
    onPress: () => alert("Starred clicked"),
    tooltip: "Go to Starred",
  },
  {
    children: "Activity",
    startContent: <Calendar />,
    onPress: () => alert("Activity clicked"),
    tooltip: "Go to Activity",
  },
  {
    children: "Explore",
    startContent: <Link />,
    onPress: () => alert("Explore clicked"),
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
        onPress: () => alert("Profile clicked"),
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
