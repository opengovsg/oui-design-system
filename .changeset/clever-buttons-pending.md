---
"@opengovsg/oui": patch
"@opengovsg/oui-theme": patch
---

Add `preserveWidth` prop to `Button` to prevent layout shift while pending by keeping the children in the layout (visually hidden) and overlaying the spinner over them. Also pin the pending background/hover/active states to match the disabled state, so a pending button no longer highlights on hover.
