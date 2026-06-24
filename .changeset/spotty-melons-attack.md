---
"@opengovsg/oui": patch
---

chore: update react-aria ecosystem to latest

Update react-aria-components (1.19), react-aria (3.50), react-stately
(3.48) and the related @react-aria/*, @react-stately/*, @react-types/*
and @internationalized/* packages to their latest versions, and adjust
the components to match the new type signatures:

- Calendar/RangeCalendar state types now carry a selection-mode generic.
- Select and tag field render props gained new required members.
- `LocalizedStrings` is imported from `@react-aria/i18n` and the navbar
  overlay helpers from `react-aria`, since `react-aria` no longer
  re-exports them.
