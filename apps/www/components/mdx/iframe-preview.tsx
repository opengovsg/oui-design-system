"use client"

import { useEffect, useRef, useState } from "react"
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect"
import { useIsMobile } from "@/hooks/use-media-query"
import { motion, useMotionValue, useTransform } from "motion/react"

import { tv } from "@opengovsg/oui-theme"

const resizer = tv({
  slots: {
    base: "xs:hidden absolute right-[5px] z-10 flex w-auto items-center justify-end",
    main: "relative w-full",
    barWrapper:
      "d-flex bg-grey-500 absolute flex h-auto w-[10px] cursor-ew-resize items-center justify-center rounded-sm select-none active:opacity-80",
    barInner: "relative z-10",
    bar: "bg-default-400 h-[40px] w-[6px] rounded-full",
    iframeWrapper:
      "border-default-200 dark:border-default-100 relative z-10 h-full w-full overflow-hidden rounded-lg border",
    iframe: "z-10 h-full w-full overflow-scroll border-none",
  },
  variants: {
    hasInitialWidth: {
      true: {
        base: "justify-start",
      },
    },
    isMobile: {
      true: {
        barInner: "hidden",
      },
    },
    enablePointerEvents: {
      true: {
        iframe: "pointer-events-auto",
        iframeWrapper: "pointer-events-auto",
      },
      false: {
        iframe: "pointer-events-none select-none",
        iframeWrapper: "pointer-events-none select-none",
      },
    },
  },
  defaultVariants: {
    hasInitialWidth: false,
    isMobile: false,
    enablePointerEvents: true,
  },
})

export interface IframePreviewProps {
  resizeEnabled?: boolean
  iframeHeight?: string | number
  iframeMinWidth?: number
  iframeSrc?: string
  iframeInitialWidth?: number
  iframeTitle?: string
}

const MIN_WIDTH = 320

export const IframePreview: React.FC<IframePreviewProps> = (props) => {
  let constraintsResizerRef = useRef<HTMLDivElement>(null)
  let resizerRef = useRef<HTMLDivElement>(null)
  let iframeRef = useRef<HTMLIFrameElement>(null)
  const [enablePointerEvents, setEnablePointerEvents] = useState(true)

  const isMobile = useIsMobile()

  const {
    iframeSrc,
    iframeTitle,
    resizeEnabled,
    iframeHeight: height = "420px",
    iframeInitialWidth,
    iframeMinWidth: minWidth = MIN_WIDTH,
  } = props
  const hasInitialWidth = iframeInitialWidth !== undefined

  const { main, base, barInner, barWrapper, bar, iframe, iframeWrapper } =
    resizer({
      hasInitialWidth,
      isMobile,
      enablePointerEvents,
    })

  const resizerX = useMotionValue(0)
  const browserWidth = useTransform(resizerX, (x) =>
    hasInitialWidth
      ? iframeInitialWidth + x + 14
      : `calc(100% + ${x}px - 14px)`,
  )

  useIsomorphicLayoutEffect(() => {
    let observer = new window.ResizeObserver(() => {
      if (constraintsResizerRef.current && resizerRef.current) {
        let width =
          constraintsResizerRef.current.offsetWidth -
          resizerRef.current.offsetWidth

        if (resizerX.get() > width) {
          resizerX.set(width)
        }
      }
    })

    constraintsResizerRef.current &&
      observer.observe(constraintsResizerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!resizerRef.current) {
      return
    }
    resizerRef.current.onselectstart = () => false
  }, [])

  return (
    <div className={main()} style={{ height }}>
      <motion.div
        className={iframeWrapper()}
        style={{
          width: isMobile ? "100%" : browserWidth,
        }}
      >
        <motion.iframe
          ref={iframeRef}
          className={iframe()}
          src={iframeSrc}
          title={iframeTitle}
        />
      </motion.div>
      {resizeEnabled && (
        <div
          ref={constraintsResizerRef}
          className={base({
            className: "xs:w-mw-xs top-0 right-0 bottom-0 z-1",
          })}
          style={{
            width: `calc(100% - ${hasInitialWidth ? iframeInitialWidth : minWidth}px - 20px)`,
          }}
        >
          <motion.div
            ref={resizerRef}
            _dragX={resizerX}
            className={barWrapper()}
            drag="x"
            dragConstraints={constraintsResizerRef}
            dragElastic={0}
            dragMomentum={false}
            style={{ x: resizerX }}
            onDragEnd={() => {
              document.documentElement.classList.remove("dragging-ew")
              iframeRef.current?.classList.remove("dragging-ew")
              setEnablePointerEvents(true)
            }}
            onDragStart={() => {
              document.documentElement.classList.add("dragging-ew")
              iframeRef.current?.classList.add("dragging-ew")
              setEnablePointerEvents(false)
            }}
          >
            <div className={barInner()}>
              <div className={bar()} />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
