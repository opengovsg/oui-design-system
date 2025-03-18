import type { LiteralUnion } from "type-fest"

const docsLinks: NavItem = {
  title: "Docs",
  url: "docs",
  items: [
    {
      title: "Getting Started",
      url: "getting-started",
      items: [
        {
          title: "Overview",
          items: [{ title: "Installation", url: "installation" }],
        },
        {
          title: "Frameworks",
          url: "frameworks",
          items: [
            { title: "Next.js (App)", url: "next" },
            { title: "Vite", url: "vite" },
            { title: "Storybook", url: "storybook" },
          ],
        },
      ],
    },

    {
      title: "Components",
      url: "components",
      items: [
        {
          title: "Concepts",
          url: "concepts",
          items: [],
        },
        {
          title: "Layout",
          items: [],
        },
        {
          title: "Typography",
          items: [],
        },
        {
          title: "Components",
          items: [
            { title: "Button", url: "button" },
            { title: "Badge", url: "badge", status: "new" },
          ],
        },
        {
          title: "Utilities",
          items: [],
        },
      ],
    },

    {
      title: "Styling",
      url: "styling",
      items: [
        {
          title: "Concepts",
          items: [
            { title: "Overview", url: "overview" },
            { title: "Dark Mode", url: "dark-mode" },
          ],
        },
      ],
    },

    {
      title: "Theming",
      url: "theming",
      items: [
        {
          title: "Concepts",
          items: [
            { title: "Overview", url: "overview" },
            { title: "Tokens", url: "tokens" },
            { title: "Semantic Tokens", url: "semantic-tokens" },
            { title: "Variants", url: "variants" },
            { title: "Compound Variants", url: "compound-variants" },
          ],
        },
        {
          title: "Design Tokens",
          items: [],
        },
        {
          title: "Customization",
          url: "customization",
          items: [{ title: "Overview", url: "overview" }],
        },
      ],
    },
  ],
}

export const docsConfig: DocsConfig = {
  storybookUrl: "https://storybook.oui.open.gov.sg",
  copyright:
    "Copyright © {{date}} Open Government Products. All Rights Reserved.",
  title: "Open UI",
  titleTemplate: "%s | Open UI",
  description: "Accessible UI components for React applications",
  url: "https://oui.open.gov.sg",
  repoUrl: "https://github.com/opengovsg/oui-design-system",
  repoBranch: "main",
  get editUrl() {
    return `${this.repoUrl}/tree/${this.repoBranch}/apps/www/content`
  },
  navigation: [docsLinks],
}

interface DocsConfig {
  title: string
  titleTemplate: string
  description: string
  storybookUrl: string
  copyright: string
  url: string
  repoUrl: string
  editUrl: string
  navigation: NavItem[]
  repoBranch: string
}

export interface NavItem {
  title: string
  url?: string
  external?: boolean
  status?: LiteralUnion<"new" | "updated", string>
  items?: NavItem[]
}

export interface FlattenNavItem extends Omit<NavItem, "items"> {}
