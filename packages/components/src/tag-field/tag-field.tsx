"use client"

import { tagFieldStyles } from "@opengovsg/oui-theme"
import { composeRenderProps, Popover } from "react-aria-components"

import { Description, FieldError, FieldGroup, Label } from "../field"
import { Input } from "../input"
import { TagFieldList } from "./tag-field-list"
import { TagFieldRoot } from "./tag-field-root"
import { TagFieldTagList } from "./tag-field-tag-list"
import { TagFieldTrigger } from "./tag-field-trigger"
import { TagFieldItem, TagFieldProps } from "./types"

export function TagField<T extends TagFieldItem>({
  classNames,
  ...props
}: TagFieldProps<T>) {
  const styles = tagFieldStyles(props)

  return (
    <TagFieldRoot {...props}>
      <div className="flex flex-col gap-2">
        <Label>{props.label}</Label>
        <FieldGroup
          className={composeRenderProps(
            classNames?.group,
            (className, renderProps) =>
              styles.group({ className, ...renderProps }),
          )}
        >
          <TagFieldTagList />
          <Input
            variant="unstyled"
            className={composeRenderProps(
              classNames?.input,
              (className, renderProps) =>
                styles.input({ className, ...renderProps }),
            )}
          />
          <TagFieldTrigger>&#8595;</TagFieldTrigger>
        </FieldGroup>
        {props.description && <Description>{props.description}</Description>}
        <FieldError>{props.errorMessage}</FieldError>
      </div>
      <Popover>
        <TagFieldList />
      </Popover>
    </TagFieldRoot>
  )
}
