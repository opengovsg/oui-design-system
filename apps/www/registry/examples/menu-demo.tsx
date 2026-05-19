"use client"

import type { Selection } from "react-aria-components"
import { useState } from "react"
import { MoreHorizontal } from "lucide-react"

import {
  Button,
  Menu,
  MenuItem,
  MenuSection,
  MenuTrigger,
  SubmenuTrigger,
} from "@opengovsg/oui"

export default function TagFieldDemo() {
  const [style, setStyle] = useState<Selection>(new Set(["bold", "italic"]))
  const [align, setAlign] = useState<Selection>(new Set(["left"]))
  return (
    <MenuTrigger>
      <Button isIconOnly variant="outline" className="px-2">
        <MoreHorizontal className="h-5 w-5" />
      </Button>
      <Menu>
        <MenuSection title="Actions">
          <SubmenuTrigger>
            <MenuItem id="open">Open</MenuItem>
            <Menu>
              <MenuItem id="open-new">Open in New Window</MenuItem>
              <MenuItem id="open-current">Open in Current Window</MenuItem>
              <SubmenuTrigger>
                <MenuItem id="more">More</MenuItem>
                <Menu>
                  <MenuItem id="open-email">Open in Email Client</MenuItem>
                  <MenuItem id="open-in-alt">
                    Open in Alternative Browser
                  </MenuItem>
                </Menu>
              </SubmenuTrigger>
            </Menu>
          </SubmenuTrigger>
          <MenuItem>Paste</MenuItem>
        </MenuSection>
        <MenuSection
          selectionMode="multiple"
          selectedKeys={style}
          onSelectionChange={setStyle}
          title="Text style"
        >
          <MenuItem id="bold">Bold</MenuItem>
          <MenuItem id="italic">Italic</MenuItem>
          <MenuItem id="underline">Underline</MenuItem>
        </MenuSection>
        <MenuSection
          selectionMode="single"
          selectedKeys={align}
          onSelectionChange={setAlign}
          title="Text alignment"
        >
          <MenuItem id="left">Left</MenuItem>
          <MenuItem id="center">Center</MenuItem>
          <MenuItem id="right">Right</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  )
}
