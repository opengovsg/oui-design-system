import { TextAreaField } from "@opengovsg/oui"

export default function TextAreaFieldCustomStyles() {
  return (
    <TextAreaField
      label="Your feedback"
      description="Tell us what you think."
      classNames={{
        base: "rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 p-4",
        label: "font-mono uppercase text-amber-900",
        input:
          "rounded-xl border-amber-300 bg-white font-mono text-amber-900 placeholder:text-amber-400",
        description: "italic text-amber-600",
      }}
      inputProps={{ placeholder: "Type your feedback here..." }}
    />
  )
}
