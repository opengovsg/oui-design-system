"use client"

import { Button, Menu, MenuItem, MenuTrigger } from "@opengovsg/oui"

export default function MenuCustomStyles() {
  return (
    <MenuTrigger>
      <Button variant="outline">Options</Button>
      <Menu
        classNames={{
          base: "rounded-xl border border-blue-200 bg-blue-50",
          popover: "shadow-xl",
        }}
      >
        <MenuItem
          id="profile"
          classNames={{
            container: "hover:bg-blue-100",
            label: "font-semibold text-blue-900",
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          id="settings"
          classNames={{
            container: "hover:bg-blue-100",
            label: "font-semibold text-blue-900",
          }}
        >
          Settings
        </MenuItem>
        <MenuItem
          id="logout"
          classNames={{
            container: "hover:bg-red-100",
            label: "font-semibold text-red-700",
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
