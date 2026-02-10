"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/hooks/use-theme"
import { ChevronDown } from "lucide-react"

import { Button, Menu, MenuItem, MenuTrigger } from "@opengovsg/oui"

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
      >
        {theme}
      </Button>
      <Menu
        size="xs"
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
