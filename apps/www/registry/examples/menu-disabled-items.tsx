"use client"

import { Button, Menu, MenuItem, MenuTrigger } from "@opengovsg/oui"

export default function MenuDisabledItems() {
  return (
    <MenuTrigger>
      <Button variant="outline">File</Button>
      <Menu disabledKeys={["save", "print"]}>
        <MenuItem id="new">New…</MenuItem>
        <MenuItem id="open">Open…</MenuItem>
        <MenuItem id="save">Save</MenuItem>
        <MenuItem id="print">Print…</MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
