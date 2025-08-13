import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox, CheckboxGroup } from "../checkbox"

export default {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    docs: {
      controls: {
        exclude: ["children"], // Prevent attempted serialisation of children causing a crash
      },
    },
  },
  args: {
    label: "Cities",
    isDisabled: false,
    isRequired: false,
    description: "",
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox value="sf">San Francisco</Checkbox>
      <Checkbox value="ny">New York</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>
  ),
} as Meta<typeof CheckboxGroup>

type Story = StoryObj<typeof CheckboxGroup>

export const Default: Story = {
  args: {},
}

export const IsInvalid: Story = {
  args: {
    isRequired: true,
    isInvalid: true,
    errorMessage: "The answer is obviously Tokyo.",
    defaultValue: ["sf"],
  },
}

export const Sizes: Story = {
  args: {
    defaultValue: ["sf", "ny", "tokyo"],
  },
  render: (args) => {
    return (
      <div className="flex flex-row gap-4">
        <CheckboxGroup {...args} label="Cities (xs)" size="xs">
          <Checkbox value="sf">San Francisco</Checkbox>
          <Checkbox value="ny">New York</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup {...args} label="Cities (sm)" size="sm">
          <Checkbox value="sf">San Francisco</Checkbox>
          <Checkbox value="ny">New York</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup {...args} label="Cities (md)" size="md">
          <Checkbox value="sf">San Francisco</Checkbox>
          <Checkbox value="ny">New York</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </CheckboxGroup>
      </div>
    )
  },
}
