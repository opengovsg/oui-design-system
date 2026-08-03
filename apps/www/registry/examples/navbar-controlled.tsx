"use client"

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@opengovsg/oui"
import { useState } from "react"
import { Link } from "react-aria-components"

const menuItems = ["Profile", "Dashboard", "Settings", "Log Out"]

export default function NavbarControlled() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
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
        <NavbarItem>
          <Link href="#">Customers</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button size="sm" onPress={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "Close" : "Open"} Menu
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
