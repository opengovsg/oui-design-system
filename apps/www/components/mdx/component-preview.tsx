import { Index } from "@/__registry__"
import { readRegistryFile } from "@/lib/mdx"
import { highlightCode } from "@/lib/shiki"

import { cn } from "@opengovsg/oui-theme"

import { CodeCollapsible } from "./code-collapsible"
import { CopyButton } from "./copy-button"
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

const RenderedComponent = ({ name }: { name: string }) => {
  const Component = Index[name]?.component
  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  return <Component />
}

const Code = async ({ name }: { name: string }) => {
  const source = await readRegistryFile(name)
  // `html` is produced by Shiki from a committed registry example file (trusted,
  // not user input), so injecting it as markup is safe here.
  const html = await highlightCode(source)
  return (
    <div className="relative">
      <div
        className="code-highlight max-h-[31.25rem] overflow-auto bg-zinc-950 p-4 font-mono text-sm dark:bg-zinc-900 [&_pre]:my-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="absolute top-4 right-4 text-white">
        <CopyButton className="text-inherit">{source}</CopyButton>
      </div>
    </div>
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
    <RenderedComponent name={name} />
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
