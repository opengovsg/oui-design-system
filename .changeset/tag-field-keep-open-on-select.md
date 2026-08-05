---
"@opengovsg/oui": minor
"@opengovsg/oui-theme": minor
---

feat(tag-field): add shouldCloseOnSelect prop and selection checkboxes

- Selected options are no longer filtered out of the dropdown list;
  every option stays visible so its selected state can be seen and
  toggled at any time.
- Add `showCheckbox` prop (default `false`) to render a checkbox on
  each `TagFieldItem` indicating whether the option is selected,
  styled via the new `tagFieldItemStyles` theme export and
  customizable through `itemClassNames.checkboxBox` /
  `itemClassNames.checkboxIcon`. The checkbox is vertically centered
  against the label's first line (rather than its full height) so it
  stays aligned when an option wraps across multiple lines, at every
  size. A future major version may default this prop to `true`.
- Add `shouldCloseOnSelect` prop (default `true`). When set to `false`,
  the dropdown stays open after selecting an option, allowing multiple
  options to be selected (or deselected) in one go, with the just-picked
  option staying highlighted instead of resetting to the first item.
