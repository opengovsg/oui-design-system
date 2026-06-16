"use client"

import type { PopoverProps as AriaPopoverProps } from "react-aria-components"
import { useCallback, useRef } from "react"
import {
  Popover as AriaPopover,
  composeRenderProps,
  OverlayArrow,
  PopoverContext,
  useSlottedContext,
} from "react-aria-components"

import type { SlotsToClasses, VariantProps } from "@opengovsg/oui-theme"
import { popoverArrowStyles, popoverStyles } from "@opengovsg/oui-theme"

export interface PopoverProps
  extends Omit<AriaPopoverProps, "children">,
    VariantProps<typeof popoverStyles> {
  showArrow?: boolean
  children: React.ReactNode

  /**
   * List of classes to change the className of the element.
   *
   * @example
   * ```text
   * Component: Popover
   *
   * Class names:
   * - base: the popover itself. Will be ignored if `className` is provided.
   * - arrow: the arrow of the popover.
   */
  classNames?: SlotsToClasses<"arrow" | "base">
}

// Spacing between reposition attempts, and the cap on how long we keep trying
// before giving up (e.g. for an intentionally empty popover that never gains
// height). Each attempt stops the moment the overlay has been positioned with
// real height, so a popover that has room below settles on the first attempt.
const REFLOW_INTERVAL_MS = 50
const REFLOW_MAX_ATTEMPTS = 20

/**
 * Works around react-aria not flipping a popover that opens near the bottom
 * edge of the viewport.
 *
 * react-aria-components renders the popover body in a second pass (RAC
 * collections such as `Menu` only populate after the initial render). The first
 * positioning pass therefore measures an empty, ~0-height overlay. Near a
 * viewport edge with no room below the trigger, react-aria cannot justify
 * flipping (the measured overlay height is not greater than the available
 * space) and pins the overlay to `max-height: 0`. The overlay then stays clamped
 * to 0 once the content populates, so react-aria's own ResizeObserver never sees
 * a size change and never repositions — the menu is left rendered below the
 * trigger and clipped by the viewport.
 *
 * react-aria recomputes every overlay position on window `resize`, resetting
 * `max-height` back to the viewport height and re-measuring the real content
 * before deciding whether to flip. We dispatch a synthetic resize until the
 * overlay has gained real height, which is when react-aria has measured the
 * populated content and positioned against it. `setTimeout` (rather than
 * `requestAnimationFrame`) is used deliberately: the re-measure has to run after
 * React has flushed the content render, otherwise it reads stale/empty layout.
 */
const useReflowOnContentChange = () => {
  const cleanupRef = useRef<(() => void) | null>(null)

  // A callback ref so this is set up exactly when react-aria mounts the popover
  // element (i.e. when it opens) and torn down when it unmounts — the open state
  // of an uncontrolled trigger is otherwise not visible here.
  return useCallback((el: HTMLElement | null) => {
    cleanupRef.current?.()
    cleanupRef.current = null
    if (!el) return

    let timer = 0
    let attempts = 0
    let observer: MutationObserver | null = null

    const settle = () => {
      // Positioned against real content — react-aria's own observers handle any
      // further changes now that the overlay is no longer clamped to 0.
      observer?.disconnect()
      observer = null
    }

    const poll = () => {
      // Only nudge while the overlay is clamped with no height — the bug state.
      // A popover that already has room positions itself correctly and is left
      // untouched (no spurious resize dispatched).
      if (el.offsetHeight > 0) return settle()
      window.dispatchEvent(new Event("resize"))
      attempts += 1
      if (el.offsetHeight > 0) return settle()
      if (attempts >= REFLOW_MAX_ATTEMPTS) return
      timer = window.setTimeout(poll, REFLOW_INTERVAL_MS)
    }

    const start = () => {
      clearTimeout(timer)
      attempts = 0
      timer = window.setTimeout(poll, 0)
    }

    start()

    // Restart if the content itself changes while the overlay is still clamped
    // (e.g. asynchronously loaded menu items). Only structural and text
    // mutations are observed, so react-aria's own positioning style updates on
    // the overlay do not retrigger this and cause a loop.
    observer = new MutationObserver(start)
    observer.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    cleanupRef.current = () => {
      clearTimeout(timer)
      observer?.disconnect()
      observer = null
    }
  }, [])
}

export const Popover = ({
  children,
  showArrow,
  className,
  classNames,
  ...props
}: PopoverProps) => {
  const popoverContext = useSlottedContext(PopoverContext)!
  const isSubmenu = popoverContext?.trigger === "SubmenuTrigger"
  let offset = showArrow ? 12 : 8
  offset = isSubmenu ? offset - 6 : offset
  const reflowRef = useReflowOnContentChange()
  return (
    <AriaPopover
      ref={reflowRef}
      offset={offset}
      {...props}
      className={composeRenderProps(
        className ?? classNames?.base,
        (className, renderProps) =>
          popoverStyles({ ...renderProps, className }),
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className={popoverArrowStyles({ className: classNames?.arrow })}
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaPopover>
  )
}
