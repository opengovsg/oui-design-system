"use client"

import { tagFieldStyles } from "@opengovsg/oui-theme"
import { ChevronDown } from "lucide-react"
import { composeRenderProps, Popover } from "react-aria-components"

import { Description, FieldError, FieldGroup, Label } from "../field"
import { Input } from "../input"
import { TagFieldList, TagFieldListItem } from "./tag-field-list"
import { TagFieldRoot } from "./tag-field-root"
import { TagFieldTagList } from "./tag-field-tag-list"
import { TagFieldTrigger } from "./tag-field-trigger"
import { TagFieldItem, TagFieldProps } from "./types"

export function TagField<T extends TagFieldItem>({
  classNames,
  children,
  ...props
}: TagFieldProps<T>) {
  const styles = tagFieldStyles(props)

  return (
    <TagFieldRoot {...props}>
      <div className={styles.root({ className: classNames?.root })}>
        <Label
          size={props.size}
          className={styles.label({ className: classNames?.label })}
        >
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
                tagText: styles.tagText({ className: classNames?.tagText }),
                tagIcon: styles.tagIcon({ className: classNames?.tagIcon }),
              }}
            />
            <Input
              variant="unstyled"
              size={props.size}
              className={composeRenderProps(
                classNames?.field,
                (className, renderProps) =>
                  styles.field({ className, ...renderProps }),
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
            size={props.size}
            className={styles.description({
              className: classNames?.description,
            })}
          >
            {props.description}
          </Description>
        )}
        <FieldError
          size={props.size}
          className={styles.error({
            className: classNames?.error,
          })}
        >
          {props.errorMessage}
        </FieldError>
      </div>
      <Popover>
        <TagFieldList<T>
          className={styles.list({ className: classNames?.list })}
          itemClassNames={props.itemClassNames}
        >
          {({ key, ...props }) =>
            children ? (
              children({ key, ...props })
            ) : (
              <TagFieldListItem {...props} key={key} />
            )
          }
        </TagFieldList>
      </Popover>
    </TagFieldRoot>
  )
}
