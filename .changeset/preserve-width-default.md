---
"@opengovsg/oui": patch
---

`Button` now enables `preserveWidth` by default, keeping its width constant
while pending to prevent layout shift. Pass `preserveWidth={false}` to opt out.
