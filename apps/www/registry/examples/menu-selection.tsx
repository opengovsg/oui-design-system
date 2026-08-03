"use client"

import {
  Button,
  Menu,
  MenuItem,
  MenuSection,
  MenuTrigger,
} from "@opengovsg/oui"
import { useState } from "react"
import type { Selection } from "react-aria-components"

export default function MenuSelection() {
  const [size, setSize] = useState<Selection>(new Set(["md"]))
  const [style, setStyle] = useState<Selection>(new Set(["bold"]))

  return (
    <MenuTrigger>
      <Button variant="outline">Format</Button>
      <Menu>
        <MenuSection
          title="Font size"
          selectionMode="single"
          selectedKeys={size}
          onSelectionChange={setSize}
        >
          <MenuItem id="xs">Extra small</MenuItem>
          <MenuItem id="sm">Small</MenuItem>
          <MenuItem id="md">Medium</MenuItem>
          <MenuItem id="lg">Large</MenuItem>
        </MenuSection>
        <MenuSection
          title="Text style"
          selectionMode="multiple"
          selectedKeys={style}
          onSelectionChange={setStyle}
        >
          <MenuItem id="bold">Bold</MenuItem>
          <MenuItem id="italic">Italic</MenuItem>
          <MenuItem id="underline">Underline</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  )
}
