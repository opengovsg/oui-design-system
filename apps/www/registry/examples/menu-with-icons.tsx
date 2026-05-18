"use client"

import { Copy, Edit, Share, Trash2 } from "lucide-react"

import { Button, Menu, MenuItem, MenuTrigger } from "@opengovsg/oui"

export default function MenuWithIcons() {
  return (
    <MenuTrigger>
      <Button variant="outline">Actions</Button>
      <Menu>
        <MenuItem id="edit" startContent={<Edit className="h-4 w-4" />}>
          Edit
        </MenuItem>
        <MenuItem id="copy" startContent={<Copy className="h-4 w-4" />}>
          Copy
        </MenuItem>
        <MenuItem id="share" startContent={<Share className="h-4 w-4" />}>
          Share
        </MenuItem>
        <MenuItem
          id="delete"
          startContent={<Trash2 className="h-4 w-4 text-red-500" />}
        >
          Delete
        </MenuItem>
      </Menu>
    </MenuTrigger>
  )
}
