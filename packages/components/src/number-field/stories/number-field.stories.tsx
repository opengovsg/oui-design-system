import type { Meta, StoryObj } from "@storybook/react-vite"

import { NumberField } from "../number-field"

export default {
  title: "Components/NumberField",
  component: NumberField,
  args: {
    "aria-label": "Number Field Example",
  },
} as Meta<typeof NumberField>

type Story = StoryObj<typeof NumberField>

export const Default: Story = {
  args: {},
}

export const WithStepperHidden: Story = {
  args: {
    hideSteppers: true,
  },
}

export const WithPlaceholder: Story = {
  args: {
    inputProps: {
      placeholder: "Enter a number",
    },
  },
}

export const WithLabelAndDescription: Story = {
  args: {
    label: "Number Field Label",
    description: "This is a description for the number field",
  },
}

export const WithStartAndEndContent: Story = {
  args: {
    startContent: (
      <div className="pointer-events-none flex items-center">
        <span className="text-interaction-main-default">$</span>
      </div>
    ),
    endContent: (
      <div className="flex items-center">
        <label className="sr-only" htmlFor="currency">
          Currency
        </label>
        <select
          aria-label="Select currency"
          className="outline-solid text-interaction-main-default border-0 bg-transparent outline-transparent"
          defaultValue="SGD"
          id="currency"
          name="currency"
        >
          <option aria-label="SG Dollar" value="SGD">
            SGD
          </option>
          <option aria-label="US Dollar" value="USD">
            USD
          </option>
          <option aria-label="Euro" value="EUR">
            EUR
          </option>
        </select>
      </div>
    ),
  },
}

export const WithErrorMessage: Story = {
  args: {
    isInvalid: true,
    errorMessage: "Please enter a valid number",
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    inputProps: {
      placeholder: "Disabled number field",
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <NumberField
        size="xs"
        label="Extra Small Number Field"
        inputProps={{ placeholder: "Extra small size" }}
      />
      <NumberField
        size="sm"
        label="Small Number Field"
        inputProps={{ placeholder: "Small size" }}
      />
      <NumberField
        size="md"
        label="Medium Number Field"
        inputProps={{ placeholder: "Medium size" }}
      />
    </div>
  ),
}
