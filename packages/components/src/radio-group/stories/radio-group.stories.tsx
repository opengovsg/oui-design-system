import type { Meta, StoryObj } from "@storybook/react-vite"

import { Radio, RadioGroup } from "../radio"

export default {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    docs: {
      controls: {
        exclude: ["children"],
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md"],
    },
  },
  args: {
    label: "Select a city",
    isDisabled: false,
    isRequired: false,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="sf">San Francisco</Radio>
      <Radio value="ny">New York</Radio>
      <Radio value="tokyo">Tokyo</Radio>
      <Radio value="london">London</Radio>
    </RadioGroup>
  ),
} as Meta<typeof RadioGroup>

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: {},
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-row gap-8">
      <RadioGroup {...args} label="Cities (xs)" size="xs">
        <Radio value="sf">San Francisco</Radio>
        <Radio value="ny">New York</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
      <RadioGroup {...args} label="Cities (sm)" size="sm">
        <Radio value="sf">San Francisco</Radio>
        <Radio value="ny">New York</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
      <RadioGroup {...args} label="Cities (md)" size="md">
        <Radio value="sf">San Francisco</Radio>
        <Radio value="ny">New York</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
    </div>
  ),
  args: {
    defaultValue: "tokyo",
  },
}

export const IsInvalid: Story = {
  args: {
    isRequired: true,
    isInvalid: true,
    errorMessage: "Please select a city.",
  },
}

export const IsDisabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: "ny",
  },
}

export const IsRequired: Story = {
  args: {
    isRequired: true,
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "tokyo",
  },
}

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
}

export const LongLabels: Story = {
  render: (args) => (
    <div className="max-w-md">
      <RadioGroup {...args} label="Choose your preferred option">
        <Radio value="option1">
          This is a very long label that demonstrates how the radio component
          handles text wrapping when the content exceeds the available width
        </Radio>
        <Radio value="option2">
          Another lengthy option with substantial text to show the wrapping
          behavior
        </Radio>
        <Radio value="option3">Short option</Radio>
      </RadioGroup>
    </div>
  ),
  args: {},
}
