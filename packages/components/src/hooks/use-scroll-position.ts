import { useCallback, useEffect, useRef } from "react"

const isBrowser = typeof window !== "undefined"

export type ScrollValue = { x: number; y: number }

function getScrollPosition(
  element: HTMLElement | undefined | null,
): ScrollValue {
  if (!isBrowser) return { x: 0, y: 0 }
  if (!element) {
    return { x: window.scrollX, y: window.scrollY }
  }

  return { x: element.scrollLeft, y: element.scrollTop }
}

export interface UseScrollPositionOptions {
  /**
   * The wait time in milliseconds before triggering the callback.
   * @default 30
   */
  delay?: number
  /**
   * Whether the scroll position should be tracked or not.
   * @default true
   */
  isEnabled?: boolean
  /**
   * The element to track the scroll position for. Pass a `useState`-held
   * element (via a callback ref) so the effect re-runs when the element
   * mounts. Falls back to `window` when `null` or `undefined`.
   */
  element?: HTMLElement | null
  /**
   * The callback function to be called when the scroll position changes.
   */
  callback?: ({
    prevPos,
    currPos,
  }: {
    prevPos: ScrollValue
    currPos: ScrollValue
  }) => void
}

export const useScrollPosition = (
  props: UseScrollPositionOptions,
): ScrollValue => {
  const { element, delay = 30, callback, isEnabled } = props

  const position = useRef<ScrollValue>(
    isEnabled ? getScrollPosition(element) : { x: 0, y: 0 },
  )

  const throttleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handler = useCallback(() => {
    const currPos = getScrollPosition(element)

    if (typeof callback === "function") {
      callback({ prevPos: position.current, currPos })
    }

    position.current = currPos
    throttleTimeout.current = null
  }, [callback, element])

  useEffect(() => {
    if (!isEnabled) return

    const handleScroll = () => {
      if (delay) {
        if (throttleTimeout.current) {
          clearTimeout(throttleTimeout.current)
        }

        throttleTimeout.current = setTimeout(handler, delay)
      } else {
        handler()
      }
    }

    const target = element || window

    target.addEventListener("scroll", handleScroll)

    return () => {
      target.removeEventListener("scroll", handleScroll)
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current)
        throttleTimeout.current = null
      }
    }
  }, [element, delay, handler, isEnabled])

  return position.current
}
