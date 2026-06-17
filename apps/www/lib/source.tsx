import type { NavStatus } from "@/app/docs/components/nav-badge"
import { docs } from "@/.source"
import { NavBadge } from "@/app/docs/components/nav-badge"
import { loader } from "fumadocs-core/source"
import { statusBadgesPlugin } from "fumadocs-core/source/plugins/status-badges"

/**
 * The docs content source, backed by Fumadocs MDX (`content/docs/**`).
 *
 * `statusBadgesPlugin` reads each doc's `status` frontmatter and appends the
 * matching badge to its sidebar entry — the fumadocs-native replacement for
 * the old hand-maintained `status` field in `config/docs.config.ts`.
 */
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [
    statusBadgesPlugin({
      renderBadge: (status) => <NavBadge status={status as NavStatus} />,
    }),
  ],
})
