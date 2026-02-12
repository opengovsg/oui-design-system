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
import { SidebarNestContext, useSidebarStyleContext } from "./context"

interface SidebarListSectionProps
  extends Pick<
    SidebarListProps,
    "label" | "startContent" | "endContent" | "isExpanded" | "linkProps"
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
  const { slots } = useSidebarStyleContext()

  if (onlyCaretToggle) {
    return (
      <div>
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
    <Button slot="trigger">
      {({ isDisabled }) => (
        <>
          <ChevronDown
            aria-hidden
            className={slots.chevron({ isExpanded, isDisabled })}
          />
          {children}
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
    const { slots } = useSidebarStyleContext()

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

    return (
      <li
        data-selected={dataAttr(dataSelected)}
        className={slots.list()}
        ref={ref}
      >
        <Disclosure isExpanded={isExpanded} onExpandedChange={setExpanded}>
          <SidebarListSection
            onlyCaretToggle={onlyCaretToggle}
            label={label}
            startContent={startContent}
            endContent={endContent}
            isExpanded={isExpanded}
            linkProps={props}
          >
            <span className={slots.label()}>
              {startContent}
              {label}
              {endContent}
            </span>
          </SidebarListSection>
          <DisclosurePanel>
            <Provider values={[[SidebarNestContext, { nested: true }]]}>
              <ul className={slots.section()}>{children}</ul>
            </Provider>
          </DisclosurePanel>
        </Disclosure>
      </li>
    )
  },
)

SidebarList.displayName = "SidebarList"
