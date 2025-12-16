import type { Meta, StoryObj } from "@storybook/react-vite"
import { CogIcon } from "lucide-react"

import type { AvatarProps } from "../avatar"
import type { AvatarGroupProps } from "../avatar-group"
import { AvatarGroup } from "../avatar-group"
import { Avatar } from "../index"

export default {
  title: "Components/Avatar",
  component: Avatar,
} as Meta<typeof Avatar>

type Story = StoryObj<typeof Avatar>
type AvatarGroupStory = StoryObj<typeof AvatarGroup>

const Template = (args: AvatarProps) => (
  <Avatar {...args}>
    <Avatar.Fallback />
  </Avatar>
)

export const Default: Story = {
  render: Template,
}

export const WithName: Story = {
  render: Template,
  args: {
    name: "Test User",
  },
}

export const CustomIcon: Story = {
  render: (args: AvatarProps) => (
    <Avatar {...args}>
      <Avatar.Fallback>
        <CogIcon />
      </Avatar.Fallback>
    </Avatar>
  ),
}

export const WithImage: Story = {
  render: (args: AvatarProps) => (
    <Avatar {...args}>
      <Avatar.Image src="https://avatars.githubusercontent.com/u/22133008?v=4&size=128" />
      <Avatar.Fallback />
    </Avatar>
  ),
  args: {
    name: "Cool guy extraordinaire",
    prominence: "subtle",
  },
}

export const VariantsAndSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        <Template prominence="strong" color="primary" size="2xs" />
        <Template
          name="Strong Primary 2xs"
          prominence="strong"
          color="primary"
          size="2xs"
        />
        <Template prominence="strong" color="primary" size="xs" />

        <Template
          name="Strong Primary XS"
          prominence="strong"
          color="primary"
          size="xs"
        />
        <Template prominence="strong" color="primary" size="sm" />
        <Template
          name="Strong Primary SM"
          prominence="strong"
          color="primary"
          size="sm"
        />
        <Template prominence="strong" color="primary" size="md" />
        <Template
          name="Strong Primary MD"
          prominence="strong"
          color="primary"
          size="md"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Template prominence="subtle" color="primary" size="2xs" />
        <Template
          name="Subtle Primary 2xs"
          prominence="subtle"
          color="primary"
          size="2xs"
        />
        <Template prominence="subtle" color="primary" size="xs" />
        <Template
          name="Subtle Primary XS"
          prominence="subtle"
          color="primary"
          size="xs"
        />
        <Template prominence="subtle" color="primary" size="sm" />
        <Template
          name="Subtle Primary SM"
          prominence="subtle"
          color="primary"
          size="sm"
        />
        <Template prominence="subtle" color="primary" size="md" />
        <Template
          name="Subtle Primary MD"
          prominence="subtle"
          color="primary"
          size="md"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Template prominence="subtle" color="white" size="2xs" />
        <Template
          name="Subtle White 2xs"
          prominence="subtle"
          color="white"
          size="2xs"
        />
        <Template prominence="subtle" color="white" size="xs" />
        <Template
          name="Subtle White XS"
          prominence="subtle"
          color="white"
          size="xs"
        />
        <Template prominence="subtle" color="white" size="sm" />
        <Template
          name="Subtle White SM"
          prominence="subtle"
          color="white"
          size="sm"
        />
        <Template prominence="subtle" color="white" size="md" />
        <Template
          name="Subtle White MD"
          prominence="subtle"
          color="white"
          size="md"
        />
      </div>
    </div>
  ),
}

const AvatarGroupTemplate = (args: AvatarGroupProps) => (
  <div className="flex items-center gap-[-0.5rem]">
    <AvatarGroup {...args}>
      <Avatar>
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>CD</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>EF</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>GH</Avatar.Fallback>
      </Avatar>
    </AvatarGroup>
  </div>
)

export const WithAvatarGroup: AvatarGroupStory = {
  render: AvatarGroupTemplate,
  args: {
    max: 3,
    prominence: "subtle",
  },
}
