import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import { siteConfig } from "@/config/site"

/**
 * Shared options for the Fumadocs layouts (nav title, GitHub link, external
 * links). Used by the docs layout.
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <span className="font-semibold">{siteConfig.title}</span>,
      url: "/docs",
    },
    githubUrl: siteConfig.repoUrl,
    links: [
      {
        type: "main",
        text: "Storybook",
        url: siteConfig.storybookUrl,
        external: true,
      },
    ],
  }
}
