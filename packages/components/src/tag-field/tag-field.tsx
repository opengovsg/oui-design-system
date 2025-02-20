import { tagFieldStyles, VariantProps } from "@opengovsg/oui-theme"

interface TagFieldProps extends VariantProps<typeof tagFieldStyles> {}

export const TagField = ({  }: TagFieldProps) => {
  return (
    <div>
      <h1>tag-field</h1>
    </div>
  )
}
