"use client"

import { Link } from "react-aria-components"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@opengovsg/oui"

export default function NavbarWithoutBorder() {
  return (
    <Navbar hasBorder={false}>
      <NavbarBrand>
        <p className="font-bold text-inherit">OUI</p>
      </NavbarBrand>
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
