import { comboBoxStyles, VariantProps } from "@opengovsg/oui-theme"

interface ComboBoxProps extends VariantProps<typeof comboBoxStyles> {}

export const ComboBox = ({  }: ComboBoxProps) => {
  return (
    <div>
      <h1>combo-box</h1>
    </div>
  )
}
