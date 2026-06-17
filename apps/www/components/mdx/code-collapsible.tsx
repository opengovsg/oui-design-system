"use client"

import { useState } from "react"
import { ChevronDown, Code2 } from "lucide-react"

import { cn } from "@opengovsg/oui-theme"

/**
 * Disclosure shown beneath a component preview: a "Show/Hide code" trigger that
 * reveals the example source below the rendered demo (instead of the previous
 * preview/code tab switch). Mirrors the react-aria docs example layout.
 */
export function CodeCollapsible({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-base-divider-strong border-t">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="text-fd-muted-foreground hover:text-fd-foreground flex w-full cursor-pointer items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors"
      >
        <Code2 className="size-4" />
        {open ? "Hide code" : "Show code"}
        <ChevronDown
          className={cn(
            "ml-auto size-4 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="border-base-divider-strong border-t">{children}</div>
      )}
    </div>
  )
}
