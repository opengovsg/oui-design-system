"use client"

import { tagFieldStyles } from "@opengovsg/oui-theme"
import { ChevronDown } from "lucide-react"
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
      <div className={styles.root({ className: classNames?.root })}>
        <Label className={styles.label({ className: classNames?.label })}>
          {props.label}
        </Label>
        <FieldGroup
          className={composeRenderProps(
            classNames?.group,
            (className, renderProps) =>
              styles.group({ className, ...renderProps }),
          )}
        >
          <div className="flex flex-1 flex-row flex-wrap gap-1">
            <TagFieldTagList
              classNames={{
                tag: styles.tag({ className: classNames?.tag }),
                tagIcon: styles.tagIcon({ className: classNames?.tagIcon }),
              }}
            />
            <Input
              variant="unstyled"
              className={composeRenderProps(
                classNames?.input,
                (className, renderProps) =>
                  styles.input({ className, ...renderProps }),
              )}
            />
          </div>
          <TagFieldTrigger
            className={styles.trigger({ className: classNames?.trigger })}
          >
            <ChevronDown />
          </TagFieldTrigger>
        </FieldGroup>
        {props.description && (
          <Description
            className={styles.description({
              className: classNames?.description,
            })}
          >
            {props.description}
          </Description>
        )}
        <FieldError
          className={styles.error({
            className: classNames?.error,
          })}
        >
          {props.errorMessage}
        </FieldError>
      </div>
      <Popover>
        <TagFieldList
          classNames={{
            list: styles.list({ className: classNames?.list }),
            listItem: styles.listItem({ className: classNames?.listItem }),
          }}
        />
      </Popover>
    </TagFieldRoot>
  )
}
