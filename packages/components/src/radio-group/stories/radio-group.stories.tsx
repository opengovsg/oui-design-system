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
    description: "",
    isDisabled: false,
    isRequired: false,
    isInvalid: false,
    errorMessage: "",
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

/**
 * Displays all visual states of the RadioGroup component.
 * Tab through the groups to see the focus state (rectangular outline around the entire radio item).
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-row gap-8">
      <RadioGroup label="Unselected">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>

      <RadioGroup label="Selected" defaultValue="a">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>

      <RadioGroup label="Disabled (group)" isDisabled defaultValue="a">
        <Radio value="a">Selected</Radio>
        <Radio value="b">Unselected</Radio>
      </RadioGroup>

      <RadioGroup label="Disabled (individual)" defaultValue="a">
        <Radio value="a" isDisabled>
          Disabled selected
        </Radio>
        <Radio value="b" isDisabled>
          Disabled unselected
        </Radio>
        <Radio value="c">Enabled</Radio>
      </RadioGroup>

      <RadioGroup
        label="Invalid"
        isInvalid
        isRequired
        errorMessage="Please select an option."
      >
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>
    </div>
  ),
}

/**
 * All size variants (xs, sm, md) with descriptions.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-row gap-8">
      <RadioGroup label="Size xs" size="xs" defaultValue="card">
        <Radio
          value="card"
          description="Pay securely with credit or debit card"
        >
          Credit Card
        </Radio>
        <Radio
          value="paypal"
          description="Fast checkout with your PayPal account"
        >
          PayPal
        </Radio>
        <Radio value="bank" description="Processing may take 2-3 business days">
          Bank Transfer
        </Radio>
      </RadioGroup>

      <RadioGroup label="Size sm" size="sm" defaultValue="card">
        <Radio
          value="card"
          description="Pay securely with credit or debit card"
        >
          Credit Card
        </Radio>
        <Radio
          value="paypal"
          description="Fast checkout with your PayPal account"
        >
          PayPal
        </Radio>
        <Radio value="bank" description="Processing may take 2-3 business days">
          Bank Transfer
        </Radio>
      </RadioGroup>

      <RadioGroup label="Size md" size="md" defaultValue="card">
        <Radio
          value="card"
          description="Pay securely with credit or debit card"
        >
          Credit Card
        </Radio>
        <Radio
          value="paypal"
          description="Fast checkout with your PayPal account"
        >
          PayPal
        </Radio>
        <Radio value="bank" description="Processing may take 2-3 business days">
          Bank Transfer
        </Radio>
      </RadioGroup>
    </div>
  ),
}

/**
 * Demonstrates text wrapping behavior with long labels.
 */
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
