import { NumberField } from "@opengovsg/oui"

export default function NumberFieldSizes() {
  return (
    <div className="flex flex-col gap-6">
      <NumberField
        size="xs"
        label="Extra Small"
        inputProps={{ placeholder: "Extra small size" }}
      />
      <NumberField
        size="sm"
        label="Small"
        inputProps={{ placeholder: "Small size" }}
      />
      <NumberField
        size="md"
        label="Medium (default)"
        inputProps={{ placeholder: "Medium size" }}
      />
    </div>
  )
}
