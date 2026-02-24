import { TextAreaField } from "@opengovsg/oui"

export default function TextAreaFieldDisabled() {
  return (
    <TextAreaField
      label="Feedback"
      defaultValue="This field is disabled."
      isDisabled
    />
  )
}
