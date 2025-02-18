"use client"

import { cn } from "@opengovsg/oui-theme"
import { Moon as MoonIcon, SunMedium as SunIcon } from "lucide-react"

export const ColorModeButton = ({ className = "" }: { className?: string }) => {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark")
    // setting SameSite property to satisfy relevant console warning. Use SameSite=None if site relies on cross-site requests
    document.cookie = `theme=${isDark ? "dark" : "light"}; SameSite=Lax; Path=/;`
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn("rounded-full bg-gray-200 p-2 dark:bg-gray-800", className)}
      aria-label="Toggle theme"
    >
      <SunIcon size="24" className="hidden text-gray-200 dark:block" />
      <MoonIcon size="24" className="block text-gray-800 dark:hidden" />
    </button>
  )
}
