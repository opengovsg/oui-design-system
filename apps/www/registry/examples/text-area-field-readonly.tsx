import { TextAreaField } from "@opengovsg/oui"

export default function TextAreaFieldReadonly() {
  return (
    <TextAreaField
      label="Feedback"
      defaultValue="This field is read-only."
      isReadOnly
    />
  )
}
