"use client"

import type {
  TabListProps as AriaTabListProps,
  TabProps as AriaTabProps,
  TabsProps as AriaTabsProps,
  ContextValue,
  TabPanelProps,
} from "react-aria-components"
import { forwardRef } from "react"
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  composeRenderProps,
  Provider,
  useContextProps,
} from "react-aria-components"

import type {
  TabListVariantProps,
  TabsVariantProps,
  TabVariantProps,
} from "@opengovsg/oui-theme"
import {
  tabListStyles,
  tabPanelStyles,
  tabsStyles,
  tabStyles,
} from "@opengovsg/oui-theme"

import { createContext } from "../system/react-utils"
import { forwardRefGeneric, mapPropsVariants } from "../system/utils"

export const [TabsVariantContext, useTabsVariantContext] = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContextValue<TabsVariantProps, any>
>({
  name: "TabsVariantContext",
  strict: true,
})

export interface TabsProps extends AriaTabsProps, TabsVariantProps {}

export function Tabs(originalProps: TabsProps) {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    tabsStyles.variantKeys,
  )
  return (
    <Provider values={[[TabsVariantContext, variantProps]]}>
      <AriaTabs
        {...props}
        className={composeRenderProps(
          props.className,
          (className, renderProps) =>
            tabsStyles({ ...renderProps, ...variantProps, className }),
        )}
      />
    </Provider>
  )
}

export interface TabListProps<T extends object>
  extends AriaTabListProps<T>,
    TabListVariantProps {}

export const TabList = forwardRefGeneric(function TabList<T extends object>(
  originalProps: TabListProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  ;[originalProps, ref] = useContextProps(
    originalProps,
    ref,
    TabsVariantContext,
  )
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    tabListStyles.variantKeys,
  )

  return (
    <AriaTabList
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabListStyles({ ...renderProps, ...variantProps, className }),
      )}
    />
  )
})

export interface TabProps extends AriaTabProps, TabVariantProps {}

export const Tab = forwardRef(function Tab(
  originalProps: TabProps,
  ref: React.Ref<object>,
) {
  ;[originalProps, ref] = useContextProps(
    originalProps,
    ref,
    TabsVariantContext,
  )
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    tabStyles.variantKeys,
  )

  return (
    <AriaTab
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabStyles({ ...renderProps, ...variantProps, className }),
      )}
    />
  )
})

export function TabPanel(props: TabPanelProps) {
  return (
    <AriaTabPanel
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabPanelStyles({ ...renderProps, className }),
      )}
    />
  )
}
