import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { useFilter } from "react-aria"

import { TagField, TagFieldItem } from "../tag-field-2"

export default {
  title: "Components/TagField2",
  component: TagField,
} as Meta<typeof TagField>

type Story = StoryObj<typeof TagField>

export const Default: Story = {
  args: {
    description: "A tag field component.",
  },
}

type FieldState = {
  selectedKeys: Set<React.Key>
  inputValue: string
  items: TagFieldItem[]
}

// Expected API of the component
// const Template: Story = () => {
//   const items: TagFieldItem[] = []
//   const [fieldState, setFieldState] = useState<FieldState>({
//     selectedKeys: new Set(),
//     inputValue: "",
//     items,
//   })

//   const { startsWith } = useFilter({ sensitivity: "base" })

//   const onSelectionChange = (keys: Set<React.Key>) => {
//     setFieldState({
//       inputValue: "",
//       selectedKeys: keys,
//       items: items.filter((item) => keys.has(item.key)),
//     })
//   }

//   // Specify how each of the Autocomplete values should change when the input
//   // field is altered by the user
//   const onInputChange = (value: string) => {
//     setFieldState((prevState) => ({
//       inputValue: value,
//       selectedKeys: prevState.selectedKeys,
//       items: items.filter((item) => startsWith(item.textValue, value)),
//     }))
//   }

//   return (
//     <TagField
//       inputValue={fieldState.inputValue}
//       items={fieldState.items}
//       selectedKeys={fieldState.selectedKeys}
//       onInputChange={onInputChange}
//       onSelectionChange={onSelectionChange}
//     >
//       {(item) => <TagFieldItem key={item.key} item={item} />}
//     </TagField>
//   )
// }
