import { useMemo } from "react"

import type { AvatarVariantProps } from "@opengovsg/oui-theme"

import type { UseAvatarGroupProps } from "./avatar-group-context"
import { forwardRef } from "../system/utils"
import { AvatarFallback, AvatarRoot } from "./avatar"
import { AvatarGroupProvider, useAvatarGroup } from "./avatar-group-context"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AvatarGroupProps extends UseAvatarGroupProps {}

export const AvatarGroup = forwardRef<"div", AvatarGroupProps>((props, ref) => {
  const {
    Component,
    clones,
    context,
    remainingCount,
    getAvatarGroupCountProps,
    getAvatarGroupProps,
    renderCount,
  } = useAvatarGroup({
    ...props,
    ref,
  })

  const renderedCount = useMemo(() => {
    if (remainingCount <= 0) return null
    if (renderCount) {
      return renderCount(remainingCount)
    }

    const countAvatarVariantProps: Partial<AvatarVariantProps> = {
      prominence: "subtle",
      color: "primary",
    }
    if (context.prominence === "subtle") {
      countAvatarVariantProps.color = "white"
    }

    return (
      <AvatarRoot
        {...countAvatarVariantProps}
        {...getAvatarGroupCountProps()}
        name={`+${remainingCount}`}
      >
        <AvatarFallback>+{remainingCount}</AvatarFallback>
      </AvatarRoot>
    )
  }, [
    context.prominence,
    getAvatarGroupCountProps,
    remainingCount,
    renderCount,
  ])

  return (
    <Component {...getAvatarGroupProps()}>
      <AvatarGroupProvider.Provider value={context}>
        {clones}
        {renderedCount}
      </AvatarGroupProvider.Provider>
    </Component>
  )
})

AvatarGroup.displayName = "AvatarGroup"
