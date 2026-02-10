"use client"

import { useCallback, useEffect, useRef } from "react"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

const themeAtom = atomWithStorage<string>("www-theme", "Base")

const STYLE_ELEMENT_ID = "oui-theme-override"

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom)
  const cssCache = useRef<Map<string, string>>(new Map())

  const applyTheme = useCallback(async (themeName: string) => {
    const existing = document.getElementById(STYLE_ELEMENT_ID)

    if (themeName === "Base") {
      existing?.remove()
      return
    }

    let css = cssCache.current.get(themeName)
    if (!css) {
      const res = await fetch(encodeURI(`/themes/generated-${themeName}.css`))
      if (!res.ok) {
        console.error(`Failed to load theme: ${themeName}`)
        return
      }
      css = await res.text()
      cssCache.current.set(themeName, css)
    }

    if (existing) {
      existing.textContent = css
    } else {
      const style = document.createElement("style")
      style.id = STYLE_ELEMENT_ID
      style.textContent = css
      document.head.appendChild(style)
    }
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  const selectTheme = useCallback(
    (themeName: string) => {
      setTheme(themeName)
    },
    [setTheme],
  )

  return { theme, setTheme: selectTheme }
}
