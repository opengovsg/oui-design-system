import type { PropsWithChildren } from "react"
import { useMemo } from "react"
import { ChevronDown } from "lucide-react"
import {
  Button,
  Disclosure,
  DisclosurePanel,
  Provider,
} from "react-aria-components"
import { useDisclosureState } from "react-stately"

import { dataAttr } from "@opengovsg/oui-theme"

import type { SidebarListProps } from "./types"
import { forwardRef } from "../system/utils"
import { SidebarNestContext, useSidebarStyleContext } from "./context"

export const SidebarList = forwardRef<
  "li",
  PropsWithChildren<SidebarListProps>
>(
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
        {...props}
      >
        <Disclosure isExpanded={isExpanded} onExpandedChange={setExpanded}>
          <Button slot="trigger">
            {({ isDisabled }) => (
              <>
                <ChevronDown
                  aria-hidden
                  className={slots.chevron({ isExpanded, isDisabled })}
                />
                <span className={slots.label()}>
                  {startContent}
                  {label}
                  {endContent}
                </span>
              </>
            )}
          </Button>
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
