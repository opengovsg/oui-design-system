import { NumberField } from "@opengovsg/oui"

export default function NumberFieldReadonly() {
  return (
    <NumberField
      label="Order Total"
      isReadOnly
      defaultValue={150}
      description="This value cannot be changed"
    />
  )
}
