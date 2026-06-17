import { Badge } from "@opengovsg/oui"

export type NavStatus = "new" | "updated" | "wip" | "redirect"

/**
 * Status badge rendered after a sidebar item's title. Mirrors the badges the
 * pre-fumadocs sidebar showed for the `status` field in docs.config.ts, now
 * driven by each doc's `label` frontmatter.
 */
export function NavBadge({ status }: { status?: NavStatus }) {
  switch (status) {
    case "new":
      return (
        <Badge
          classNames={{
            base: "ml-2 bg-linear-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
            content: "drop-shadow shadow-black text-white",
          }}
          variant="solid"
          radius="full"
          size="xs"
        >
          New
        </Badge>
      )
    case "updated":
      return (
        <Badge
          classNames={{
            base: "ml-2 bg-linear-to-br from-brand-primary-200 to-brand-primary-400 border-small border-white/50 shadow-blue-500/30",
            content: "drop-shadow shadow-black text-white",
          }}
          variant="solid"
          radius="full"
          size="xs"
        >
          Updated
        </Badge>
      )
    case "wip":
      return (
        <Badge
          variant="outline"
          radius="full"
          color="neutral"
          className="ml-2 decoration-inherit"
          size="xs"
        >
          WIP
        </Badge>
      )
    case "redirect":
      return (
        <Badge
          variant="outline"
          radius="full"
          color="neutral"
          className="ml-2 bg-transparent decoration-inherit"
          size="xs"
        >
          ↗
        </Badge>
      )
    default:
      return null
  }
}
