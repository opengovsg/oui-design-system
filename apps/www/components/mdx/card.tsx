import type { HTMLAttributes } from "react";
import type React from "react"
import type { LinkProps } from "next/link";
import Link from "next/link"
import { SiStackblitz } from "@icons-pack/react-simple-icons"
import { ChevronRight } from "lucide-react"

import { cn } from "@opengovsg/oui-theme"

import { NextIcon, ViteIcon } from "../icons/framework-icons"

export const CardGroup = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("mt-6 mb-10 grid min-w-[240px] gap-6", className)}
      {...props}
    />
  )
}

const CardTitleIcon = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="-translate-x-0.5 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100">
      {children}
    </div>
  )
}

const iconMap = {
  nextjs: <NextIcon />,
  vite: <ViteIcon />,
  stackblitz: <SiStackblitz fill="#1269D3" />,
}

interface CardProps {
  href: LinkProps["href"]
  icon?: keyof typeof iconMap | React.ReactNode
  title: string
  children: React.ReactNode
}

export const Card = (props: CardProps) => {
  const { icon: iconProp, title, children, href } = props

  const icon =
    typeof iconProp === "string"
      ? iconMap[iconProp as keyof typeof iconMap]
      : iconProp

  return (
    <Link href={href} className="group rounded-lg border p-6">
      {icon && <div className="mb-4 h-7.5 w-7.5">{icon}</div>}
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-1 font-semibold">
          {title}
          <CardTitleIcon>
            <ChevronRight />
          </CardTitleIcon>
        </div>
        <div className="text-sm">{children}</div>
      </div>
    </Link>
  )
}
