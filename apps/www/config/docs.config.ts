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
            { title: "Next.js", url: "next" },
            { title: "Vite", url: "vite" },
          ],
        },
        {
          title: "Customization",
          items: [
            {
              title: "Theming",
              url: "theming",
            },
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
            { title: "Accordion", url: "accordion" },
            {
              title: "AttachmentField",
              url: "attachment-field",
              status: "redirect",
            },
            { title: "Avatar", url: "avatar" },
            { title: "Badge", url: "badge" },
            { title: "Banner", url: "banner" },
            { title: "Breadcrumbs", url: "breadcrumbs", status: "new" },
            { title: "Button", url: "button" },
            { title: "Calendar", url: "calendar" },
            { title: "Card", url: "card", status: "wip" },
            { title: "ComboBox", url: "combo-box" },
            { title: "CheckboxGroup", url: "checkbox-group" },
            { title: "Checkbox", url: "checkbox" },
            { title: "DateField", url: "date-field" },
            { title: "DatePicker", url: "date-picker" },
            {
              title: "DateRangePicker",
              url: "date-range-picker",
            },
            { title: "FileDropzone", url: "file-dropzone" },
            { title: "Field", url: "field" },
            { title: "Infobox", url: "infobox", status: "wip" },
            { title: "Link", url: "link", status: "new" },

            { title: "Menu", url: "menu" },
            { title: "Modal", url: "modal" },
            { title: "MultiSelect", url: "multi-select", status: "redirect" },
            { title: "Navbar", url: "navbar" },
            { title: "NumberField", url: "number-field" },
            { title: "Pagination", url: "pagination" },
            {
              title: "PhoneNumberField",
              url: "phone-number-field",
              status: "new",
            },
            { title: "Progress", url: "progress", status: "wip" },
            { title: "RadioGroup", url: "radio-group", status: "new" },
            { title: "RangeCalendar", url: "range-calendar" },
            { title: "SingleSelect", url: "single-select", status: "redirect" },
            { title: "SearchField", url: "search-field", status: "new" },
            { title: "Select", url: "select", status: "updated" },
            { title: "Sidebar", url: "sidebar", status: "new" },
            { title: "Skeleton", url: "skeleton", status: "wip" },
            { title: "Table", url: "table", status: "wip" },
            { title: "Tabs", url: "tabs" },
            { title: "TagField", url: "tag-field" },
            { title: "TagGroup", url: "tag-group", status: "wip" },
            { title: "TextAreaField", url: "text-area-field" },
            { title: "TextField", url: "text-field" },
            { title: "Tile", url: "tile", status: "wip" },
            { title: "TimeField", url: "time-field", status: "new" },
            { title: "Toast", url: "toast" },
            { title: "Toggle", url: "toggle" },
            { title: "Tooltip", url: "tooltip", status: "new" },
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
