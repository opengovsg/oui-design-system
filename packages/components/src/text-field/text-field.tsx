import { textFieldStyles, VariantProps } from "@opengovsg/oui-theme"

interface TextFieldProps extends VariantProps<typeof textFieldStyles> {}

export const TextField = ({  }: TextFieldProps) => {
  return (
    <div>
      <h1>text-field</h1>
    </div>
  )
}
