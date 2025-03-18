import type React from "react"
import { useImperativeHandle, useRef } from "react"

export type ReactRef<T> = React.RefObject<T> | React.Ref<T>

export function useDomRef<T extends HTMLElement = HTMLElement>(
  ref?: ReactRef<T | null>,
) {
  const domRef = useRef<T>(null)

  useImperativeHandle(ref, () => domRef.current!)

  return domRef
}
