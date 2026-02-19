"use client"

import { Select, SelectItem } from "@opengovsg/oui"

const languages = [
  { id: "en", textValue: "English", code: "EN" },
  { id: "zh", textValue: "Chinese", code: "ZH" },
  { id: "ms", textValue: "Malay", code: "MS" },
  { id: "ta", textValue: "Tamil", code: "TA" },
]

export default function SelectCustomValue() {
  return (
    <div className="w-full max-w-xs">
      <Select
        label="Language"
        items={languages}
        defaultSelectedKey="en"
        renderSelectValue={(renderProps) => {
          if (renderProps.isPlaceholder) {
            return <span>Select a language</span>
          }
          const selected = languages.find(
            (l) => l.textValue === renderProps.selectedText,
          )
          return (
            <span>
              {selected?.code} — {renderProps.selectedText}
            </span>
          )
        }}
      >
        {(item) => <SelectItem id={item.id}>{item.textValue}</SelectItem>}
      </Select>
    </div>
  )
}
