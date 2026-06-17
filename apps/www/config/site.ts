/**
 * Site-wide branding and external URLs for the docs site. The navigation tree
 * lives in `content/docs/**\/meta.json` (consumed by the Fumadocs page tree).
 */
export const siteConfig = {
  title: "Open UI",
  titleTemplate: "%s | Open UI",
  description: "Accessible UI components for React applications",
  url: "https://oui.open.gov.sg",
  copyright:
    "Copyright © {{date}} Open Government Products. All Rights Reserved.",
  storybookUrl: "https://storybook.oui.open.gov.sg",
  registryBaseUrl: "https://oui.open.gov.sg/r",
  repoUrl: "https://github.com/opengovsg/oui-design-system",
  repoBranch: "main",
  get editUrl() {
    return `${this.repoUrl}/tree/${this.repoBranch}/apps/www/content`
  },
}

export type SiteConfig = typeof siteConfig
