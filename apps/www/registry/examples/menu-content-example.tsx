"use client"

import { Button, Menu, MenuItem, MenuTrigger } from "@opengovsg/oui"
import { useState } from "react"

const actions = [
  { id: "view", label: "View details" },
  { id: "edit", label: "Edit" },
  { id: "duplicate", label: "Duplicate" },
  { id: "archive", label: "Archive" },
  { id: "delete", label: "Delete" },
]

export default function MenuContentExample() {
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-2">
      <MenuTrigger>
        <Button variant="outline">Actions</Button>
        <Menu items={actions} onAction={(key) => setLastAction(String(key))}>
          {(item) => <MenuItem id={item.id}>{item.label}</MenuItem>}
        </Menu>
      </MenuTrigger>
      <p className="text-sm text-gray-600">
        Last action: {lastAction ?? "None"}
      </p>
    </div>
  )
}
