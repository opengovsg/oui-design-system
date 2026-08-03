"use client"

import { cn } from "@opengovsg/oui-theme"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

/**
 * Code section shown beneath a component preview, styled after the react-aria
 * docs: a short clamped peek of the source that expands to the full code when
 * the "Show code" control is clicked.
 *
 * The nested Fumadocs code block's own border/radius/shadow is flattened so it
 * sits flush inside the preview card, and the collapsed fade fades to the
 * pinned Shiki theme backgrounds (github-light `#fff` / github-dark `#24292e`).
 */
export function CodeCollapsible({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-base-divider-strong relative border-t">
      <div
        className={cn(
          "relative overflow-hidden",
          "[&_.shiki]:my-0! [&_.shiki]:rounded-none! [&_.shiki]:border-0! [&_.shiki]:shadow-none!",
          !open && "max-h-40",
        )}
      >
        {children}
        {!open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white to-transparent dark:from-[#24292e]"
          />
        )}
      </div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="text-fd-muted-foreground hover:text-fd-foreground border-base-divider-strong bg-fd-card flex w-full cursor-pointer items-center justify-center gap-1.5 border-t px-4 py-2 text-sm font-medium transition-colors"
      >
        {open ? "Hide code" : "Show code"}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
    </div>
  )
}
