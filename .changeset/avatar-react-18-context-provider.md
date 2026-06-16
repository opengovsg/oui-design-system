---
"@opengovsg/oui": patch
---

fix(avatar): render context providers via Context.Provider

`Avatar` and `AvatarGroup` now render their context providers explicitly via
`Context.Provider` instead of the React 19-only `<Context value>` shorthand.
On React 18 (declared in the `react: ">= 18"` peer range) the shorthand logged
`Warning: Rendering <Context> directly is not supported ...` and treated the
element as a `Context.Consumer`, so the provided value was not reliably
delivered to `Avatar.Image` / `Avatar.Fallback`. Rendering works on React 18
and 19 with no warning.
