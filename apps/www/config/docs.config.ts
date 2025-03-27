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
            {
              title: "AttachmentField",
              url: "attachment-field",
              status: "wip",
            },
            { title: "Avatar", url: "avatar", status: "wip" },
            { title: "Badge", url: "badge", status: "new" },
            { title: "Banner", url: "banner", status: "new" },
            { title: "Breadcrumb", url: "breadcrumb", status: "wip" },
            { title: "Button", url: "button" },
            { title: "Calendar", url: "calendar", status: "new" },
            { title: "Card", url: "card", status: "wip" },
            { title: "ComboBox", url: "combo-box", status: "new" },
            { title: "CheckboxGroup", url: "checkbox-group", status: "wip" },
            { title: "Checkbox", url: "checkbox", status: "wip" },
            { title: "DateField", url: "date-field", status: "wip" },
            { title: "Field", url: "field" },
            { title: "Infobox", url: "infobox", status: "wip" },
            { title: "Link", url: "link", status: "wip" },
            { title: "Menu", url: "menu", status: "new" },
            { title: "Modal", url: "modal", status: "wip" },
            { title: "NumberField", url: "number-field", status: "wip" },
            { title: "Pagination", url: "pagination", status: "wip" },
            {
              title: "PhoneNumberField",
              url: "phone-number-field",
              status: "wip",
            },
            { title: "Progress", url: "progress", status: "wip" },
            { title: "RadioGroup", url: "radio-group", status: "wip" },
            { title: "RangeCalendar", url: "range-calendar", status: "new" },
            { title: "SearchInput", url: "search-input", status: "wip" },
            { title: "Sidebar", url: "sidebar", status: "wip" },
            { title: "Skeleton", url: "skeleton", status: "wip" },
            { title: "Table", url: "table", status: "wip" },
            { title: "Tabs", url: "tabs", status: "wip" },
            { title: "TagField", url: "tag-field", status: "new" },
            { title: "TagGroup", url: "tag-group", status: "wip" },
            { title: "TextAreaField", url: "text-area-field" },
            { title: "TextField", url: "text-field" },
            { title: "Tile", url: "tile", status: "wip" },
            { title: "TimeField", url: "time-field", status: "wip" },
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
