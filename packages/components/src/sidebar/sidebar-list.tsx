import type React from "react"
import { useMemo } from "react"
import { ChevronDown } from "lucide-react"
import {
  Button,
  Disclosure,
  DisclosurePanel,
  Link,
  Provider,
} from "react-aria-components"
import { useDisclosureState } from "react-stately"

import { dataAttr } from "@opengovsg/oui-theme"

import type { SidebarListProps } from "./types"
import { forwardRef } from "../system/utils"
import {
  SidebarNestContext,
  useSidebarCollapseContext,
  useSidebarNestContext,
  useSidebarStyleContext,
} from "./context"

interface SidebarListSectionProps
  extends Pick<
    SidebarListProps,
    "startContent" | "endContent" | "isExpanded" | "linkProps"
  > {
  onlyCaretToggle?: boolean
  children: React.ReactNode
}
const SidebarListSection = ({
  onlyCaretToggle,
  isExpanded,
  children,
  linkProps,
}: SidebarListSectionProps) => {
  const { slots, classNames } = useSidebarStyleContext()
  const { isNested } = useSidebarNestContext() ?? {}

  if (onlyCaretToggle) {
    return (
      <div
        data-expanded={dataAttr(isExpanded)}
        className={slots.item({
          className: classNames?.item,
          isExpanded,
          isNested,
        })}
      >
        <Link {...linkProps}>{children}</Link>
        <Button slot="trigger">
          {({ isDisabled }) => (
            <>
              <ChevronDown
                aria-hidden
                className={slots.chevron({ isExpanded, isDisabled })}
              />
            </>
          )}
        </Button>
      </div>
    )
  }

  return (
    <Button
      data-expanded={dataAttr(isExpanded)}
      slot="trigger"
      className={slots.item({
        className: classNames?.item,
        isExpanded,
        isNested,
      })}
    >
      {({ isDisabled }) => (
        <>
          {children}
          <ChevronDown
            aria-hidden
            className={slots.chevron({ isExpanded, isDisabled })}
          />
        </>
      )}
    </Button>
  )
}

export const SidebarList = forwardRef<"li", SidebarListProps>(
  (
    {
      label,
      children,
      startContent,
      endContent,
      isSelected,
      defaultIsExpanded,
      isExpanded: isExpandedProp,
      onExpand: onExpandProp,
      onlyCaretToggle = false,
      ...props
    },
    ref,
  ) => {
    const { slots, classNames } = useSidebarStyleContext()
    const { isNested } = useSidebarNestContext() ?? {}
    const { isCollapsed } = useSidebarCollapseContext() ?? {}

    const { isExpanded, setExpanded } = useDisclosureState({
      defaultExpanded: defaultIsExpanded,
      isExpanded: isExpandedProp,
      onExpandedChange: onExpandProp,
    })

    const dataSelected = useMemo(() => {
      if (typeof isSelected === "function") {
        return isSelected()
      }
      return isSelected
    }, [isSelected])

    if (isCollapsed) {
      // Skip rendering Disclosure and render children directly when collapsed, as the list will not be expandable and the children will be hidden by CSS. This also allows the tooltip to work without needing to wrap each child with a tooltip trigger.
      return children
    }

    return (
      <li
        data-selected={dataAttr(dataSelected)}
        className={slots.list({
          className: classNames?.list,
        })}
        ref={ref}
      >
        <Disclosure
          className={slots.section({
            className: classNames?.section,
            isExpanded,
          })}
          isExpanded={isExpanded}
          onExpandedChange={setExpanded}
        >
          <SidebarListSection
            onlyCaretToggle={onlyCaretToggle}
            startContent={startContent}
            endContent={endContent}
            isExpanded={isExpanded}
            linkProps={props}
          >
            <span
              className={slots.label({
                className: classNames?.label,
                isNested,
                isExpanded,
              })}
            >
              {startContent}
              {label}
              {endContent}
            </span>
          </SidebarListSection>
          <DisclosurePanel
            className={slots.nestedPanel({
              className: classNames?.nestedPanel,
            })}
          >
            <Provider
              values={[[SidebarNestContext, { isNested: true, isExpanded }]]}
            >
              <ul
                className={slots.ul({
                  className: classNames?.ul,
                  isNested: true,
                  isExpanded,
                })}
              >
                {children}
              </ul>
            </Provider>
          </DisclosurePanel>
        </Disclosure>
      </li>
    )
  },
)

SidebarList.displayName = "SidebarList"
