import { TextAreaField } from "@opengovsg/oui"

export default function TextAreaFieldSizes() {
  return (
    <div className="flex flex-col gap-6">
      <TextAreaField
        size="xs"
        label="Extra Small"
        inputProps={{ placeholder: "Extra small size" }}
      />
      <TextAreaField
        size="sm"
        label="Small"
        inputProps={{ placeholder: "Small size" }}
      />
      <TextAreaField
        size="md"
        label="Medium (default)"
        inputProps={{ placeholder: "Medium size" }}
      />
    </div>
  )
}
