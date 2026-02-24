import { TextField } from "@opengovsg/oui"

export default function TextFieldSizes() {
  return (
    <div className="flex flex-col gap-6">
      <TextField
        size="xs"
        label="Extra Small"
        inputProps={{ placeholder: "Extra small size" }}
      />
      <TextField
        size="sm"
        label="Small"
        inputProps={{ placeholder: "Small size" }}
      />
      <TextField
        size="md"
        label="Medium (default)"
        inputProps={{ placeholder: "Medium size" }}
      />
    </div>
  )
}
