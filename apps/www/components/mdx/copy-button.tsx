"use client"

import React, { useState } from "react"
import { cn } from "@opengovsg/oui-theme"
import { Copy, CopyCheck } from "lucide-react"

export const CopyButton = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    const sourceCode = extractSourceCode(children)
    await navigator.clipboard.writeText(sourceCode)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  const extractSourceCode = (node: React.ReactNode): string => {
    if (typeof node === "string") {
      return node
    }
    if (Array.isArray(node)) {
      return node.map(extractSourceCode).join("")
    }
    if (React.isValidElement(node)) {
      const { props } = node
      const children = React.Children.map(
        // @ts-ignore
        props.children,
        extractSourceCode,
      )?.join("")
      return `${children}`
    }
    return ""
  }

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className={cn("cursor-pointer text-white", className)}
    >
      {isCopied ? (
        <CopyCheck className="text-green-200" size={16} strokeWidth={1.5} />
      ) : (
        <Copy size={16} strokeWidth={1.5} />
      )}
    </button>
  )
}
