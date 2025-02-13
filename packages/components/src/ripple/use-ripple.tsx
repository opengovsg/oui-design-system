"use client"

import type { Key } from "react"
import type { PressEvent } from "react-aria-components"
import { useCallback, useState } from "react"
import { nanoid } from "nanoid"

export interface RippleType {
  key: React.Key
  x: number
  y: number
  size: number
}

export const useRipple = () => {
  const [ripples, setRipples] = useState<RippleType[]>([])

  const onPress = useCallback((event: PressEvent) => {
    const trigger = event.target

    const size = Math.max(trigger.clientWidth, trigger.clientHeight)

    setRipples((prevRipples) => [
      ...prevRipples,
      {
        key: nanoid(),
        size,
        x: event.x - size / 2,
        y: event.y - size / 2,
      },
    ])
  }, [])

  const onClear = useCallback((key: Key) => {
    setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key))
  }, [])

  return { ripples, onPress, onClear }
}

export type UseRippleReturn = ReturnType<typeof useRipple>
