import type { Meta, StoryObj } from "@storybook/react-vite"
import { useRef } from "react"

import { Input } from "../../input"
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

// TODO: Move into oui docs
export const WithInputChildrenExample: Story = {
  render: (args) => {
    const checkboxRef = useRef<HTMLInputElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    return (
      <CheckboxGroup {...args}>
        <Checkbox value="sf">San Francisco</Checkbox>
        <Checkbox value="ny">New York</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
        <Checkbox
          value="other"
          inputRef={checkboxRef}
          onChange={(checked) => {
            // Upon checking checkbox, focus text input
            if (checked) {
              // setTimeout with a delay of 0 ms schedules the code to run after the current call stack is cleared.
              // this allows us to wait until the focus event has finished propagating.
              setTimeout(() => {
                inputRef.current?.focus()
              }, 0)
            }
          }}
        >
          <div className="flex flex-col gap-2">
            Other
            <Input
              ref={inputRef}
              onClick={(e) => e.stopPropagation()} // Prevent parent checkbox from being toggled due to event bubbling
              onKeyDownCapture={(e) => e.stopPropagation()} // Prevent parent checkbox from being toggled due to event bubbling
              onChange={(e) => {
                // If there is text in the input, ensure the checkbox is checked.
                if (e.target.value && !checkboxRef.current?.checked) {
                  checkboxRef.current?.click()
                }
              }}
            />
          </div>
        </Checkbox>
      </CheckboxGroup>
    )
  },
  args: {},
}
