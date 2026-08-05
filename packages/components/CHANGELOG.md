# @opengovsg/oui

## 0.0.61

### Patch Changes

- [#344](https://github.com/opengovsg/oui-design-system/pull/344) [`d653601`](https://github.com/opengovsg/oui-design-system/commit/d6536018b81e9f087cb022a56c17804c1002df3d) Thanks [@karrui](https://github.com/karrui)! - feat(tag-field): add shouldCloseOnSelect prop and selection checkboxes
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

- Updated dependencies [[`d653601`](https://github.com/opengovsg/oui-design-system/commit/d6536018b81e9f087cb022a56c17804c1002df3d)]:
  - @opengovsg/oui-theme@0.0.61

## 0.0.60

### Patch Changes

- [#313](https://github.com/opengovsg/oui-design-system/pull/313) [`2cd7beb`](https://github.com/opengovsg/oui-design-system/commit/2cd7beb7088f83ed76262d85520c8ce07d81ff58) Thanks [@karrui](https://github.com/karrui)! - fix(combo-box, calendar): restore menu offset and Today button focus
  - ComboBox: pin the popover offset to 0 so the menu sits flush with the
    field group again, which react-aria-components now anchors the popover
    to instead of the inner input.
  - Calendar: move focus into the grid after the Today button is pressed,
    since `setFocusedDate` alone no longer focuses the today cell.

- [#304](https://github.com/opengovsg/oui-design-system/pull/304) [`0105379`](https://github.com/opengovsg/oui-design-system/commit/01053799c628d8349ed2d2dd984921984382177d) Thanks [@dependabot](https://github.com/apps/dependabot)! - chore: update react-aria ecosystem to latest

  Update react-aria-components (1.19), react-aria (3.50), react-stately
  (3.48) and the related @react-aria/_, @react-stately/_, @react-types/_
  and @internationalized/_ packages to their latest versions, and adjust
  the components to match the new type signatures:
  - Calendar/RangeCalendar state types now carry a selection-mode generic.
  - Select and tag field render props gained new required members.
  - `LocalizedStrings` is imported from `@react-aria/i18n` and the navbar
    overlay helpers from `react-aria`, since `react-aria` no longer
    re-exports them.

- Updated dependencies []:
  - @opengovsg/oui-theme@0.0.60

## 0.0.59

### Patch Changes

- [#299](https://github.com/opengovsg/oui-design-system/pull/299) [`a85a5b6`](https://github.com/opengovsg/oui-design-system/commit/a85a5b6152d61b42385b20d13ee5da4f645179a7) Thanks [@karrui](https://github.com/karrui)! - fix(avatar, navbar): render context providers via Context.Provider

  `Avatar`, `AvatarGroup`, and `Navbar` now render their context providers
  explicitly via `Context.Provider` instead of the React 19-only
  `<Context value>` shorthand. On React 18 (declared in the `react: ">= 18"`
  peer range) the shorthand logged `Warning: Rendering <Context> directly is not
supported ...` and treated the element as a `Context.Consumer`, so the provided
  value was not reliably delivered to descendants (e.g. `Avatar.Image` /
  `Avatar.Fallback`). Rendering works on React 18 and 19 with no warning.

- [#306](https://github.com/opengovsg/oui-design-system/pull/306) [`7b71c99`](https://github.com/opengovsg/oui-design-system/commit/7b71c99daccc5d2beb3a3ff99a07f47cbce0bd15) Thanks [@karrui](https://github.com/karrui)! - fix(popover, menu): flip above the trigger on open near a boundary edge

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

- Updated dependencies [[`7b71c99`](https://github.com/opengovsg/oui-design-system/commit/7b71c99daccc5d2beb3a3ff99a07f47cbce0bd15)]:
  - @opengovsg/oui-theme@0.0.59

## 0.0.58

### Patch Changes

- [#290](https://github.com/opengovsg/oui-design-system/pull/290) [`f04ff7b`](https://github.com/opengovsg/oui-design-system/commit/f04ff7b818bb50f3ede31929a2a22b9a5d1e36bc) Thanks [@karrui](https://github.com/karrui)! - `Menu`/`Popover` now flips above the trigger when opened near the bottom edge
  of the viewport, instead of opening downwards and being clipped (or collapsing
  to ~0 height). react-aria measures the popover before its collection content
  has rendered, so near a viewport edge it pinned the overlay to `max-height: 0`
  and never repositioned once the content populated; `Popover` now nudges
  react-aria to re-measure until the overlay is positioned against real content.
- Updated dependencies [[`7552f60`](https://github.com/opengovsg/oui-design-system/commit/7552f6056009265de720d28f30909a750e22f669)]:
  - @opengovsg/oui-theme@0.0.58

## 0.0.57

### Patch Changes

- [#288](https://github.com/opengovsg/oui-design-system/pull/288) [`71dfc1e`](https://github.com/opengovsg/oui-design-system/commit/71dfc1e4794e76e08b28b2f4ebc41b95f56c4807) Thanks [@karrui](https://github.com/karrui)! - `Button` now enables `preserveWidth` by default, keeping its width constant
  while pending to prevent layout shift. Pass `preserveWidth={false}` to opt out.
- Updated dependencies []:
  - @opengovsg/oui-theme@0.0.57

## 0.0.56

### Patch Changes

- [#284](https://github.com/opengovsg/oui-design-system/pull/284) [`ce810e9`](https://github.com/opengovsg/oui-design-system/commit/ce810e9319dee6b251571a949ada2289ef474924) Thanks [@karrui](https://github.com/karrui)! - Add `preserveWidth` prop to `Button` to prevent layout shift while pending by keeping the children in the layout (visually hidden) and overlaying the spinner over them.

- [#287](https://github.com/opengovsg/oui-design-system/pull/287) [`e9f60f4`](https://github.com/opengovsg/oui-design-system/commit/e9f60f41fbaf705d68bae30ac0b19d26e577f47f) Thanks [@karrui](https://github.com/karrui)! - feat(govt-banner): restrict classNames to only the `banner` and `mainContentContainer` container slots

- Updated dependencies [[`ce810e9`](https://github.com/opengovsg/oui-design-system/commit/ce810e9319dee6b251571a949ada2289ef474924), [`e9f60f4`](https://github.com/opengovsg/oui-design-system/commit/e9f60f41fbaf705d68bae30ac0b19d26e577f47f)]:
  - @opengovsg/oui-theme@0.0.56

## 0.0.55

### Patch Changes

- [#266](https://github.com/opengovsg/oui-design-system/pull/266) [`66d621f`](https://github.com/opengovsg/oui-design-system/commit/66d621ff3b43648026ffc6e399cae40009f909aa) Thanks [@karrui](https://github.com/karrui)! - feat: ship AGENTS.md in package

- Updated dependencies [[`66d621f`](https://github.com/opengovsg/oui-design-system/commit/66d621ff3b43648026ffc6e399cae40009f909aa), [`95878f3`](https://github.com/opengovsg/oui-design-system/commit/95878f3d1bbad316f157dc71df14843837048bda)]:
  - @opengovsg/oui-theme@0.0.55

## 0.0.54

### Patch Changes

- [#262](https://github.com/opengovsg/oui-design-system/pull/262) [`0c76a48`](https://github.com/opengovsg/oui-design-system/commit/0c76a48bd87571a85af884e4965e91f1e21df0d7) Thanks [@karrui](https://github.com/karrui)! - fix(modal): prevent className prop from overriding all classnames

- Updated dependencies []:
  - @opengovsg/oui-theme@0.0.54

## 0.0.53

### Patch Changes

- [#258](https://github.com/opengovsg/oui-design-system/pull/258) [`7e09823`](https://github.com/opengovsg/oui-design-system/commit/7e09823e3ff1ea715ecaa931b6f56913b7e0d7e1) Thanks [@karrui](https://github.com/karrui)! - fix(govt-banner): hide panel using display:none if not expanded

- [#260](https://github.com/opengovsg/oui-design-system/pull/260) [`c283766`](https://github.com/opengovsg/oui-design-system/commit/c283766c58c4ffb7ca9c65ac196fcaf110757609) Thanks [@karrui](https://github.com/karrui)! - feat(spinner): render spinner prop as long as undefined

- Updated dependencies [[`7e09823`](https://github.com/opengovsg/oui-design-system/commit/7e09823e3ff1ea715ecaa931b6f56913b7e0d7e1), [`b15d62d`](https://github.com/opengovsg/oui-design-system/commit/b15d62d1fb6ec3e41b88a1930df12660dfceb92e), [`0f4a04d`](https://github.com/opengovsg/oui-design-system/commit/0f4a04db3469a5ece9fb88f6325d642c47452a52)]:
  - @opengovsg/oui-theme@0.0.53

## 0.0.52

### Patch Changes

- [#250](https://github.com/opengovsg/oui-design-system/pull/250) [`e97386f`](https://github.com/opengovsg/oui-design-system/commit/e97386f917e6312a9b981eda88eae6d6bfec7957) Thanks [@karrui](https://github.com/karrui)! - feat(search-field): allow adding of action element beside input group

- [#248](https://github.com/opengovsg/oui-design-system/pull/248) [`cb8e69c`](https://github.com/opengovsg/oui-design-system/commit/cb8e69c663bcf827e131f81a75dbe1420e429c53) Thanks [@karrui](https://github.com/karrui)! - fix(button): set spinner on size xs to xs size too

- Updated dependencies [[`e97386f`](https://github.com/opengovsg/oui-design-system/commit/e97386f917e6312a9b981eda88eae6d6bfec7957), [`5137b6d`](https://github.com/opengovsg/oui-design-system/commit/5137b6db2bc678b20228943da543536177aa0f1e), [`7d665b9`](https://github.com/opengovsg/oui-design-system/commit/7d665b9c94f47c5aabd895ded24d2640fccee2b5)]:
  - @opengovsg/oui-theme@0.0.52

## 0.0.51

### Patch Changes

- [#246](https://github.com/opengovsg/oui-design-system/pull/246) [`9807ab6`](https://github.com/opengovsg/oui-design-system/commit/9807ab60119114a96cec1638d83e723b524ef900) Thanks [@karrui](https://github.com/karrui)! - feat(file-dropzone): add per-MIME-type max file size support

- Updated dependencies []:
  - @opengovsg/oui-theme@0.0.51

## 0.0.50

### Patch Changes

- [#244](https://github.com/opengovsg/oui-design-system/pull/244) [`ed0fca5`](https://github.com/opengovsg/oui-design-system/commit/ed0fca582207d134641f5cefe3d3ff39a6bba7a1) Thanks [@karrui](https://github.com/karrui)! - feat(search-field): add clearIcon prop to override clear button icon

- Updated dependencies [[`1e153fc`](https://github.com/opengovsg/oui-design-system/commit/1e153fc8c12e84f8079559081fa3b670b1e7beb9)]:
  - @opengovsg/oui-theme@0.0.50

## 0.0.49

### Patch Changes

- [#222](https://github.com/opengovsg/oui-design-system/pull/222) [`41d91bb`](https://github.com/opengovsg/oui-design-system/commit/41d91bb8e6875032c5f2c60431fdba36a678977b) Thanks [@KishenKumarrrrr](https://github.com/KishenKumarrrrr)! - Add RadioGroup component with three size variants and full accessibility support

- [#184](https://github.com/opengovsg/oui-design-system/pull/184) [`aaf5635`](https://github.com/opengovsg/oui-design-system/commit/aaf56357c206f240c65f0ba62835bba774baecaa) Thanks [@KishenKumarrrrr](https://github.com/KishenKumarrrrr)! - Add InfoBox component for displaying info, warning, error, and success messages

- Updated dependencies [[`41d91bb`](https://github.com/opengovsg/oui-design-system/commit/41d91bb8e6875032c5f2c60431fdba36a678977b), [`aaf5635`](https://github.com/opengovsg/oui-design-system/commit/aaf56357c206f240c65f0ba62835bba774baecaa)]:
  - @opengovsg/oui-theme@0.0.49

## 0.0.48

### Patch Changes

- [#240](https://github.com/opengovsg/oui-design-system/pull/240) [`cbd12e4`](https://github.com/opengovsg/oui-design-system/commit/cbd12e405bf209bd0fd4e65dc7ef9fe7766e61ce) Thanks [@karrui](https://github.com/karrui)! - feat(checkbox): allow passing of renderProps into checkbox classnames

- [#236](https://github.com/opengovsg/oui-design-system/pull/236) [`92ffcce`](https://github.com/opengovsg/oui-design-system/commit/92ffcceea4f26783ec844f341a0b3b1dc7d908ee) Thanks [@karrui](https://github.com/karrui)! - feat(tab): reexport TabPanels from RAC

- [#240](https://github.com/opengovsg/oui-design-system/pull/240) [`cbd12e4`](https://github.com/opengovsg/oui-design-system/commit/cbd12e405bf209bd0fd4e65dc7ef9fe7766e61ce) Thanks [@karrui](https://github.com/karrui)! - refactor(tooltip): use renderChildren instead of composeRenderProps for class names

- [#242](https://github.com/opengovsg/oui-design-system/pull/242) [`c0a1c7d`](https://github.com/opengovsg/oui-design-system/commit/c0a1c7db9f5f45e6dcfc75daad47774f583616c1) Thanks [@karrui](https://github.com/karrui)! - feat(tag-field): add isVirtualised flag to disable virtualisation

- Updated dependencies [[`cbd12e4`](https://github.com/opengovsg/oui-design-system/commit/cbd12e405bf209bd0fd4e65dc7ef9fe7766e61ce), [`cbd12e4`](https://github.com/opengovsg/oui-design-system/commit/cbd12e405bf209bd0fd4e65dc7ef9fe7766e61ce)]:
  - @opengovsg/oui-theme@0.0.48

## 0.0.47

### Patch Changes

- [#234](https://github.com/opengovsg/oui-design-system/pull/234) [`785ccba`](https://github.com/opengovsg/oui-design-system/commit/785ccba811cb091fc9f80a39efa0b02db10ff1f9) Thanks [@karrui](https://github.com/karrui)! - fix(pagination): scope ellipsis group styles to prevent parent leakage

- Updated dependencies [[`da026ed`](https://github.com/opengovsg/oui-design-system/commit/da026ed48dc166e2dd4771368abf1c9e50da0bde), [`785ccba`](https://github.com/opengovsg/oui-design-system/commit/785ccba811cb091fc9f80a39efa0b02db10ff1f9)]:
  - @opengovsg/oui-theme@0.0.47

## 0.0.46

### Patch Changes

- [#226](https://github.com/opengovsg/oui-design-system/pull/226) [`00869e2`](https://github.com/opengovsg/oui-design-system/commit/00869e279fe3e4064e2a2c5164a9fb9ecfa60ef9) Thanks [@karrui](https://github.com/karrui)! - feat(select): allow custom rendering of select value

- [#230](https://github.com/opengovsg/oui-design-system/pull/230) [`f2ca7d1`](https://github.com/opengovsg/oui-design-system/commit/f2ca7d13530680b7f1b296807817e80bc1aeb6e0) Thanks [@karrui](https://github.com/karrui)! - feat: add PhoneNumberField component

- [#227](https://github.com/opengovsg/oui-design-system/pull/227) [`1095343`](https://github.com/opengovsg/oui-design-system/commit/1095343deb473d39a19317c0158c750cd99495d6) Thanks [@karrui](https://github.com/karrui)! - feat(select): pass popoverProps, recalculate trigger width for triggerRef

- [#228](https://github.com/opengovsg/oui-design-system/pull/228) [`3d4ae3d`](https://github.com/opengovsg/oui-design-system/commit/3d4ae3d2fad44e1762b8626478d8b2891c1e7ddb) Thanks [@karrui](https://github.com/karrui)! - feat(Field): Allow ref to be forwarded to Field component

- Updated dependencies [[`c57960b`](https://github.com/opengovsg/oui-design-system/commit/c57960b5bfdef8913c071aa1bda5309c03131ac2), [`f2ca7d1`](https://github.com/opengovsg/oui-design-system/commit/f2ca7d13530680b7f1b296807817e80bc1aeb6e0)]:
  - @opengovsg/oui-theme@0.0.46

## 0.0.45

### Patch Changes

- [#219](https://github.com/opengovsg/oui-design-system/pull/219) [`f98ea58`](https://github.com/opengovsg/oui-design-system/commit/f98ea58ffd6064d955296ce337305ea4324ea208) Thanks [@karrui](https://github.com/karrui)! - feat: add Sidebar component

- [#224](https://github.com/opengovsg/oui-design-system/pull/224) [`412b10b`](https://github.com/opengovsg/oui-design-system/commit/412b10b21d6fecb8333d01af190ae002cec36758) Thanks [@karrui](https://github.com/karrui)! - feat: add Tooltip component

- Updated dependencies [[`e11680f`](https://github.com/opengovsg/oui-design-system/commit/e11680fa55220229f8bb32378eb34fa94e7f2284), [`f98ea58`](https://github.com/opengovsg/oui-design-system/commit/f98ea58ffd6064d955296ce337305ea4324ea208), [`412b10b`](https://github.com/opengovsg/oui-design-system/commit/412b10b21d6fecb8333d01af190ae002cec36758)]:
  - @opengovsg/oui-theme@0.0.45

## 0.0.44

### Patch Changes

- [#220](https://github.com/opengovsg/oui-design-system/pull/220) [`1c8299e`](https://github.com/opengovsg/oui-design-system/commit/1c8299e8d2e3a24c56b16dcd24ba80515d2de29a) Thanks [@karrui](https://github.com/karrui)! - fix(modal): actually prevent dismiss on escape keypress

- Updated dependencies [[`6330888`](https://github.com/opengovsg/oui-design-system/commit/6330888f8ef5a102b031257b0b71d42ce9c66ab9), [`8ada2c6`](https://github.com/opengovsg/oui-design-system/commit/8ada2c68648f1dcca6731e52ca45eeb32156a179)]:
  - @opengovsg/oui-theme@0.0.44

## 0.0.43

### Patch Changes

- [#215](https://github.com/opengovsg/oui-design-system/pull/215) [`c03307b`](https://github.com/opengovsg/oui-design-system/commit/c03307b6b597031a8a7f31582f464bdee228bd3f) Thanks [@karrui](https://github.com/karrui)! - feat: add Breadcrumbs component

- Updated dependencies [[`c03307b`](https://github.com/opengovsg/oui-design-system/commit/c03307b6b597031a8a7f31582f464bdee228bd3f)]:
  - @opengovsg/oui-theme@0.0.43

## 0.0.42

### Patch Changes

- [#213](https://github.com/opengovsg/oui-design-system/pull/213) [`4d14739`](https://github.com/opengovsg/oui-design-system/commit/4d14739fd4aa42ca61d29769b06071eac0469e1a) Thanks [@karrui](https://github.com/karrui)! - feat: add Link component

- Updated dependencies [[`4d14739`](https://github.com/opengovsg/oui-design-system/commit/4d14739fd4aa42ca61d29769b06071eac0469e1a)]:
  - @opengovsg/oui-theme@0.0.42

## 0.0.41

### Patch Changes

- [#210](https://github.com/opengovsg/oui-design-system/pull/210) [`62ecaeb`](https://github.com/opengovsg/oui-design-system/commit/62ecaeb8451d5ffdda94959a6fb98500e98759a2) Thanks [@karrui](https://github.com/karrui)! - feat: add SearchField component

- [#208](https://github.com/opengovsg/oui-design-system/pull/208) [`66b9ba3`](https://github.com/opengovsg/oui-design-system/commit/66b9ba35832a6540f884e1fbfbe5647abf079d03) Thanks [@karrui](https://github.com/karrui)! - refactor: update all usage of useMessageFormatter to useLocalizedStringFormatter

- Updated dependencies [[`62ecaeb`](https://github.com/opengovsg/oui-design-system/commit/62ecaeb8451d5ffdda94959a6fb98500e98759a2), [`db086ea`](https://github.com/opengovsg/oui-design-system/commit/db086ea4a2a70dd59e61dd96a879e1f882adc188)]:
  - @opengovsg/oui-theme@0.0.41

## 0.0.40

### Patch Changes

- [#205](https://github.com/opengovsg/oui-design-system/pull/205) [`c8da99d`](https://github.com/opengovsg/oui-design-system/commit/c8da99dd5c3821795c7942534a2040881aa4c9f5) Thanks [@karrui](https://github.com/karrui)! - feat(date-field): update styles and variant props

- [#205](https://github.com/opengovsg/oui-design-system/pull/205) [`c8da99d`](https://github.com/opengovsg/oui-design-system/commit/c8da99dd5c3821795c7942534a2040881aa4c9f5) Thanks [@karrui](https://github.com/karrui)! - feat(time-field): add TimeField component

- [#205](https://github.com/opengovsg/oui-design-system/pull/205) [`c8da99d`](https://github.com/opengovsg/oui-design-system/commit/c8da99dd5c3821795c7942534a2040881aa4c9f5) Thanks [@karrui](https://github.com/karrui)! - feat(date-pickers): update styling due to changes in underlying date field styling

- [#205](https://github.com/opengovsg/oui-design-system/pull/205) [`c8da99d`](https://github.com/opengovsg/oui-design-system/commit/c8da99dd5c3821795c7942534a2040881aa4c9f5) Thanks [@karrui](https://github.com/karrui)! - feat: export DateField and DateInput props

- Updated dependencies [[`c8da99d`](https://github.com/opengovsg/oui-design-system/commit/c8da99dd5c3821795c7942534a2040881aa4c9f5), [`c8da99d`](https://github.com/opengovsg/oui-design-system/commit/c8da99dd5c3821795c7942534a2040881aa4c9f5), [`c8da99d`](https://github.com/opengovsg/oui-design-system/commit/c8da99dd5c3821795c7942534a2040881aa4c9f5)]:
  - @opengovsg/oui-theme@0.0.40

## 0.0.39

### Patch Changes

- [#202](https://github.com/opengovsg/oui-design-system/pull/202) [`5db8927`](https://github.com/opengovsg/oui-design-system/commit/5db89279c5990bc4c0605a996e66b8b704cd830d) Thanks [@karrui](https://github.com/karrui)! - feat(modal): pass controlled props to overlay only

- Updated dependencies [[`23764e6`](https://github.com/opengovsg/oui-design-system/commit/23764e669cf77e73408baeb1de8ea6db7916dbcf)]:
  - @opengovsg/oui-theme@0.0.39

## 0.0.38

### Patch Changes

- [#198](https://github.com/opengovsg/oui-design-system/pull/198) [`553bdfd`](https://github.com/opengovsg/oui-design-system/commit/553bdfdc24a432809e42cf5883782033def1fa17) Thanks [@karrui](https://github.com/karrui)! - feat(accordion): expose AccordionProps interface

- Updated dependencies [[`2db1b7f`](https://github.com/opengovsg/oui-design-system/commit/2db1b7fa82bf09d1655c286c5bb7a6e541ac46c6), [`2db1b7f`](https://github.com/opengovsg/oui-design-system/commit/2db1b7fa82bf09d1655c286c5bb7a6e541ac46c6), [`2db1b7f`](https://github.com/opengovsg/oui-design-system/commit/2db1b7fa82bf09d1655c286c5bb7a6e541ac46c6)]:
  - @opengovsg/oui-theme@0.0.38

## 0.0.37

### Patch Changes

- [#195](https://github.com/opengovsg/oui-design-system/pull/195) [`bd1f779`](https://github.com/opengovsg/oui-design-system/commit/bd1f779b9b8931c439d925c21d42cf25134981a3) Thanks [@karrui](https://github.com/karrui)! - feat: run pnpm audit --fix for package overrides

- [#197](https://github.com/opengovsg/oui-design-system/pull/197) [`73e1e2a`](https://github.com/opengovsg/oui-design-system/commit/73e1e2a1a8ec0082762c362941be82cfd91c6a28) Thanks [@karrui](https://github.com/karrui)! - feat(tabs): update ref to only accept HTMLDivElement type

- [#197](https://github.com/opengovsg/oui-design-system/pull/197) [`73e1e2a`](https://github.com/opengovsg/oui-design-system/commit/73e1e2a1a8ec0082762c362941be82cfd91c6a28) Thanks [@karrui](https://github.com/karrui)! - feat: update react-aria packages and bump peerDep version

- [#197](https://github.com/opengovsg/oui-design-system/pull/197) [`73e1e2a`](https://github.com/opengovsg/oui-design-system/commit/73e1e2a1a8ec0082762c362941be82cfd91c6a28) Thanks [@karrui](https://github.com/karrui)! - feat(menu): update ref to only accept HTMLDivElement type

- Updated dependencies [[`bd1f779`](https://github.com/opengovsg/oui-design-system/commit/bd1f779b9b8931c439d925c21d42cf25134981a3), [`bd1f779`](https://github.com/opengovsg/oui-design-system/commit/bd1f779b9b8931c439d925c21d42cf25134981a3), [`bd1f779`](https://github.com/opengovsg/oui-design-system/commit/bd1f779b9b8931c439d925c21d42cf25134981a3)]:
  - @opengovsg/oui-theme@0.0.37

## 0.0.36

### Patch Changes

- [#193](https://github.com/opengovsg/oui-design-system/pull/193) [`aef86e3`](https://github.com/opengovsg/oui-design-system/commit/aef86e3465a0a51c6af56ff4f2acdb3d7cd3095e) Thanks [@karrui](https://github.com/karrui)! - feat(select): export SelectItemProps type

- Updated dependencies [[`aef86e3`](https://github.com/opengovsg/oui-design-system/commit/aef86e3465a0a51c6af56ff4f2acdb3d7cd3095e)]:
  - @opengovsg/oui-theme@0.0.36

## 0.0.35

### Patch Changes

- Updated dependencies [[`da47eed`](https://github.com/opengovsg/oui-design-system/commit/da47eed882d14eb2ab4bf74ff0a64d322754f3a2)]:
  - @opengovsg/oui-theme@0.0.35

## 0.0.34

### Patch Changes

- [#189](https://github.com/opengovsg/oui-design-system/pull/189) [`89a4015`](https://github.com/opengovsg/oui-design-system/commit/89a4015f6c15fa59e5e5598a921a699921a48b3b) Thanks [@karrui](https://github.com/karrui)! - fix(accordion): properly show endContent

- [#189](https://github.com/opengovsg/oui-design-system/pull/189) [`89a4015`](https://github.com/opengovsg/oui-design-system/commit/89a4015f6c15fa59e5e5598a921a699921a48b3b) Thanks [@karrui](https://github.com/karrui)! - fix(accordion): pass in isExpanded prop to indicator

- Updated dependencies [[`89a4015`](https://github.com/opengovsg/oui-design-system/commit/89a4015f6c15fa59e5e5598a921a699921a48b3b)]:
  - @opengovsg/oui-theme@0.0.34

## 0.0.33

### Patch Changes

- [#186](https://github.com/opengovsg/oui-design-system/pull/186) [`d8b3944`](https://github.com/opengovsg/oui-design-system/commit/d8b3944021da0e9df2b64674d2e6d986a588138e) Thanks [@karrui](https://github.com/karrui)! - feat(button): allow children(-like) prop(s) to be functions

- [#187](https://github.com/opengovsg/oui-design-system/pull/187) [`10dc877`](https://github.com/opengovsg/oui-design-system/commit/10dc8772d987967182ed5aadd7ec90ab11d226f5) Thanks [@karrui](https://github.com/karrui)! - feat: add Accordion component

- Updated dependencies [[`10dc877`](https://github.com/opengovsg/oui-design-system/commit/10dc8772d987967182ed5aadd7ec90ab11d226f5)]:
  - @opengovsg/oui-theme@0.0.33

## 0.0.32

### Patch Changes

- [#183](https://github.com/opengovsg/oui-design-system/pull/183) [`2dcce59`](https://github.com/opengovsg/oui-design-system/commit/2dcce59f4112c083a3b64d0e95a12ddc9b214a44) Thanks [@aakashgupta0205](https://github.com/aakashgupta0205)! - feat: add search functionality to Select component

- Updated dependencies [[`2dcce59`](https://github.com/opengovsg/oui-design-system/commit/2dcce59f4112c083a3b64d0e95a12ddc9b214a44), [`2dcce59`](https://github.com/opengovsg/oui-design-system/commit/2dcce59f4112c083a3b64d0e95a12ddc9b214a44)]:
  - @opengovsg/oui-theme@0.0.32

## 0.0.31

### Patch Changes

- [#180](https://github.com/opengovsg/oui-design-system/pull/180) [`54ee0bd`](https://github.com/opengovsg/oui-design-system/commit/54ee0bd9dc7443a143c8c8129dc4939e1ba0c1f8) Thanks [@karrui](https://github.com/karrui)! - feat(components): add AvatarGroup component

- [#180](https://github.com/opengovsg/oui-design-system/pull/180) [`54ee0bd`](https://github.com/opengovsg/oui-design-system/commit/54ee0bd9dc7443a143c8c8129dc4939e1ba0c1f8) Thanks [@karrui](https://github.com/karrui)! - feat(component): add generic arg to return proper types for lenient context usage

- [#180](https://github.com/opengovsg/oui-design-system/pull/180) [`54ee0bd`](https://github.com/opengovsg/oui-design-system/commit/54ee0bd9dc7443a143c8c8129dc4939e1ba0c1f8) Thanks [@karrui](https://github.com/karrui)! - feat(components): add avatar component

- Updated dependencies [[`54ee0bd`](https://github.com/opengovsg/oui-design-system/commit/54ee0bd9dc7443a143c8c8129dc4939e1ba0c1f8), [`54ee0bd`](https://github.com/opengovsg/oui-design-system/commit/54ee0bd9dc7443a143c8c8129dc4939e1ba0c1f8), [`82bd3ac`](https://github.com/opengovsg/oui-design-system/commit/82bd3acef841bd4fbe50a1ad7cd8fbb87dddcb92)]:
  - @opengovsg/oui-theme@0.0.31

## 0.0.30

### Patch Changes

- [#175](https://github.com/opengovsg/oui-design-system/pull/175) [`4d55362`](https://github.com/opengovsg/oui-design-system/commit/4d553622ab89a0ad08880370624789bcd6793ac7) Thanks [@karrui](https://github.com/karrui)! - feat(navbar): add prop to show navbar on scroll up if static position

- [#175](https://github.com/opengovsg/oui-design-system/pull/175) [`4d55362`](https://github.com/opengovsg/oui-design-system/commit/4d553622ab89a0ad08880370624789bcd6793ac7) Thanks [@karrui](https://github.com/karrui)! - feat(navbar): calculate menu offset using navbar bounding rect

- [#176](https://github.com/opengovsg/oui-design-system/pull/176) [`8a78d97`](https://github.com/opengovsg/oui-design-system/commit/8a78d974f572c0b0ac7e0b03a434bbfc2bbefcb3) Thanks [@calebchiam](https://github.com/calebchiam)! - feat(dropzone): add prop to configure file size base system

- Updated dependencies [[`4d55362`](https://github.com/opengovsg/oui-design-system/commit/4d553622ab89a0ad08880370624789bcd6793ac7)]:
  - @opengovsg/oui-theme@0.0.30

## 0.0.29

### Patch Changes

- [#173](https://github.com/opengovsg/oui-design-system/pull/173) [`a625ca7`](https://github.com/opengovsg/oui-design-system/commit/a625ca726bcdefcf87300fc305081d40037dce09) Thanks [@karrui](https://github.com/karrui)! - feat(components): add Navbar template component

- Updated dependencies [[`a625ca7`](https://github.com/opengovsg/oui-design-system/commit/a625ca726bcdefcf87300fc305081d40037dce09)]:
  - @opengovsg/oui-theme@0.0.29

## 0.0.28

### Patch Changes

- [#171](https://github.com/opengovsg/oui-design-system/pull/171) [`2b834c8`](https://github.com/opengovsg/oui-design-system/commit/2b834c845ddaaf35f392280105dda29920c7f0ce) Thanks [@karrui](https://github.com/karrui)! - feat(toast): update styling and defaults

- Updated dependencies [[`2b834c8`](https://github.com/opengovsg/oui-design-system/commit/2b834c845ddaaf35f392280105dda29920c7f0ce)]:
  - @opengovsg/oui-theme@0.0.28

## 0.0.27

### Patch Changes

- [#169](https://github.com/opengovsg/oui-design-system/pull/169) [`be831fb`](https://github.com/opengovsg/oui-design-system/commit/be831fbcaee53c0382c845b4b049a2031bc0f5e8) Thanks [@karrui](https://github.com/karrui)! - feat(components): add toast component with Sonner

- Updated dependencies [[`be831fb`](https://github.com/opengovsg/oui-design-system/commit/be831fbcaee53c0382c845b4b049a2031bc0f5e8), [`be831fb`](https://github.com/opengovsg/oui-design-system/commit/be831fbcaee53c0382c845b4b049a2031bc0f5e8)]:
  - @opengovsg/oui-theme@0.0.27

## 0.0.26

### Patch Changes

- [#165](https://github.com/opengovsg/oui-design-system/pull/165) [`b08964e`](https://github.com/opengovsg/oui-design-system/commit/b08964ec81df2f807702a1937b67ff839f788195) Thanks [@karrui](https://github.com/karrui)! - feat: update rac peer dependency's version

- Updated dependencies [[`d07d695`](https://github.com/opengovsg/oui-design-system/commit/d07d6954200c7d6ea4330ceebc15ad36f454367e), [`d07d695`](https://github.com/opengovsg/oui-design-system/commit/d07d6954200c7d6ea4330ceebc15ad36f454367e)]:
  - @opengovsg/oui-theme@0.0.26

## 0.0.25

### Patch Changes

- [#93](https://github.com/opengovsg/oui-design-system/pull/93) [`a5aba3e`](https://github.com/opengovsg/oui-design-system/commit/a5aba3e6945d324e8ec1e48db69a1d5c801f6cef) Thanks [@karrui](https://github.com/karrui)! - feat: add useDraggable hook

- [#93](https://github.com/opengovsg/oui-design-system/pull/93) [`a5aba3e`](https://github.com/opengovsg/oui-design-system/commit/a5aba3e6945d324e8ec1e48db69a1d5c801f6cef) Thanks [@karrui](https://github.com/karrui)! - feat: add Modal component

- [#93](https://github.com/opengovsg/oui-design-system/pull/93) [`a5aba3e`](https://github.com/opengovsg/oui-design-system/commit/a5aba3e6945d324e8ec1e48db69a1d5c801f6cef) Thanks [@karrui](https://github.com/karrui)! - feat: add Modal component

- Updated dependencies [[`a5aba3e`](https://github.com/opengovsg/oui-design-system/commit/a5aba3e6945d324e8ec1e48db69a1d5c801f6cef), [`a5aba3e`](https://github.com/opengovsg/oui-design-system/commit/a5aba3e6945d324e8ec1e48db69a1d5c801f6cef)]:
  - @opengovsg/oui-theme@0.0.25

## 0.0.24

### Patch Changes

- [#156](https://github.com/opengovsg/oui-design-system/pull/156) [`de10a85`](https://github.com/opengovsg/oui-design-system/commit/de10a85f4b0319304e36937335d860b4fed672fb) Thanks [@karrui](https://github.com/karrui)! - feat: export package.json

- [#156](https://github.com/opengovsg/oui-design-system/pull/156) [`de10a85`](https://github.com/opengovsg/oui-design-system/commit/de10a85f4b0319304e36937335d860b4fed672fb) Thanks [@karrui](https://github.com/karrui)! - feat: update react-aria dependency versions

- Updated dependencies [[`de10a85`](https://github.com/opengovsg/oui-design-system/commit/de10a85f4b0319304e36937335d860b4fed672fb), [`de10a85`](https://github.com/opengovsg/oui-design-system/commit/de10a85f4b0319304e36937335d860b4fed672fb)]:
  - @opengovsg/oui-theme@0.0.24

## 0.0.23

### Patch Changes

- [#153](https://github.com/opengovsg/oui-design-system/pull/153) [`1f7c9a8`](https://github.com/opengovsg/oui-design-system/commit/1f7c9a80b135ea1bc65b8003881534eb5f52b6b3) Thanks [@karrui](https://github.com/karrui)! - feat(components): add NumberField component

- Updated dependencies [[`1f7c9a8`](https://github.com/opengovsg/oui-design-system/commit/1f7c9a80b135ea1bc65b8003881534eb5f52b6b3)]:
  - @opengovsg/oui-theme@0.0.23

## 0.0.22

### Patch Changes

- [#152](https://github.com/opengovsg/oui-design-system/pull/152) [`be57b0d`](https://github.com/opengovsg/oui-design-system/commit/be57b0d6826102304e62e18b5c478def6f114778) Thanks [@karrui](https://github.com/karrui)! - feat(field): allow overriding of slot for Description

- [#148](https://github.com/opengovsg/oui-design-system/pull/148) [`098a678`](https://github.com/opengovsg/oui-design-system/commit/098a6780a7501bd1526697a76893ae0f02e578b0) Thanks [@karrui](https://github.com/karrui)! - feat(calendar): add extra width to year picker to accomodate scrollbar

- [#152](https://github.com/opengovsg/oui-design-system/pull/152) [`be57b0d`](https://github.com/opengovsg/oui-design-system/commit/be57b0d6826102304e62e18b5c478def6f114778) Thanks [@karrui](https://github.com/karrui)! - feat(components): add FileDropzone component

- [#148](https://github.com/opengovsg/oui-design-system/pull/148) [`098a678`](https://github.com/opengovsg/oui-design-system/commit/098a6780a7501bd1526697a76893ae0f02e578b0) Thanks [@karrui](https://github.com/karrui)! - feat(date-picker): allow passing of classNames to inner components

- Updated dependencies [[`be57b0d`](https://github.com/opengovsg/oui-design-system/commit/be57b0d6826102304e62e18b5c478def6f114778), [`098a678`](https://github.com/opengovsg/oui-design-system/commit/098a6780a7501bd1526697a76893ae0f02e578b0)]:
  - @opengovsg/oui-theme@0.0.22

## 0.0.21

### Patch Changes

- [#146](https://github.com/opengovsg/oui-design-system/pull/146) [`6591c46`](https://github.com/opengovsg/oui-design-system/commit/6591c465576a3b6dd5469ff5eb1559a93e5f7ad4) Thanks [@karrui](https://github.com/karrui)! - feat(date-field): allow overriding date input props with `inputProps`

- [#146](https://github.com/opengovsg/oui-design-system/pull/146) [`6591c46`](https://github.com/opengovsg/oui-design-system/commit/6591c465576a3b6dd5469ff5eb1559a93e5f7ad4) Thanks [@karrui](https://github.com/karrui)! - fix(fielderror): render error icon only if string children

- [#146](https://github.com/opengovsg/oui-design-system/pull/146) [`6591c46`](https://github.com/opengovsg/oui-design-system/commit/6591c465576a3b6dd5469ff5eb1559a93e5f7ad4) Thanks [@karrui](https://github.com/karrui)! - feat(date-field): default to full width

- [#146](https://github.com/opengovsg/oui-design-system/pull/146) [`6591c46`](https://github.com/opengovsg/oui-design-system/commit/6591c465576a3b6dd5469ff5eb1559a93e5f7ad4) Thanks [@karrui](https://github.com/karrui)! - feat(date-field): allow styling segment based on editable state

- Updated dependencies [[`6591c46`](https://github.com/opengovsg/oui-design-system/commit/6591c465576a3b6dd5469ff5eb1559a93e5f7ad4)]:
  - @opengovsg/oui-theme@0.0.21

## 0.0.20

### Patch Changes

- [#137](https://github.com/opengovsg/oui-design-system/pull/137) [`6596d7f`](https://github.com/opengovsg/oui-design-system/commit/6596d7ffdc8ca54916a52b799132b9d562c569af) Thanks [@karrui](https://github.com/karrui)! - feat(banner): allow nullable startContent and fix controllable state

- Updated dependencies []:
  - @opengovsg/oui-theme@0.0.20

## 0.0.19

### Patch Changes

- [#130](https://github.com/opengovsg/oui-design-system/pull/130) [`df95e34`](https://github.com/opengovsg/oui-design-system/commit/df95e34399c6a63d28acd4cc47f9fa62711b04a5) Thanks [@karrui](https://github.com/karrui)! - feat(toggle): add `labelPlacement` prop to allow label to be before toggle

- [#131](https://github.com/opengovsg/oui-design-system/pull/131) [`41d06f3`](https://github.com/opengovsg/oui-design-system/commit/41d06f3d80e8b98cdfd417dbae03d30fcd5683e4) Thanks [@karrui](https://github.com/karrui)! - feat(combo-box): add inputProps prop for props passthrough to input

- Updated dependencies []:
  - @opengovsg/oui-theme@0.0.19

## 0.0.18

### Patch Changes

- [#128](https://github.com/opengovsg/oui-design-system/pull/128) [`d7e4f5d`](https://github.com/opengovsg/oui-design-system/commit/d7e4f5d40073ba0a1f9b6aa3233a4b414b1ed94d) Thanks [@karrui](https://github.com/karrui)! - feat(range-calendar): add `shouldSetDateOnTodayButtonClick` prop handling

- [#128](https://github.com/opengovsg/oui-design-system/pull/128) [`d7e4f5d`](https://github.com/opengovsg/oui-design-system/commit/d7e4f5d40073ba0a1f9b6aa3233a4b414b1ed94d) Thanks [@karrui](https://github.com/karrui)! - feat(calendar): add `shouldSetDateOnTodayButtonClick` prop handling

- Updated dependencies []:
  - @opengovsg/oui-theme@0.0.18

## 0.0.17

### Patch Changes

- Updated dependencies [[`82f07e4`](https://github.com/opengovsg/oui-design-system/commit/82f07e41756417ef2d0a0c9ee2ebb9d15c3a7088)]:
  - @opengovsg/oui-theme@0.0.17

## 0.0.16

### Patch Changes

- [#123](https://github.com/opengovsg/oui-design-system/pull/123) [`a5b3827`](https://github.com/opengovsg/oui-design-system/commit/a5b38274213bd1e51beb920eff678748236b1f10) Thanks [@karrui](https://github.com/karrui)! - feat: update dependencies

- Updated dependencies [[`a5b3827`](https://github.com/opengovsg/oui-design-system/commit/a5b38274213bd1e51beb920eff678748236b1f10)]:
  - @opengovsg/oui-theme@0.0.16

## 0.0.15

### Patch Changes

- [#120](https://github.com/opengovsg/oui-design-system/pull/120) [`c901e0c`](https://github.com/opengovsg/oui-design-system/commit/c901e0c2bda669d3311242494ee5fb201bb8d694) Thanks [@karrui](https://github.com/karrui)! - feat: make react a peer dependency instead of a dependency

- [#119](https://github.com/opengovsg/oui-design-system/pull/119) [`30e967f`](https://github.com/opengovsg/oui-design-system/commit/30e967f00f56e3f8b878e9285b619c6f93c9d656) Thanks [@karrui](https://github.com/karrui)! - fix(select): prevent className prop from overriding everything

- Updated dependencies [[`c901e0c`](https://github.com/opengovsg/oui-design-system/commit/c901e0c2bda669d3311242494ee5fb201bb8d694)]:
  - @opengovsg/oui-theme@0.0.15

## 0.0.14

### Patch Changes

- [#115](https://github.com/opengovsg/oui-design-system/pull/115) [`e9f4e22`](https://github.com/opengovsg/oui-design-system/commit/e9f4e22731d0903e6cedf57747df7091bc7875fb) Thanks [@karrui](https://github.com/karrui)! - feat(badge): export BadgeProps type

- [#116](https://github.com/opengovsg/oui-design-system/pull/116) [`3b00a2d`](https://github.com/opengovsg/oui-design-system/commit/3b00a2d03c656d5f726905cb6ebb61c79f750311) Thanks [@karrui](https://github.com/karrui)! - feat: add checkbox and checkbox-group components

- [#118](https://github.com/opengovsg/oui-design-system/pull/118) [`f4f0409`](https://github.com/opengovsg/oui-design-system/commit/f4f040947bba6539c319c9610caadfd4a3d52f8c) Thanks [@karrui](https://github.com/karrui)! - feat: add Pagination component

- Updated dependencies [[`3b00a2d`](https://github.com/opengovsg/oui-design-system/commit/3b00a2d03c656d5f726905cb6ebb61c79f750311), [`f4f0409`](https://github.com/opengovsg/oui-design-system/commit/f4f040947bba6539c319c9610caadfd4a3d52f8c)]:
  - @opengovsg/oui-theme@0.0.14

## 0.0.13

### Patch Changes

- [#110](https://github.com/opengovsg/oui-design-system/pull/110) [`a7fa199`](https://github.com/opengovsg/oui-design-system/commit/a7fa199f092b4108396b3f870e12c8ca4d4e7049) Thanks [@karrui](https://github.com/karrui)! - fix(govt-banner): add content as key so react doesn't show key warning

- [#114](https://github.com/opengovsg/oui-design-system/pull/114) [`8a66d37`](https://github.com/opengovsg/oui-design-system/commit/8a66d37a8c4b166e599e69034e1b5c004424333e) Thanks [@karrui](https://github.com/karrui)! - feat(govt-banner): remove unnecessary i18n causing react key warnings

- Updated dependencies [[`8b11b2e`](https://github.com/opengovsg/oui-design-system/commit/8b11b2e2c80e89a2660ae5820efeb5afa85b5197), [`3c64a91`](https://github.com/opengovsg/oui-design-system/commit/3c64a9110a22b99a31ce9a4ca4d69f5dcb1b8af9)]:
  - @opengovsg/oui-theme@0.0.13

## 0.0.12

### Patch Changes

- [#107](https://github.com/opengovsg/oui-design-system/pull/107) [`adcb791`](https://github.com/opengovsg/oui-design-system/commit/adcb7919cb5cec6a83659170bbeda9f8b870a5d0) Thanks [@karrui](https://github.com/karrui)! - feat(date-field): add date field component

- [#107](https://github.com/opengovsg/oui-design-system/pull/107) [`adcb791`](https://github.com/opengovsg/oui-design-system/commit/adcb7919cb5cec6a83659170bbeda9f8b870a5d0) Thanks [@karrui](https://github.com/karrui)! - feat(button): add isAttached variant to remove start radii

- [#107](https://github.com/opengovsg/oui-design-system/pull/107) [`adcb791`](https://github.com/opengovsg/oui-design-system/commit/adcb7919cb5cec6a83659170bbeda9f8b870a5d0) Thanks [@karrui](https://github.com/karrui)! - feat(date-picker): add date picker component

- [#107](https://github.com/opengovsg/oui-design-system/pull/107) [`adcb791`](https://github.com/opengovsg/oui-design-system/commit/adcb7919cb5cec6a83659170bbeda9f8b870a5d0) Thanks [@karrui](https://github.com/karrui)! - feat(components): add date-range-picker component

- [#107](https://github.com/opengovsg/oui-design-system/pull/107) [`adcb791`](https://github.com/opengovsg/oui-design-system/commit/adcb7919cb5cec6a83659170bbeda9f8b870a5d0) Thanks [@karrui](https://github.com/karrui)! - feat(popover): set overflow auto on base theme

- Updated dependencies [[`adcb791`](https://github.com/opengovsg/oui-design-system/commit/adcb7919cb5cec6a83659170bbeda9f8b870a5d0), [`adcb791`](https://github.com/opengovsg/oui-design-system/commit/adcb7919cb5cec6a83659170bbeda9f8b870a5d0), [`adcb791`](https://github.com/opengovsg/oui-design-system/commit/adcb7919cb5cec6a83659170bbeda9f8b870a5d0), [`adcb791`](https://github.com/opengovsg/oui-design-system/commit/adcb7919cb5cec6a83659170bbeda9f8b870a5d0), [`adcb791`](https://github.com/opengovsg/oui-design-system/commit/adcb7919cb5cec6a83659170bbeda9f8b870a5d0)]:
  - @opengovsg/oui-theme@0.0.12

## 0.0.11

### Patch Changes

- [#91](https://github.com/opengovsg/oui-design-system/pull/91) [`44bea54`](https://github.com/opengovsg/oui-design-system/commit/44bea54ab94b3ecee5dbc33e947b7a0c570d19d6) Thanks [@karrui](https://github.com/karrui)! - feat: add Tabs component (and its subcomponents)

- [#92](https://github.com/opengovsg/oui-design-system/pull/92) [`19d2a8b`](https://github.com/opengovsg/oui-design-system/commit/19d2a8b84be393ccfe398483efbe549de07bd620) Thanks [@karrui](https://github.com/karrui)! - feat: allow label and description props to be react nodes

- Updated dependencies [[`44bea54`](https://github.com/opengovsg/oui-design-system/commit/44bea54ab94b3ecee5dbc33e947b7a0c570d19d6)]:
  - @opengovsg/oui-theme@0.0.11
