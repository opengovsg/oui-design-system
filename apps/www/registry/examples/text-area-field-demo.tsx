import { TextAreaField } from "@opengovsg/oui"

export default function TextAreaFieldDemo() {
  return (
    <TextAreaField
      label="Comments about OUI"
      inputProps={{
        placeholder: "I love OUI because...",
      }}
    />
  )
}
