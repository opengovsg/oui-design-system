---
"@opengovsg/oui-theme": patch
---

Make the `Button` pending state read as disabled for every variant: the background and outline border mirror the variant's disabled colors (overriding hover/active so it no longer highlights), and the text uses the strong base content color (except `inverse`, which keeps its light text).
