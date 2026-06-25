---
"@opengovsg/oui": patch
---

fix(combo-box, calendar): restore menu offset and Today button focus

- ComboBox: pin the popover offset to 0 so the menu sits flush with the
  field group again, which react-aria-components now anchors the popover
  to instead of the inner input.
- Calendar: move focus into the grid after the Today button is pressed,
  since `setFocusedDate` alone no longer focuses the today cell.
