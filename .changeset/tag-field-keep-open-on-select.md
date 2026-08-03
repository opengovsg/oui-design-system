---
"@opengovsg/oui": minor
---

feat(tag-field): add shouldCloseOnSelect prop and selection checkboxes

- Add `shouldCloseOnSelect` prop (default `true`). When set to `false`,
  the dropdown stays open after selecting an option, and selected
  options remain in the list instead of being filtered out, so they can
  be quickly deselected again.
- Each `TagFieldItem` now always renders a checkbox indicating whether
  the option is selected, regardless of `shouldCloseOnSelect`.
