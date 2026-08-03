import { paginationStyles } from "@opengovsg/oui-theme"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Pagination } from "../pagination"

export default {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // Current failures are actually valid in WCAG, provided `ul` parent has a role of "none",
            // which wrapper props in pagination component has.
            id: "aria-allowed-role",
            selector: '*:not([role="button"])',
          },
        ],
      },
    },
  },
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
      options: ["light"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["main", "neutral", "success", "warning", "critical"],
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
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    ...paginationStyles.defaultVariants,
    total: 100,
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

export const Disabled: Story = {
  args: {
    initialPage: 12,
    isDisabled: true,
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
    isCompact: true,
  },
}
