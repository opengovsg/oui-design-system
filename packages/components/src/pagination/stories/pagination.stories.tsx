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

export const WithControls = {
  args: {
    showControls: true,
  },
}

export const PaginationLoop = {
  args: {
    showControls: true,
    loop: true,
  },
}

export const InitialPage = {
  args: {
    initialPage: 3,
  },
}

export const IsCompact = {
  args: {
    showControls: true,
    isCompact: true,
  },
}
