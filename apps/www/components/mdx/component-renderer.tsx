"use client"

import { useSyncExternalStore } from "react"

import { Index } from "@/__registry__"

const emptySubscribe = () => () => {}

/** SSR-safe mounted flag: `false` on the server + during hydration, `true` after. */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}

/**
 * Renders a live registry demo on the client only.
 *
 * Many demos use time/locale/random input (date pickers default to "today",
 * etc.) and react-aria portals, which produce different markup on the server
 * and the client and therefore trigger hydration mismatches when server-
 * rendered. Gating the render behind a mounted flag means the server and the
 * first client render agree (both show the placeholder), and the real demo is
 * mounted afterwards — no SSR mismatch.
 */
export function ComponentRenderer({ name }: { name: string }) {
  const mounted = useMounted()

  const Component = Index[name]?.component
  if (!Component) {
    return (
      <p className="text-fd-muted-foreground text-sm">
        Component{" "}
        <code className="bg-fd-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  if (!mounted) {
    // Reserve a little height so opening the page doesn't jump when the demo mounts.
    return <div aria-hidden className="min-h-10 w-full" />
  }

  return <Component />
}
