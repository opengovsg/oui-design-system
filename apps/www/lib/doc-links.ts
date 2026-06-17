import { siteConfig } from "@/config/site"

/** Raw `links` frontmatter as authored in each doc. */
export interface RawDocLinks {
  source?: string
  theme?: string
  storybook?: string
  reactaria?: string
}

/** Fully-qualified external URLs derived from {@link RawDocLinks}. */
export interface ResolvedDocLinks {
  source?: string
  theme?: string
  storybook?: string
  reactaria?: string
}

/**
 * Expand the shorthand `links` frontmatter into absolute URLs at render time,
 * keeping the frontmatter schema plain data.
 */
export function resolveDocLinks(links?: RawDocLinks): ResolvedDocLinks {
  if (!links) return {}
  return {
    source: links.source
      ? `${siteConfig.repoUrl}/tree/${siteConfig.repoBranch}/packages/components/src/${links.source}`
      : undefined,
    storybook: links.storybook
      ? `${siteConfig.storybookUrl}/?path=/story/${links.storybook}`
      : undefined,
    theme: links.theme
      ? `${siteConfig.repoUrl}/tree/${siteConfig.repoBranch}/packages/theme/src/components/${links.theme}.ts`
      : undefined,
    reactaria: links.reactaria
      ? `https://react-aria.adobe.com/${links.reactaria}`
      : undefined,
  }
}
