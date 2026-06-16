---
"@opengovsg/oui": patch
---

`Menu`/`Popover` now flips above the trigger when opened near the bottom edge
of the viewport, instead of opening downwards and being clipped (or collapsing
to ~0 height). react-aria measures the popover before its collection content
has rendered, so near a viewport edge it pinned the overlay to `max-height: 0`
and never repositioned once the content populated; `Popover` now nudges
react-aria to re-measure until the overlay is positioned against real content.
