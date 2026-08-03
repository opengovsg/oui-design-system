"use client"

import { clamp } from "motion"
import { AnimatePresence, domAnimation, LazyMotion } from "motion/react"
import * as m from "motion/react-m"
import type { CSSProperties } from "react"

import type { RippleType, UseRippleReturn } from "./use-ripple"

export interface RippleProps {
  ripples: RippleType[]
  color?: CSSProperties["backgroundColor"]
  style?: CSSProperties
  onClear: UseRippleReturn["onClear"]
}

export function Ripple({
  ripples = [],
  style,
  onClear,
  color = "currentColor",
}: RippleProps) {
  return (
    <>
      {ripples.map((ripple) => {
        const duration = clamp(
          0.2,
          ripple.size > 100 ? 0.75 : 0.5,
          0.01 * ripple.size,
        )
        return (
          <LazyMotion features={domAnimation} key={ripple.key}>
            <AnimatePresence mode="popLayout">
              <m.span
                animate={{ transform: "scale(2)", opacity: 0 }}
                exit={{ opacity: 0 }}
                initial={{ transform: "scale(0)", opacity: 0.35 }}
                onAnimationComplete={() => {
                  onClear(ripple.key)
                }}
                style={{
                  position: "absolute",
                  overflow: "hidden",
                  inset: 0,
                  zIndex: 0,
                  pointerEvents: "none",
                  borderRadius: "100%",
                  top: ripple.y,
                  left: ripple.x,
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  backgroundColor: color,
                  ...style,
                }}
                transition={{ duration }}
              />
            </AnimatePresence>
          </LazyMotion>
        )
      })}
    </>
  )
}
