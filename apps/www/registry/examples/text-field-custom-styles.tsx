import { TextField } from "@opengovsg/oui"

export default function TextFieldCustomStyles() {
  return (
    <TextField
      label="Email address"
      description="We'll never share your email."
      classNames={{
        base: "rounded-lg bg-slate-900 p-4",
        label: "text-xs uppercase tracking-widest text-white",
        input:
          "rounded-full border-cyan-500 bg-slate-800 text-white placeholder:text-slate-400 focus:border-cyan-400",
        description: "text-slate-400",
      }}
      inputProps={{ placeholder: "you@example.com" }}
    />
  )
}
