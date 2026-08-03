"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@opengovsg/oui"
import { Link } from "react-aria-components"

export default function NavbarActiveItem() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">OUI</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link href="#">Features</Link>
        </NavbarItem>
        <NavbarItem
          isActive
          className="data-[active=true]:text-interaction-links-default data-[active=true]:font-semibold"
        >
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
