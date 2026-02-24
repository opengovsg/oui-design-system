import { TextAreaField } from "@opengovsg/oui"

export default function TextAreaFieldWithDescription() {
  return (
    <TextAreaField
      label="Feedback"
      description="Max 500 characters."
      inputProps={{
        placeholder: "Tell us what you think",
      }}
    />
  )
}
