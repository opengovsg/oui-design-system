"use client"

import { useMemo } from "react"
import { ColorModeButton } from "@/components/color-mode-button"
import { useRoute } from "@/lib/use-route"

export const Header = () => {
  const route = useRoute()

  const primaryNavItems = useMemo(() => route.getPrimaryNavItems(), [route])

  return (
    <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5 dark:border-white/10">
      <div className="bg-white dark:bg-gray-950">
        <div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
          <div className="flex gap-4">
            <a className="shrink-0" aria-label="Home" href="/">
              OUI
            </a>
          </div>
          <div className="flex items-center gap-6 max-md:hidden">
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
              <kbd className="hidden font-sans text-xs/4 text-gray-500 dark:text-gray-400 [.os-macos_&amp;]:block">
                ⌘K
              </kbd>
              <kbd className="hidden font-sans text-xs/4 text-gray-500 not-[.os-macos_&amp;]:block dark:text-gray-400">
                Ctrl&nbsp;K
              </kbd>
            </button>
            {primaryNavItems.map((item) => (
              <a
                className="current:font-medium text-sm/6 text-gray-950 dark:text-white"
                key={item.title}
                data-current={item.current ? true : undefined}
                href={item.url}
              >
                {item.title}
              </a>
            ))}
            <a aria-label="GitHub repository" href={route.repoUrl}>
              <svg
                viewBox="0 0 20 20"
                className="size-5 fill-black/40 hover:fill-black dark:fill-gray-400 dark:hover:fill-gray-200"
              >
                <path d="M10 0C4.475 0 0 4.475 0 10a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.287-.6-1.175-1.025-1.412-.35-.188-.85-.65-.013-.663.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.088.638-1.338-2.225-.25-4.55-1.112-4.55-4.937 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.274.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 012.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0020 10c0-5.525-4.475-10-10-10z"></path>
              </svg>
            </a>
            <ColorModeButton />
          </div>
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              type="button"
              aria-label="Search"
              className="inline-grid size-7 place-items-center rounded-md"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              className="undefined relative inline-grid size-7 place-items-center rounded-md text-gray-950 hover:bg-gray-950/5 dark:text-white dark:hover:bg-white/10"
              aria-label="Navigation"
            >
              <span className="absolute top-1/2 left-1/2 size-11 -translate-1/2 [@media(pointer:fine)]:hidden"></span>
              <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
                <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
