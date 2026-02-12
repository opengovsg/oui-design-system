import type { PropsWithChildren } from "react"
import { useCallback, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import { Disclosure, Provider } from "react-aria-components"
import { useDisclosureState } from "react-stately"

import { dataAttr } from "@opengovsg/oui-theme"

import type { HtmlUiProps } from "../system/types"
import type { SidebarListProps } from "./types"
import { forwardRef } from "../system/utils"
import { SidebarNestContext, useSidebarStyleContext } from "./context"

interface SidebarSectionProps extends PropsWithChildren {
  isExpanded: boolean
}

const SidebarSection = ({ children, isExpanded }: SidebarSectionProps) => {
  const { slots } = useSidebarStyleContext()

  const child = <ul className={slots.section()}>{children}</ul>

  return <Disclosure isExpanded={isExpanded}>{child}</Disclosure>
}

type SectionWrapperProps = HtmlUiProps<"button"> &
  HtmlUiProps<"div"> & { onlyCaretToggle: boolean }

const SectionWrapper = ({
  children,
  onlyCaretToggle,
  ...props
}: PropsWithChildren<SectionWrapperProps>) => {
  if (onlyCaretToggle) return <div {...props}>{children}</div>

  return (
    <button type="button" {...props}>
      {children}
    </button>
  )
}
const ToggleChevronWrapper = ({
  children,
  onlyCaretToggle,
  ...props
}: PropsWithChildren<SectionWrapperProps>) => {
  if (onlyCaretToggle)
    return (
      <button type="button" {...props}>
        {children}
      </button>
    )

  return <div {...props}>{children}</div>
}

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
      isActive,
      defaultIsExpanded,
      isExpanded: isExpandedProp,
      onExpand: onExpandProp,
      onlyCaretToggle = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { slots } = useSidebarStyleContext()

    const { isExpanded, toggle } = useDisclosureState({
      defaultExpanded: defaultIsExpanded,
      isExpanded: isExpandedProp,
      onExpandedChange: onExpandProp,
    })

    const handleExpandSection = useCallback(() => {
      if (!onlyCaretToggle) {
        toggle()
      }
      onClick?.()
    }, [onClick, toggle, onlyCaretToggle])

    const dataActive = useMemo(() => {
      if (typeof isActive === "function") {
        return isActive()
      }
      return isActive
    }, [isActive])

    // const itemCss = useMemo(() => {
    //   const mergedStyles = merge({}, styles.item, styles.parent)
    //   if (onlyCaretToggle) return mergedStyles
    //   return merge({}, mergedStyles, { cursor: "pointer" })
    // }, [onlyCaretToggle, styles.item, styles.parent])

    return (
      <li className={slots.list()} ref={ref} {...props}>
        <div>
          <SectionWrapper
            data-expanded={dataAttr(isExpanded)}
            data-active={dataAttr(dataActive)}
            onClick={handleExpandSection}
            onlyCaretToggle={onlyCaretToggle}
          >
            <span className={slots.label()}>
              {startContent}
              {label}
              {endContent}
            </span>

            <ToggleChevronWrapper
              aria-label={onlyCaretToggle ? "Toggle section" : undefined}
              onClick={toggle}
              onlyCaretToggle={onlyCaretToggle}
              className={slots.chevron()}
            >
              <ChevronDown />
            </ToggleChevronWrapper>
          </SectionWrapper>
          <Provider values={[[SidebarNestContext, { nested: true }]]}>
            <SidebarSection isExpanded={isExpanded}>{children}</SidebarSection>
          </Provider>
        </div>
      </li>
    )
  },
)

SidebarList.displayName = "SidebarList"
