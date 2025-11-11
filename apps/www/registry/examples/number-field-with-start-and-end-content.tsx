import { NumberField } from "@opengovsg/oui"

export default function NumberFieldWithStartAndEndContent() {
  return (
    <NumberField
      label="Price"
      defaultValue={100}
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-interaction-main-default">$</span>
        </div>
      }
      endContent={
        <div className="flex items-center">
          <label className="sr-only" htmlFor="currency">
            Currency
          </label>
          <select
            aria-label="Select currency"
            className="text-interaction-main-default border-0 bg-transparent outline-transparent outline-solid"
            defaultValue="SGD"
            id="currency"
            name="currency"
          >
            <option aria-label="SG Dollar" value="SGD">
              SGD
            </option>
            <option aria-label="US Dollar" value="USD">
              USD
            </option>
            <option aria-label="Euro" value="EUR">
              EUR
            </option>
          </select>
        </div>
      }
    />
  )
}
