import type { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

/**
 * Styles for the VISIBLE popover box, rendered as an inner wrapper inside the
 * react-aria-positioned overlay (see `popoverOverlayStyles`).
 *
 * The ENTER animation lives here, NOT on the positioned overlay. react-aria
 * decides whether to flip the popover (e.g. above the trigger near a boundary
 * edge) by measuring the overlay; a collection (e.g. `Menu`) populates in a
 * second render pass, so react-aria re-measures once content arrives. If the
 * enter animation is on the measured overlay, that CSS animation starts in the
 * same commit and corrupts the re-measurement, so the popover never flips on
 * open (only after a later resize) — even when there is ample room above.
 * Animating this inner wrapper instead keeps the overlay measurement clean, so
 * react-aria flips on open for any trigger position.
 *
 * The enter animation is applied statically (it runs on mount) rather than via
 * react-aria's `isEntering` render prop, because `isEntering`/`data-entering`
 * live on the overlay, not this wrapper. `placement-*` slide variants resolve
 * against the wrapper's mirrored `data-placement`. `overflow-hidden` clips
 * scrollable content to the rounded corners (the inner menu/listbox owns the
 * scroll via its own `max-h-[inherit] overflow-y-auto`).
 */
export const popoverStyles = tv({
  // `transition-none`: the open/close effect is a keyframe `animation`, not a
  // transition. Without it, `duration-*` also sets `transition-duration` and the
  // default `transition-property: all` makes the wrapper *animate* its inherited
  // `max-height` whenever react-aria re-clamps the overlay — so a popover that
  // does not fit its boundary visibly grows to full height then shrinks.
  base: "bg-utility-ui text-base-content-strong motion-safe:animate-in motion-safe:fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 max-h-[inherit] overflow-hidden rounded-sm bg-clip-padding shadow-sm transition-none motion-safe:duration-200 motion-safe:ease-out forced-colors:bg-[Canvas]",
})

export type PopoverVariantProps = VariantProps<typeof popoverStyles>

/**
 * Styles for the positioned overlay (`AriaPopover`) that react-aria measures.
 * Only the EXIT animation lives here, gated on react-aria's `data-exiting`
 * attribute: react-aria's `useExitAnimation` inspects THIS element's animations
 * to know when to unmount, so the exit animation must be on it (exit happens
 * after positioning has settled, so it cannot corrupt flip-on-open). There is
 * deliberately no enter animation here. The exit slide direction resolves against
 * react-aria's own `data-placement`.
 */
export const popoverOverlayStyles = tv({
  // `transition-none` so react-aria's positioning writes (top/max-height) apply
  // instantly and are never animated by a stray `transition`. The exit effect is
  // a keyframe `animation`, unaffected by this.
  base: "motion-safe:exiting:animate-out motion-safe:exiting:fade-out placement-bottom:exiting:slide-out-to-top-1 placement-top:exiting:slide-out-to-bottom-1 placement-left:exiting:slide-out-to-right-1 placement-right:exiting:slide-out-to-left-1 motion-safe:exiting:duration-150 transition-none ease-in",
})

export const popoverArrowStyles = tv({
  base: "group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 fill-utility-ui block forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]",
})
