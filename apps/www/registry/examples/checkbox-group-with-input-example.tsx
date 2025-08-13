"use client"

import { useRef } from "react"

import { Checkbox, CheckboxGroup, Input } from "@opengovsg/oui"

export default function CheckboxGroupDemo() {
  const checkboxRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <CheckboxGroup>
      <Checkbox value="sf">San Francisco</Checkbox>
      <Checkbox value="ny">New York</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
      <Checkbox
        value="other"
        inputRef={checkboxRef}
        onChange={(checked) => {
          // Upon checking checkbox, focus text input
          if (checked) {
            // setTimeout with a delay of 0 ms schedules the code to run after the current call stack is cleared.
            // this allows us to wait until the focus event has finished propagating.
            setTimeout(() => {
              inputRef.current?.focus()
            }, 0)
          }
        }}
      >
        <div className="flex flex-col gap-2">
          Other
          <Input
            ref={inputRef}
            onClick={(e) => e.stopPropagation()} // Prevent parent checkbox from being toggled due to event bubbling
            onKeyDownCapture={(e) => e.stopPropagation()} // Prevent parent checkbox from being toggled due to event bubbling
            onChange={(e) => {
              // If there is text in the input, ensure the checkbox is checked.
              if (e.target.value && !checkboxRef.current?.checked) {
                checkboxRef.current?.click()
              }
            }}
          />
        </div>
      </Checkbox>
    </CheckboxGroup>
  )
}
