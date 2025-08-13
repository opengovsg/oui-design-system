import type { Meta, StoryObj } from "@storybook/react-vite"

import { paginationStyles } from "@opengovsg/oui-theme"

import { Pagination } from "../pagination"

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    page: {
      control: {
        type: "number",
      },
    },
    siblings: {
      control: {
        type: "number",
      },
    },
    boundaries: {
      control: {
        type: "number",
      },
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "bordered", "light", "faded"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "main", "sub", "success", "warning", "critical"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    showShadow: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    ...paginationStyles.defaultVariants,
    total: 10,
    siblings: 1,
    boundaries: 1,
    initialPage: 1,
  },
} as Meta<typeof Pagination>

type Story = StoryObj<typeof Pagination>

export const Default: Story = {}

export const WithControls: Story = {
  args: {
    showControls: true,
  },
}

export const PaginationLoop: Story = {
  args: {
    showControls: true,
    loop: true,
  },
}

export const InitialPage: Story = {
  args: {
    initialPage: 6,
  },
}

export const TwoSiblings: Story = {
  args: {
    total: 20,
    initialPage: 6,
    siblings: 2,
  },
}

export const IsCompact: Story = {
  args: {
    showControls: true,
    isCompact: true,
  },
}
