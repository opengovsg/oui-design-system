import { cn } from "@opengovsg/oui-theme"
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"

import { readRegistryFile } from "@/lib/mdx"

import { CodeCollapsible } from "./code-collapsible"
import { ComponentRenderer } from "./component-renderer"
import { IframePreviewNoSsr } from "./iframe-preview"
import { PreviewErrorBoundary } from "./preview-error-boundary"

interface ComponentPreviewProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
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
      {/*
        `not-prose` opts the live demo out of the `.prose` typography fumadocs'
        DocsBody applies to MDX content. `oui-preview` + an explicit light
        background/`color-scheme` keep the demo in light mode regardless of the
        docs site theme, since OUI has no dark mode (see globals.css).
      */}
      <div
        className={cn(
          "oui-preview not-prose flex w-full items-center justify-start overflow-auto bg-white text-zinc-950 [color-scheme:light]",
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
