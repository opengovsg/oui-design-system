"use client"

import type { CSSProperties } from "react"
import { useScrollSpy } from "@/hooks/use-scroll-spy"

interface TocItem {
  title: string
  url: string
  depth: number
}

interface TocProps {
  items: TocItem[]
}

export const Toc = ({ items }: TocProps) => {
  const activeItem = useScrollSpy(items.map((entry) => entry.url))

  return (
    <nav className="flex flex-col gap-3">
      <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">
        On this page
      </h3>
      <ul className="flex flex-col gap-2 border-l border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)] dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)]">
        {items.map((item, i) => (
          <li
            style={{ "--toc-depth": item.depth } as CSSProperties}
            className="-ms-px flex flex-col items-start gap-2"
            key={i}
          >
            <a
              aria-current={item.url === activeItem ? "page" : undefined}
              href={item.url}
              className="inline-block border-l border-transparent pl-[calc(1rem*var(--toc-depth)+1rem)] text-base/8 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 sm:text-sm/6 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white dark:aria-[current]:border-white dark:aria-[current]:text-white"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
