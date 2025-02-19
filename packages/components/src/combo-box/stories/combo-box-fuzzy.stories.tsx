import type { Meta, StoryObj } from "@storybook/react"
import type { Key } from "react-aria-components"
import { useState } from "react"

import { ComboBoxProps } from "../combo-box"
import { ComboBoxFuzzy } from "../combo-box-fuzzy"

export default {
  title: "Components/ComboBoxFuzzy",
  component: ComboBoxFuzzy,
  args: {
    label: "Ice cream flavour",
    items: [...Array(200)].map((_, i) => ({
      value: String(i),
      name: `Item ${i}`,
      description: `Description ${i}`,
    })),
    isDisabled: false,
  },
} as Meta<typeof ComboBoxFuzzy>

type Story = StoryObj<typeof ComboBoxFuzzy>

const ControlledTemplate = ({ items }: ComboBoxProps) => {
  const [fieldState, setFieldState] = useState<{
    selectedKey: Key | null
    inputValue: string
  }>({
    selectedKey: null,
    inputValue: "",
  })

  const onSelectionChange = (id: Key | null) => {
    setFieldState({
      inputValue: items.find((o) => o.value === id)?.name ?? "",
      selectedKey: id,
    })
  }

  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
    }))
  }

  return (
    <>
      <p>Current selected major id: {fieldState.selectedKey}</p>
      <p>Current input text: {fieldState.inputValue}</p>
      <ComboBoxFuzzy
        label="Pick a engineering major"
        items={items}
        selectedKey={fieldState.selectedKey}
        inputValue={fieldState.inputValue}
        onSelectionChange={onSelectionChange}
        onInputChange={onInputChange}
      />
    </>
  )
}

export const Default: Story = {
  render: ControlledTemplate,
}

export const Test: Story = {}
