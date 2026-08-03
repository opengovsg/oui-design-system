"use client"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@opengovsg/oui"
import { Link } from "react-aria-components"

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
]

export default function NavbarWithMenu() {
  return (
    <Navbar>
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              className={({ isActive }) => (isActive ? "font-semibold" : "")}
              isActive={index === 0}
              key={`${item}-${index}`}
            >
              <Link className="w-full" href="#">
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
        <NavbarBrand>
          <p className="font-bold text-inherit">OUI</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
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
