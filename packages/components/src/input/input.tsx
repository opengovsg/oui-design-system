import { inputStyles, VariantProps } from "@opengovsg/oui-theme"

interface InputProps extends VariantProps<typeof inputStyles> {}

export const Input = ({  }: InputProps) => {
  return (
    <div>
      <h1>input</h1>
    </div>
  )
}
