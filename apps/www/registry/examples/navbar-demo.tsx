"use client"

import { Link } from "react-aria-components"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@opengovsg/oui"

const menuItems = [
  "Profile",
  "Dashboard",
  "Settings",
  "Help & Feedback",
  "Log Out",
]

export default function NavbarDemo() {
  return (
    <Navbar>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarBrand>
          <p className="font-bold text-inherit">OUI</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">OUI</p>
        </NavbarBrand>
        <NavbarItem>
          <Link href="#">Features</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Integrations</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="#">Login</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
