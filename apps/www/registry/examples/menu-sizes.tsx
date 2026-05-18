"use client"

import { Button, Menu, MenuItem, MenuTrigger } from "@opengovsg/oui"

export default function MenuSizes() {
  return (
    <div className="flex gap-4">
      {(["xs", "sm", "md"] as const).map((size) => (
        <MenuTrigger key={size}>
          <Button variant="outline" size={size}>
            {size.toUpperCase()}
          </Button>
          <Menu size={size}>
            <MenuItem id="new">New</MenuItem>
            <MenuItem id="open">Open</MenuItem>
            <MenuItem id="save">Save</MenuItem>
          </Menu>
        </MenuTrigger>
      ))}
    </div>
  )
}
