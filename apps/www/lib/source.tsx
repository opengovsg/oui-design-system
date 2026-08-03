import { loader } from "fumadocs-core/source"
import { statusBadgesPlugin } from "fumadocs-core/source/plugins/status-badges"

import { docs } from "@/.source"
import type { NavStatus } from "@/app/docs/components/nav-badge"
import { NavBadge } from "@/app/docs/components/nav-badge"

/**
 * The docs content source, backed by Fumadocs MDX (`content/docs/**`).
 *
 * `statusBadgesPlugin` reads each doc's `status` frontmatter and appends the
 * matching badge to its sidebar entry.
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
