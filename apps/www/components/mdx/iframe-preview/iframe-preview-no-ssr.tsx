"use client"

import dynamic from "next/dynamic"

export const IframePreviewNoSsr = dynamic(() => import("./iframe-preview"), {
  ssr: false,
})
