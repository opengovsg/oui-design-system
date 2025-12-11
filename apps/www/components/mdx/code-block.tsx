import { cn } from "@opengovsg/oui-theme"

import { CopyButton } from "./copy-button"

export const CodeBlock = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) => {
  return (
    <div className="relative mt-6 mb-6 font-mono text-sm font-normal [figcaption+&]:mt-0 [figcaption+&]:rounded-t-none">
      <div className="absolute top-3 right-3 z-10">
        <CopyButton>{children}</CopyButton>
      </div>
      <div className="w-full">
        <pre
          className={cn(
            "overflow-x-auto rounded-xl p-4 font-mono [[data-rehype-pretty-code-figure]:has(figcaption)_&]:rounded-t-none",
            className,
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  )
}
