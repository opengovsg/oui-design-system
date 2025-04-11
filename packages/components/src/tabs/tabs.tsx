"use client"

import type {
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsProps,
} from "react-aria-components"
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  composeRenderProps,
} from "react-aria-components"

import {
  tabListStyles,
  tabPanelStyles,
  tabsStyles,
  tabStyles,
} from "@opengovsg/oui-theme"

export function Tabs(props: TabsProps) {
  return (
    <AriaTabs
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabsStyles({ ...renderProps, className }),
      )}
    />
  )
}

export function TabList<T extends object>(props: TabListProps<T>) {
  return (
    <AriaTabList
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabListStyles({ ...renderProps, className }),
      )}
    />
  )
}

export function Tab(props: TabProps) {
  return (
    <AriaTab
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabStyles({ ...renderProps, className }),
      )}
    />
  )
}

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
