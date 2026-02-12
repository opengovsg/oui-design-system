"use client"

import { useMemo } from "react"
import { ChevronDown } from "lucide-react"
import { useLocalizedStringFormatter } from "react-aria"
import {
  Button as AriaButton,
  Disclosure,
  DisclosurePanel,
  Link,
  Provider,
} from "react-aria-components"
import { useDisclosureState } from "react-stately"

import { dataAttr } from "@opengovsg/oui-theme"

import type { SidebarListProps } from "./types"
import { Button } from "../button"
import { forwardRef } from "../system/utils"
import {
  SidebarNestContext,
  useSidebarCollapseContext,
  useSidebarNestContext,
  useSidebarStyleContext,
} from "./context"
import { i18nStrings } from "./i18n"

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

  const stringFormatter = useLocalizedStringFormatter(i18nStrings)

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
        <Link
          className={slots.label({
            className: classNames?.label,
            isNested,
            isExpanded,
          })}
          {...linkProps}
        >
          {children}
        </Link>
        <Button
          isIconOnly
          variant="clear"
          color="none"
          slot="trigger"
          aria-label={stringFormatter.format(
            isExpanded ? "Collapse sidebar section" : "Expand sidebar section",
          )}
          className={slots.chevronContainer({
            className: classNames?.chevronContainer,
          })}
        >
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
    <AriaButton
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
          <span
            className={slots.label({
              className: classNames?.label,
              isNested,
              isExpanded,
            })}
          >
            {children}
          </span>
          <span
            className={slots.chevronContainer({
              className: classNames?.chevronContainer,
            })}
          >
            <ChevronDown
              aria-hidden
              className={slots.chevron({ isExpanded, isDisabled })}
            />
          </span>
        </>
      )}
    </AriaButton>
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
            {startContent}
            {label}
            {endContent}
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
