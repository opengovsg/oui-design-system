import { cn } from "@opengovsg/oui-theme"

export type NavStatus = "new" | "updated" | "wip" | "redirect"

const PILL =
  "ml-2 inline-flex items-center rounded-full px-1.5 py-px text-[0.625rem] leading-none font-medium align-middle"

/**
 * Status badge rendered after a sidebar item's title, driven by each doc's
 * `status` frontmatter via `statusBadgesPlugin`.
 *
 * Rendered as an inline `<span>` (not the OUI `Badge`, which is a `<div>`)
 * because fumadocs reuses the page-tree `name` inside `<p>` elements (e.g. the
 * prev/next footer), where a block-level `<div>` would be invalid nesting and
 * cause a hydration error.
 */
export function NavBadge({ status }: { status?: NavStatus }) {
  switch (status) {
    case "new":
      return (
        <span
          className={cn(
            PILL,
            "border border-white/50 bg-linear-to-br from-indigo-500 to-pink-500 text-white shadow-sm",
          )}
        >
          New
        </span>
      )
    case "updated":
      return (
        <span
          className={cn(
            PILL,
            "from-brand-primary-200 to-brand-primary-400 border border-white/50 bg-linear-to-br text-white shadow-sm",
          )}
        >
          Updated
        </span>
      )
    case "wip":
      return (
        <span
          className={cn(
            PILL,
            "border-base-divider-strong text-fd-muted-foreground border",
          )}
        >
          WIP
        </span>
      )
    case "redirect":
      return (
        <span
          className={cn(
            PILL,
            "border-base-divider-strong text-fd-muted-foreground border",
          )}
          aria-label="Redirects elsewhere"
        >
          ↗
        </span>
      )
    default:
      return null
  }
}
