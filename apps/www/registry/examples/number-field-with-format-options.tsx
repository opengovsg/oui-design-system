import { NumberField } from "@opengovsg/oui"

export default function NumberFieldWithFormatOptions() {
  return (
    <div className="flex flex-col gap-4">
      <NumberField
        label="Currency"
        defaultValue={1000}
        formatOptions={{
          style: "currency",
          currency: "USD",
        }}
      />
      <NumberField
        label="Percentage"
        defaultValue={0.5}
        formatOptions={{
          style: "percent",
        }}
      />
      <NumberField
        label="Unit"
        defaultValue={10}
        formatOptions={{
          style: "unit",
          unit: "kilogram",
        }}
      />
    </div>
  )
}
