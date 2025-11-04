"use client"

import { useMemo } from "react"
import Link from "next/link"
import { ColorModeButton } from "@/components/color-mode-button"
import { useRoute } from "@/lib/use-route"
import { SiGithub } from "@icons-pack/react-simple-icons"

import { MobileHeaderNav } from "./mobile-header-nav"

export const Header = () => {
  const route = useRoute()

  const secondaryNavItems = useMemo(() => route.getSecondaryNavItems(), [route])

  return (
    <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5 dark:border-white/10">
      <div className="bg-white dark:bg-gray-950">
        <div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
          <div className="flex gap-4">
            <Link className="shrink-0" aria-label="Home" href="/">
              OUI
            </Link>
          </div>
          <div className="flex flex-1 items-center gap-6 max-md:hidden">
            {secondaryNavItems.map((item) => (
              <a
                className="current:after:font-medium invisible relative text-sm/6 font-medium text-gray-950 after:visible after:absolute after:inset-0 after:font-normal after:content-[attr(content)] dark:text-white"
                key={item.title}
                data-current={item.current ? true : undefined}
                href={item.url}
                content={item.title}
              >
                {item.title}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-gray-950/2 px-2 py-1 outline -outline-offset-1 outline-gray-950/8 dark:bg-white/5 dark:outline-white/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="-ml-0.5 size-4 fill-gray-600 dark:fill-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <kbd className="[.os-macos_&amp;]:block hidden font-sans text-xs/4 text-gray-500 dark:text-gray-400">
                ⌘K
              </kbd>
              <kbd className="not-[.os-macos_&amp;]:block hidden font-sans text-xs/4 text-gray-500 dark:text-gray-400">
                Ctrl&nbsp;K
              </kbd>
            </button>
            <a aria-label="GitHub repository" href={route.repoUrl}>
              <SiGithub className="size-5 fill-black/40 hover:fill-black dark:fill-gray-400 dark:hover:fill-gray-200" />
            </a>
            <MobileHeaderNav />
          </div>
        </div>
      </div>
    </div>
  )
}
