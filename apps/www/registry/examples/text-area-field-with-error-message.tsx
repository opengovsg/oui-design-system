import { TextAreaField } from "@opengovsg/oui"

export default function TextAreaFieldWithErrorMessage() {
  return (
    <TextAreaField
      label="Feedback"
      isInvalid
      defaultValue="x"
      errorMessage="Please enter at least 10 characters."
    />
  )
}
