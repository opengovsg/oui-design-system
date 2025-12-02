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
              status: "redirect",
            },
            { title: "Avatar", url: "avatar", status: "wip" },
            { title: "Badge", url: "badge" },
            { title: "Banner", url: "banner" },
            { title: "Breadcrumb", url: "breadcrumb", status: "wip" },
            { title: "Button", url: "button" },
            { title: "Calendar", url: "calendar" },
            { title: "Card", url: "card", status: "wip" },
            { title: "ComboBox", url: "combo-box" },
            { title: "CheckboxGroup", url: "checkbox-group", status: "new" },
            { title: "Checkbox", url: "checkbox", status: "new" },
            { title: "DateField", url: "date-field" },
            { title: "DatePicker", url: "date-picker" },
            {
              title: "DateRangePicker",
              url: "date-range-picker",
            },
            { title: "FileDropzone", url: "file-dropzone", status: "new" },
            { title: "Field", url: "field" },
            { title: "Infobox", url: "infobox", status: "wip" },
            { title: "Link", url: "link", status: "wip" },
            { title: "Menu", url: "menu" },
            { title: "Modal", url: "modal", status: "new" },
            { title: "MultiSelect", url: "multi-select", status: "redirect" },
            { title: "NumberField", url: "number-field", status: "new" },
            { title: "Pagination", url: "pagination", status: "new" },
            {
              title: "PhoneNumberField",
              url: "phone-number-field",
              status: "wip",
            },
            { title: "Progress", url: "progress", status: "wip" },
            { title: "RadioGroup", url: "radio-group", status: "wip" },
            { title: "RangeCalendar", url: "range-calendar" },
            { title: "SingleSelect", url: "single-select", status: "redirect" },
            { title: "SearchInput", url: "search-input", status: "wip" },
            { title: "Select", url: "select" },
            { title: "Sidebar", url: "sidebar", status: "wip" },
            { title: "Skeleton", url: "skeleton", status: "wip" },
            { title: "Table", url: "table", status: "wip" },
            { title: "Tabs", url: "tabs" },
            { title: "TagField", url: "tag-field" },
            { title: "TagGroup", url: "tag-group", status: "wip" },
            { title: "TextAreaField", url: "text-area-field" },
            { title: "TextField", url: "text-field" },
            { title: "Tile", url: "tile", status: "wip" },
            { title: "TimeField", url: "time-field", status: "wip" },
            { title: "Toast", url: "toast", status: "wip" },
            { title: "Toggle", url: "toggle" },
            { title: "Tooltip", url: "tooltip", status: "wip" },
          ].sort((a, b) => a.title.localeCompare(b.title)),
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
