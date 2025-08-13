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
    children: (
      <>
        <Checkbox value="sf">San Francisco</Checkbox>
        <Checkbox value="ny">New York</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </>
    ),
  },
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
