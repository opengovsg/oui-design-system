"use client"

import { Radio, RadioGroup } from "@opengovsg/oui"

export default function RadioGroupWithDescription() {
  return (
    <RadioGroup label="Payment method" defaultValue="card">
      <Radio value="card" description="Pay securely with credit or debit card">
        Credit Card
      </Radio>
      <Radio
        value="paypal"
        description="Fast checkout with your PayPal account"
      >
        PayPal
      </Radio>
      <Radio value="bank" description="Processing may take 2-3 business days">
        Bank Transfer
      </Radio>
    </RadioGroup>
  )
}
