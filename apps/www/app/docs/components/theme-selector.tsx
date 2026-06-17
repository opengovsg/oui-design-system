"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { useTheme } from "@/hooks/use-theme"
import { ChevronsUpDown } from "lucide-react"

import { cn } from "@opengovsg/oui-theme"

type ThemeManifestEntry = {
  name: string
  file: string
}

const emptySubscribe = () => () => {}

/** `false` on the server + during hydration, `true` once mounted on the client. */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}

/**
 * Switcher for the OUI design-system theme (Base + generated themes).
 *
 * Uses a native `<select>` styled with Fumadocs tokens so it stays consistent
 * with the docs chrome and renders correctly in dark mode (OUI has no dark
 * mode). The value comes from `localStorage` (via jotai), so the select is
 * hidden behind a same-sized placeholder until mounted — that avoids both a
 * "Base"→stored flash and the layout shift it would cause.
 */
export const ThemeSelector = () => {
  const mounted = useMounted()
  const { theme, setTheme } = useTheme()
  const [themes, setThemes] = useState<ThemeManifestEntry[]>([])

  useEffect(() => {
    fetch("/themes/themes-manifest.json")
      .then((res) => res.json())
      .then((data: ThemeManifestEntry[]) => setThemes(data))
      .catch(console.error)
  }, [])

  const allThemes = [{ name: "Base", file: "" }, ...themes]

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="border-fd-border bg-fd-secondary h-[30px] w-28 animate-pulse rounded-md border"
      />
    )
  }

  return (
    <div className="relative w-28">
      <select
        aria-label="OUI theme"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        className={cn(
          "border-fd-border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
          "w-full cursor-pointer appearance-none rounded-md border py-1 pr-7 pl-2 text-sm transition-colors",
          "focus-visible:ring-fd-ring focus-visible:ring-2 focus-visible:outline-none",
        )}
      >
        {allThemes.map((entry) => (
          <option key={entry.name} value={entry.name}>
            {entry.name}
          </option>
        ))}
      </select>
      <ChevronsUpDown className="text-fd-muted-foreground pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2" />
    </div>
  )
}
