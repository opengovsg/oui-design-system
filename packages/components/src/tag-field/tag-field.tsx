"use client"

import { Popover } from "react-aria-components"

import { Description, FieldError, FieldGroup, Label } from "../field"
import { Input } from "../input"
import { TagFieldChipList } from "./tag-field-chip-list"
import { TagFieldList } from "./tag-field-list"
import { TagFieldRoot } from "./tag-field-root"
import { TagFieldTrigger } from "./tag-field-trigger"
import { TagFieldItem, TagFieldProps } from "./types"

export function TagField<T extends TagFieldItem>(props: TagFieldProps<T>) {
  return (
    <TagFieldRoot {...props}>
      <Label>{props.label}</Label>
      <FieldGroup className="flex-wrap gap-1">
        <TagFieldChipList />
        <Input className="min-w-[56px]" />
        <TagFieldTrigger>&#8595;</TagFieldTrigger>
      </FieldGroup>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
      <Popover>
        <TagFieldList />
      </Popover>
    </TagFieldRoot>
  )
}
