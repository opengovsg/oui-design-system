"use client"

import type React from "react"
import type {
  DisclosurePanelProps as AriaDisclosurePanelProps,
  DisclosureProps as AriaDisclosureProps,
  ButtonRenderProps,
  DisclosureGroupProps,
  RenderProps,
} from "react-aria-components"
import { useContext } from "react"
import { ChevronDown } from "lucide-react"
import {
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  Button,
  composeRenderProps,
  DisclosureGroup,
  DisclosureStateContext,
  Heading,
} from "react-aria-components"

import type {
  AccordionSlots,
  AccordionVariantProps,
  SlotsToClasses,
} from "@opengovsg/oui-theme"
import {
  accordionStyles,
  cn,
  composeTailwindRenderProps,
} from "@opengovsg/oui-theme"

import { createContext } from "../system/react-utils"
import { renderChildren } from "../system/react-utils/children"
import { forwardRef, mapPropsVariants } from "../system/utils"

export interface UseProvideAccordionStylesReturn {
  slots: ReturnType<typeof accordionStyles>
  classNames?: SlotsToClasses<AccordionSlots>
}

export const [AccordionStyleContext, useAccordionStyleContext] =
  createContext<UseProvideAccordionStylesReturn>({
    name: "AccordionStyleContext",
    strict: true,
  })

export interface AccordionItemProps
  extends Omit<
    AriaDisclosureProps,
    "isExpanded" | "defaultExpanded" | "onExpandedChange"
  > {
  children: React.ReactNode
  classNames?: SlotsToClasses<AccordionSlots>
}

export const AccordionItem = forwardRef<"div", AccordionItemProps>(
  ({ classNames, className, children, ...props }, ref) => {
    const { slots } = useContext(AccordionStyleContext)
    return (
      <AriaDisclosure
        {...props}
        ref={ref}
        className={composeRenderProps(className, (className, renderProps) =>
          slots.item({
            ...renderProps,
            className: cn(classNames?.item, className),
          }),
        )}
      >
        {children}
      </AriaDisclosure>
    )
  },
)
AccordionItem.displayName = "AccordionItem"

export interface AccordionHeaderRenderProps extends ButtonRenderProps {
  isExpanded: boolean
}

export interface AccordionHeaderProps
  extends Pick<RenderProps<AccordionHeaderRenderProps>, "children"> {
  classNames?: SlotsToClasses<
    Extract<
      AccordionSlots,
      | "heading"
      | "title"
      | "trigger"
      | "indicator"
      | "startContentWrapper"
      | "endContentWrapper"
    >
  >

  /**
   * The indicator. Defaults to a chevron icon.
   */
  indicator?: RenderProps<AccordionHeaderRenderProps>["children"]

  /**
   * Whether to hide the indicator.
   * @default false
   */
  hideIndicator?: boolean

  /**
   * The header start content.
   */
  startContent?: RenderProps<AccordionHeaderRenderProps>["children"]
  /**
   * The header end content.
   */
  endContent?: RenderProps<AccordionHeaderRenderProps>["children"]
}

export function AccordionHeader({
  children,
  classNames,
  indicator,
  startContent,
  endContent,
  hideIndicator = false,
}: AccordionHeaderProps) {
  const { slots, classNames: contextClassNames } = useContext(
    AccordionStyleContext,
  )

  const { isExpanded } = useContext(DisclosureStateContext)!

  return (
    <Heading
      className={slots.heading({
        className: cn(contextClassNames?.heading, classNames?.heading),
      })}
    >
      <Button
        slot="trigger"
        className={slots.trigger({
          className: cn(contextClassNames?.trigger, classNames?.trigger),
        })}
      >
        {(buttonRenderProps) => {
          const headerRenderProps = { ...buttonRenderProps, isExpanded }
          return (
            <>
              {startContent && (
                <div
                  className={slots.startContentWrapper({
                    className: cn(
                      contextClassNames?.startContentWrapper,
                      classNames?.startContentWrapper,
                    ),
                  })}
                >
                  {renderChildren(headerRenderProps, startContent)}
                </div>
              )}
              <span
                className={slots.title({
                  className: cn(contextClassNames?.title, classNames?.title),
                })}
              >
                {renderChildren(headerRenderProps, children)}
              </span>
              {!hideIndicator && (
                <span
                  aria-hidden
                  className={slots.indicator({
                    isExpanded,
                    className: cn(
                      contextClassNames?.indicator,
                      classNames?.indicator,
                    ),
                  })}
                >
                  {renderChildren(
                    headerRenderProps,
                    indicator ?? <ChevronDown />,
                  )}
                </span>
              )}
              {endContent && (
                <div
                  className={slots.endContentWrapper({
                    className: cn(
                      contextClassNames?.endContentWrapper,
                      classNames?.endContentWrapper,
                    ),
                  })}
                >
                  {renderChildren(headerRenderProps, endContent)}
                </div>
              )}
            </>
          )
        }}
      </Button>
    </Heading>
  )
}

export interface AccordionContentProps extends AriaDisclosurePanelProps {
  children: React.ReactNode
  classNames?: SlotsToClasses<"panel" | "content">
}

export function AccordionContent({
  children,
  classNames,
  ...props
}: AccordionContentProps) {
  const { slots, classNames: contextClassNames } = useContext(
    AccordionStyleContext,
  )
  return (
    <AriaDisclosurePanel
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        slots.panel({
          className: cn(contextClassNames?.panel, classNames?.panel),
        }),
      )}
    >
      <div
        className={slots.content({
          className: cn(contextClassNames?.content, classNames?.content),
        })}
      >
        {children}
      </div>
    </AriaDisclosurePanel>
  )
}

export interface AccordionProps
  extends DisclosureGroupProps,
    AccordionVariantProps {
  children: React.ReactNode
  classNames?: SlotsToClasses<AccordionSlots>
}

export const Accordion = forwardRef<"div", AccordionProps>(
  (originalProps, ref) => {
    const [
      { classNames, className, ...props },
      { size = "md", ...variantProps },
    ] = mapPropsVariants(originalProps, accordionStyles.variantKeys)

    const slots = accordionStyles({ size, ...variantProps })

    return (
      <AccordionStyleContext.Provider
        value={{
          slots,
          classNames,
        }}
      >
        <DisclosureGroup
          className={slots.base({
            className: cn(classNames?.base, className),
          })}
          {...props}
          ref={ref}
        />
      </AccordionStyleContext.Provider>
    )
  },
)
Accordion.displayName = "Accordion"
