"use client"

import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  MenuSection,
  MenuTrigger,
  SubmenuTrigger,
} from "@opengovsg/oui"
import { ChevronDown } from "lucide-react"

export default function AvatarMenuTemplate() {
  return (
    <MenuTrigger>
      <Button
        variant="clear"
        className="px-2"
        endContent={<ChevronDown className="group-pressed:rotate-180" />}
      >
        <Avatar size="sm" name="User Name">
          <Avatar.Fallback />
        </Avatar>
      </Button>
      <Menu>
        <MenuSection title="Actions">
          <SubmenuTrigger>
            <MenuItem id="open">Settings</MenuItem>
            <Menu>
              <MenuItem id="open-new">Change Avatar</MenuItem>
              <MenuItem id="open-current">Update Profile Information</MenuItem>
              <SubmenuTrigger>
                <MenuItem id="more">More</MenuItem>
                <Menu>
                  <MenuItem id="open-email">Change Email Address</MenuItem>
                  <MenuItem id="open-in-alt">Change Password</MenuItem>
                </Menu>
              </SubmenuTrigger>
            </Menu>
          </SubmenuTrigger>
          <MenuItem>Logout</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  )
}
