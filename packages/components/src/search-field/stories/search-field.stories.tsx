import type { Meta, StoryObj } from "@storybook/react-vite"
import { FilterIcon, LoaderCircleIcon, SearchIcon } from "lucide-react"
import { useState } from "react"
import { expect } from "storybook/test"

import { Button } from "../../button"
import { SearchField } from "../search-field"

export default {
  title: "Components/SearchField",
  component: SearchField,
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: "color-contrast",
            selector: '*:not([data-placeholder="true"])',
          },
        ],
      },
    },
  },
  args: {
    onSubmit: (value) => alert(`Search submitted: ${value}`),
  },
} as Meta<typeof SearchField>

type Story = StoryObj<typeof SearchField>

export const Default: Story = {
  args: {},
}

export const WithLabelAndDescription: Story = {
  args: {
    label: "Date of issue",
    description: "The date when the document was issued.",
  },
}

export const WithError: Story = {
  args: {
    label: "Date of issue",
    errorMessage: "Please enter a valid date.",
    isInvalid: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Date of issue",
    isDisabled: true,
  },
}

export const Sizes: Story = {
  render(args) {
    return (
      <div className="space-y-4">
        <SearchField {...args} label={`${args.label} (xs)`} size="xs" />
        <SearchField {...args} label={`${args.label} (sm)`} size="sm" />
        <SearchField {...args} label={`${args.label} (md)`} size="md" />
      </div>
    )
  },
  args: {
    label: "Date of issue",
  },
}

export const CustomSearchIcon: Story = {
  args: {
    label: "Filter",
    searchIcon: (
      <FilterIcon
        aria-hidden
        className="text-base-content-medium ml-4 size-5"
      />
    ),
  },
}

export const HiddenSearchIcon: Story = {
  args: {
    label: "Search",
    searchIcon: null,
  },
}

export const WithPlaceholder: Story = {
  args: {
    label: "Search",
    inputProps: { placeholder: "Search by name or email" },
  },
}

export const Controlled: Story = {
  render() {
    const [value, setValue] = useState("")
    const [submittedValue, setSubmittedValue] = useState<string | null>(null)

    return (
      <div className="space-y-4">
        <SearchField
          label="Controlled SearchField"
          value={value}
          onChange={(v) => setValue(v)}
          onSubmit={() => setSubmittedValue(value)}
        />
        <p className="text-sm text-gray-700">
          <div>
            Input value: <strong data-testid="input-value">{value}</strong>
          </div>
          <div>
            Submitted value:{" "}
            <strong data-testid="submitted-value">{submittedValue}</strong>
          </div>
        </p>
      </div>
    )
  },
  play: async ({ userEvent, canvas }) => {
    const TEST_SEARCH_TEXT = "Type anything, press enter to submit"
    const inputValue = canvas.getByTestId("input-value")
    const submittedValue = canvas.getByTestId("submitted-value")

    // Verify initial state
    await expect(inputValue).toHaveTextContent("")
    await expect(submittedValue).toHaveTextContent("")

    // Simulate user typing and submitting the form
    const searchField = canvas.getByLabelText("Controlled SearchField")
    await userEvent.type(searchField, TEST_SEARCH_TEXT)
    await userEvent.keyboard("{Enter}")

    // Verify updated state
    await expect(inputValue).toHaveTextContent(TEST_SEARCH_TEXT)
    await expect(submittedValue).toHaveTextContent(TEST_SEARCH_TEXT)
  },
}

export const WithActionElement: Story = {
  args: {
    label: "Search",
    actionElement: (
      <Button size="md" aria-label="Search">
        <SearchIcon />
        Search
      </Button>
    ),
  },
}

export const AsyncSearch: Story = {
  args: {
    label: "Async search",
    defaultValue: "Searching...",
    isReadOnly: true,
    clearIcon: (
      <LoaderCircleIcon className="animate-spin" aria-label="Loading" />
    ),
  },
}
