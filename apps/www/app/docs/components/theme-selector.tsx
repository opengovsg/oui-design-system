"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button, Menu, MenuItem, MenuTrigger } from "@opengovsg/oui"

import { useTheme } from "@/hooks/use-theme"

type ThemeManifestEntry = {
  name: string
  file: string
}

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
    <MenuTrigger>
      <Button
        variant="clear"
        size="xs"
        color="neutral"
        endContent={<ChevronDown className="size-3" />}
        className="max-w-32 truncate text-xs"
      >
        {theme}
      </Button>
      <Menu
        items={allThemes}
        selectionMode="single"
        selectedKeys={new Set([theme])}
        onSelectionChange={(keys) => {
          const selected = [...keys][0] as string
          if (selected) setTheme(selected)
        }}
        className="max-h-64 overflow-y-auto"
      >
        {(item) => <MenuItem id={item.name}>{item.name}</MenuItem>}
      </Menu>
    </MenuTrigger>
  )
}
