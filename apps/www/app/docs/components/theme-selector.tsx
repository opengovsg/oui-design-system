"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/hooks/use-theme"
import { ChevronsUpDown } from "lucide-react"

import { cn } from "@opengovsg/oui-theme"

type ThemeManifestEntry = {
  name: string
  file: string
}

/**
 * Switcher for the OUI design-system theme (Base + generated themes).
 *
 * Uses a native `<select>` styled with Fumadocs tokens rather than the OUI
 * Menu so it stays consistent with the docs chrome and renders correctly in
 * dark mode (OUI has no dark mode).
 */
export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme()
  const [themes, setThemes] = useState<ThemeManifestEntry[]>([])

  useEffect(() => {
    fetch("/themes/themes-manifest.json")
      .then((res) => res.json())
      .then((data: ThemeManifestEntry[]) => setThemes(data))
      .catch(console.error)
  }, [])

  const allThemes = [{ name: "Base", file: "" }, ...themes]

  return (
    <div className="relative">
      <select
        aria-label="OUI theme"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        className={cn(
          "border-fd-border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
          "cursor-pointer appearance-none rounded-md border py-1 pr-7 pl-2 text-sm transition-colors",
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
