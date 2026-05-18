"use client"

import {
  Button,
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@opengovsg/oui"

export default function MenuSections() {
  return (
    <MenuTrigger>
      <Button variant="outline">Edit</Button>
      <Menu>
        <MenuSection title="Clipboard">
          <MenuItem id="cut">Cut</MenuItem>
          <MenuItem id="copy">Copy</MenuItem>
          <MenuItem id="paste">Paste</MenuItem>
        </MenuSection>
        <MenuSeparator />
        <MenuSection title="Transform">
          <MenuItem id="bold">Bold</MenuItem>
          <MenuItem id="italic">Italic</MenuItem>
          <MenuItem id="underline">Underline</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  )
}
