import type { Meta, StoryObj } from "@storybook/react-vite"
import { Home } from "lucide-react"

import { Menu, MenuItem } from "../../menu"
import { Breadcrumb, Breadcrumbs } from "../breadcrumbs"

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
} as Meta<typeof Breadcrumbs>

type Story = StoryObj<typeof Breadcrumbs>

const Template = (args: Story["args"]) => {
  return (
    <Breadcrumbs {...args}>
      <Breadcrumb href="#">
        <Home />
        Home
      </Breadcrumb>
      <Breadcrumb href="#">React Aria</Breadcrumb>
      <Breadcrumb>Breadcrumbs</Breadcrumb>
    </Breadcrumbs>
  )
}

export const Default: Story = {
  render: Template,
}

export const CustomTypography: Story = {
  render: Template,
  args: {
    className: "prose-caption-1",
  },
}

export const SlashSeparator: Story = {
  render: Template,
  args: {
    separator: "/",
  },
}

export const WithCollection: Story = {
  render: (args) => {
    const items = [
      { id: "home", href: "#", children: "Home" },
      { id: "category", href: "#", children: "Category" },
      { id: "subcategory-a", href: "#", children: "Subcategory A" },
      { id: "subcategory-b", href: "#", children: "Subcategory B" },
      { id: "subcategory-c", href: "#", children: "Subcategory C" },
      { id: "current-page", children: "Current Page" },
    ]

    return (
      // @ts-expect-error: Generic type inference issue
      <Breadcrumbs {...args} items={items}>
        {(item) => <Breadcrumb>{item.children}</Breadcrumb>}
      </Breadcrumbs>
    )
  },
}

const TruncationTemplate = (args: Story["args"]) => {
  return (
    <Breadcrumbs {...args}>
      <Breadcrumb href="#">Home</Breadcrumb>
      <Breadcrumb href="#">Category</Breadcrumb>
      <Breadcrumb href="#">Subcategory A</Breadcrumb>
      <Breadcrumb href="#">Subcategory B</Breadcrumb>
      <Breadcrumb href="#">Subcategory C</Breadcrumb>
      <Breadcrumb>Current Page</Breadcrumb>
    </Breadcrumbs>
  )
}

export const Truncated: Story = {
  render: TruncationTemplate,
  args: {
    itemsBeforeTruncate: 1,
  },
}

export const TruncateWithSlashSeparator: Story = {
  render: TruncationTemplate,
  args: {
    className: "prose-caption-1",
    itemsBeforeTruncate: 2,
    separator: "/",
    truncateProps: {
      size: "xs",
    },
  },
}

export const TruncateNoDropdown: Story = {
  render: TruncationTemplate,
  args: {
    itemsBeforeTruncate: 1,
    renderTruncate: null,
  },
}

export const TruncateCustomDropdown: Story = {
  render: TruncationTemplate,
  args: {
    itemsBeforeTruncate: 1,
    renderTruncate: (items) => (
      <Menu
        placement="bottom start"
        classNames={{ base: "bg-brand-primary-50 p-2" }}
        items={items}
      >
        {(item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            href={item.href}
            classNames={{
              container: "text-brand-primary-700 font-bold",
            }}
          >
            {item.children}
          </MenuItem>
        )}
      </Menu>
    ),
  },
}
