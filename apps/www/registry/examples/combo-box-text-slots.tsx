"use client"

import { ComboBox, ComboBoxItem } from "@opengovsg/oui"

export default function ComboBoxTextSlots() {
  return (
    <ComboBox label="Select action">
      <ComboBoxItem description="Add to current watch queue.">
        Add to queue
      </ComboBoxItem>
      <ComboBoxItem description="Post a review for the episode.">
        Add review
      </ComboBoxItem>
      <ComboBoxItem
        description="Add series to your subscription list and be notified when a new
          episode airs."
      >
        Subscribe to series
      </ComboBoxItem>
      <ComboBoxItem description="Report an issue/violation.">
        Report
      </ComboBoxItem>
    </ComboBox>
  )
}
