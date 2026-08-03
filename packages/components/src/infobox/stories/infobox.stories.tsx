import { withChromaticModes } from "@oui/chromatic"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { AlertTriangle } from "lucide-react"

import { Infobox } from "../infobox"

export default {
  title: "Components/Infobox",
  component: Infobox,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "warning", "error", "success"],
      description: "The visual variant of the infobox",
      table: {
        type: { summary: '"info" | "warning" | "error" | "success"' },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
      description: "The size of the infobox",
      table: {
        type: { summary: '"sm" | "md"' },
      },
    },
    icon: {
      control: { type: "boolean" },
      mapping: {
        true: undefined,
        false: null,
      },
      description:
        "Icon to show on the left. If not specified, a default icon based on variant is shown. Pass null to hide the icon.",
      table: {
        type: { summary: "React.ReactNode | null" },
      },
    },
  },
  args: {
    children: "This is an informational message to help guide your users.",
  },
} as Meta<typeof Infobox>

type Story = StoryObj<typeof Infobox>

export const Default: Story = {}

export const SizesAndVariants: Story = {
  parameters: {
    chromatic: withChromaticModes(["mobileSmall", "desktop"]),
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Infobox variant="info" size="sm">
          Small info message with helpful information.
        </Infobox>
        <Infobox variant="warning" size="sm">
          Small warning message to alert users.
        </Infobox>
        <Infobox variant="error" size="sm">
          Small error message indicating an issue.
        </Infobox>
        <Infobox variant="success" size="sm">
          Small success message confirming completion.
        </Infobox>
      </div>
      <div className="flex flex-col gap-1">
        <Infobox variant="info" size="md">
          Medium info message with helpful information.
        </Infobox>
        <Infobox variant="warning" size="md">
          Medium warning message to alert users.
        </Infobox>
        <Infobox variant="error" size="md">
          Medium error message indicating an issue.
        </Infobox>
        <Infobox variant="success" size="md">
          Medium success message confirming completion.
        </Infobox>
      </div>
    </div>
  ),
}

export const CustomIcon: Story = {
  parameters: {
    chromatic: withChromaticModes(["mobileSmall", "desktop"]),
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Infobox variant="info" icon={<AlertTriangle className="shrink-0" />}>
        Custom icon replaces the default icon.
      </Infobox>
      <Infobox
        variant="warning"
        icon={<AlertTriangle className="shrink-0 text-purple-500" />}
      >
        Custom colors are preserved (purple, not default orange).
      </Infobox>
      <Infobox
        size="sm"
        variant="success"
        icon={<AlertTriangle className="size-4 shrink-0 text-blue-500" />}
      >
        Custom icons need to be sized manually (e.g., size-4 for small).
      </Infobox>
      <Infobox
        size="md"
        variant="error"
        icon={<AlertTriangle className="size-6 shrink-0 text-green-500" />}
      >
        Custom icons need to be sized manually (e.g., size-6 for medium).
      </Infobox>
    </div>
  ),
}

export const NoIcon: Story = {
  parameters: {
    chromatic: withChromaticModes(["mobileSmall", "desktop"]),
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Infobox variant="info" icon={null}>
        Info message without an icon (icon explicitly set to null).
      </Infobox>
      <Infobox variant="warning" icon={null}>
        Warning message without an icon.
      </Infobox>
      <Infobox variant="error" icon={null}>
        Error message without an icon.
      </Infobox>
      <Infobox variant="success" icon={null}>
        Success message without an icon.
      </Infobox>
    </div>
  ),
}

export const CustomWithClassNames: Story = {
  args: {
    variant: "info",
    children:
      "Custom styled infobox using the classNames prop for slot customization.",
    classNames: {
      base: "bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-lg",
      icon: "text-purple-600",
    },
  },
}

export const MultilineContent: Story = {
  parameters: {
    chromatic: withChromaticModes(["mobileSmall", "desktop"]),
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Infobox variant="info">
        <strong>Did you know?</strong> You can configure your account settings
        by navigating to the profile menu in the top right corner. Click on
        "Settings" to access various options including notifications,
        preferences, and privacy controls.
      </Infobox>
      <Infobox variant="warning">
        <strong>Action required:</strong> Your session will expire in 5 minutes.
        Please save your work to avoid losing any changes. You can extend your
        session by clicking the "Stay logged in" button below.
      </Infobox>
      <Infobox variant="error">
        <strong>Error:</strong> Unable to save your changes due to a network
        error. Please check your internet connection and try again. If the
        problem persists, contact support for assistance.
      </Infobox>
      <Infobox variant="success">
        <strong>Success!</strong> Your profile has been updated successfully.
        All changes have been saved and will take effect immediately. You can
        view your updated profile by clicking on your avatar.
      </Infobox>
    </div>
  ),
}
