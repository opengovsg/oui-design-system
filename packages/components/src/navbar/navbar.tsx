"use client"

import { FocusScope } from "react-aria"

import type { UseNavbarProps } from "./use-navbar"
import { pickChildren } from "../system/react-utils/children"
import { forwardRef } from "../system/utils"
import { NavbarProvider } from "./navbar-context"
import { NavbarMenu } from "./navbar-menu/menu"
import { useNavbar } from "./use-navbar"

export interface NavbarProps extends UseNavbarProps {
  children?: React.ReactNode | React.ReactNode[]
}

export const Navbar = forwardRef<"div", NavbarProps>((props, ref) => {
  const { children, ...otherProps } = props

  const context = useNavbar({ ...otherProps, ref })

  const Component = context.Component

  const [childrenWithoutMenu, menu] = pickChildren(children, NavbarMenu)

  const content = (
    <>
      <header {...context.getWrapperProps()}>{childrenWithoutMenu}</header>
      {menu}
    </>
  )

  return (
    <NavbarProvider value={context}>
      <FocusScope contain={context.isMenuOpen}>
        <Component {...context.getBaseProps()}>{content}</Component>
      </FocusScope>
    </NavbarProvider>
  )
})

Navbar.displayName = "Navbar"
