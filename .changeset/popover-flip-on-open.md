---
"@opengovsg/oui": patch
"@opengovsg/oui-theme": patch
---

fix(popover, menu): flip above the trigger on open near a boundary edge

A `Menu`/`Popover` near the bottom edge of its boundary (viewport or a bounded
scroll container) opened below the trigger, collapsed to a clipped sliver, and
only flipped above after a later reposition (e.g. a window resize) — i.e. it
"flipped on resize but not on open".

RAC collections (e.g. `Menu`) populate in a second render pass, so react-aria's
first positioning pass measures an empty popover and re-measures once content
arrives. Because OUI applied the open animation to the same element react-aria
measures, that CSS animation started in the same commit the collection populated
and corrupted the re-measurement, so the popover never flipped on open — even
with ample room above the trigger.

The enter animation now runs on an inner wrapper, leaving the positioned overlay
(the element react-aria measures) animation-free, so react-aria measures the real
content and flips on open for any trigger position. The exit animation stays on
the overlay so react-aria's `useExitAnimation` still detects it and delays
unmount. A genuinely empty popover (e.g. a filtered-out menu) collapses to 0
height — no reserved-height sliver. A popover too tall for its boundary renders
at its final clamped (scrollable) height with no visible reflow. `Menu`
additionally forwards `boundaryElement`/`scrollRef` (and related positioning
props) to its `Popover`, so consumers can bound flipping to a scroll container.

The previous synthetic-resize workaround (#290) is removed; it only re-measured
when the overlay was exactly 0 height, so it did not help when the overlay was
clamped to a small non-zero height.
