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
          title: "Components",
          items: [
            { title: "Accordion", url: "accordion", status: "wip" },
            { title: "Avatar", url: "avatar", status: "wip" },
            { title: "Badge", url: "badge", status: "new" },
            { title: "Banner", url: "banner", status: "new" },
            { title: "Breadcrumb", url: "breadcrumb", status: "wip" },
            { title: "Button", url: "button" },
            { title: "Card", url: "card", status: "wip" },
            { title: "Dropdown", url: "dropdown", status: "wip" },
            { title: "Infobox", url: "infobox", status: "wip" },
            { title: "Input", url: "input" },
            { title: "Textarea", url: "textarea" },
            { title: "Number Input", url: "number-input", status: "wip" },
            {
              title: "Attachment Field",
              url: "attachment-field",
              status: "wip",
            },
            { title: "Date Input", url: "date-input", status: "wip" },
            { title: "Time Input", url: "time-input", status: "wip" },
            { title: "ComboBox", url: "combo-box", status: "new" },
            { title: "Tag Field", url: "tag-field", status: "new" },
            { title: "Radio", url: "radio", status: "wip" },
            { title: "Checkbox", url: "checkbox", status: "wip" },
            {
              title: "Phone Number Input",
              url: "phone-number-input",
              status: "wip",
            },
            { title: "Link", url: "link", status: "wip" },
            { title: "Modal", url: "modal", status: "wip" },
            { title: "Pagination", url: "pagination", status: "wip" },
            { title: "Progress", url: "progress", status: "wip" },
            { title: "Search Input", url: "search-input", status: "wip" },
            { title: "Sidebar", url: "sidebar", status: "wip" },
            { title: "Skeleton", url: "skeleton", status: "wip" },
            { title: "Tabs", url: "tabs", status: "wip" },
            { title: "Table", url: "table", status: "wip" },
            { title: "Tag", url: "tag", status: "wip" },
            { title: "Tile", url: "tile", status: "wip" },
            { title: "Toast", url: "toast", status: "wip" },
            { title: "Toggle", url: "toggle" },
            { title: "Tooltip", url: "tooltip", status: "wip" },
          ],
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
  status?: LiteralUnion<"new" | "updated" | "wip", string>
  items?: NavItem[]
}

export interface FlattenNavItem extends Omit<NavItem, "items"> {}
