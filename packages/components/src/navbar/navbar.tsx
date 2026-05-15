"use client"

import type { Variants } from "motion/react"
import { domAnimation, LazyMotion, m } from "motion/react"
import { FocusScope, mergeProps } from "react-aria"

import type { UseNavbarProps } from "./use-navbar"
import { pickChildren } from "../system/react-utils/children"
import { forwardRef } from "../system/utils"
import { NavbarProvider } from "./navbar-context"
import { NavbarMenu } from "./navbar-menu"
import { useNavbar } from "./use-navbar"

export interface NavbarProps extends UseNavbarProps {
  children?: React.ReactNode | React.ReactNode[]
}

const showOnScrollUpVariants: Variants = {
  visible: {
    y: 0,
    transition: {
      ease: [0, 0, 0.2, 1],
    },
  },
  hidden: {
    y: "-100%",
    transition: {
      ease: [0, 0, 0.2, 1],
    },
  },
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
        {context.shouldShowOnScrollUp ? (
          <LazyMotion features={domAnimation}>
            <m.nav
              animate={context.isNavbarHidden ? "hidden" : "visible"}
              initial="visible"
              variants={showOnScrollUpVariants}
              {...mergeProps(context.getBaseProps(), context.motionProps)}
            >
              {content}
            </m.nav>
          </LazyMotion>
        ) : (
          <Component {...context.getBaseProps()}>{content}</Component>
        )}
      </FocusScope>
    </NavbarProvider>
  )
})

Navbar.displayName = "Navbar"
