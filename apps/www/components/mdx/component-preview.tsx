import { readRegistryFile } from "@/lib/mdx"
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"

import { cn } from "@opengovsg/oui-theme"

import { CodeCollapsible } from "./code-collapsible"
import { ComponentRenderer } from "./component-renderer"
import { IframePreviewNoSsr } from "./iframe-preview"
import { PreviewErrorBoundary } from "./preview-error-boundary"

interface ComponentPreviewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  name: string
  asIframe?: boolean
  iframeInitialWidth?: number
  iframeSrc?: string
  previewHeight?: string
}

const Code = async ({ name }: { name: string }) => {
  const source = await readRegistryFile(name)
  return (
    <DynamicCodeBlock
      lang="tsx"
      code={source}
      options={{ themes: { light: "github-light", dark: "github-dark" } }}
    />
  )
}

export function ComponentPreview({
  name,
  className,
  asIframe,
  iframeInitialWidth,
  iframeSrc,
  previewHeight = "auto",
  ...props
}: ComponentPreviewProps) {
  const content = asIframe ? (
    <IframePreviewNoSsr
      iframeHeight={previewHeight}
      iframeTitle={name}
      iframeInitialWidth={iframeInitialWidth}
      resizeEnabled
      iframeSrc={iframeSrc}
    />
  ) : (
    <ComponentRenderer name={name} />
  )

  return (
    <div
      className={cn(
        "border-base-divider-strong group relative my-6 overflow-hidden rounded-xl border",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex w-full items-center justify-start overflow-auto",
          !asIframe && "p-4 md:p-6 lg:p-10",
        )}
      >
        {content}
      </div>
      <CodeCollapsible>
        <PreviewErrorBoundary>
          <Code name={name} />
        </PreviewErrorBoundary>
      </CodeCollapsible>
    </div>
  )
}
