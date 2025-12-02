import { cn } from "@opengovsg/oui-theme"

import { CopyButton } from "./copy-button"

export const CodeBlock = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) => {
  return (
    <div className="relative mt-6 mb-6 rounded-xl font-mono text-sm font-normal">
      <div className="absolute top-3 right-3 z-10">
        <CopyButton>{children}</CopyButton>
      </div>
      <div className="w-full p-[2px]">
        <pre
          className={cn("overflow-x-auto rounded-md p-4 font-mono", className)}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  )
}
