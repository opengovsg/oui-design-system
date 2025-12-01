import { Index } from "@/__registry__"
import { readRegistryFile } from "@/lib/mdx"
import { highlightCode } from "@/lib/shiki"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"

import { cn } from "@opengovsg/oui-theme"

import { CopyButton } from "./copy-button"
import { IframePreview } from "./iframe-preview"
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

const Code = async ({
  name,
  showCopy = true,
}: {
  name: string
  showCopy?: boolean
}) => {
  const source = await readRegistryFile(name)
  const html = await highlightCode(source)
  return (
    <>
      <div
        className="code-highlight overflow-x-auto rounded-md bg-zinc-950 p-4 font-mono text-sm dark:bg-zinc-900"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {showCopy && (
        <div className="absolute top-4 right-4 text-white">
          <CopyButton className="text-inherit">{source}</CopyButton>
        </div>
      )}
    </>
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
    <IframePreview
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
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <TabGroup defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <Tab
              id="preview"
              className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            >
              Preview
            </Tab>
            <Tab
              id="code"
              className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            >
              Code
            </Tab>
          </TabList>
        </div>
        <TabPanels>
          <TabPanel
            id="preview"
            className={cn("relative rounded-md", !asIframe && "border")}
          >
            <div
              className={cn(
                "flex w-full items-center justify-start overflow-auto",
                !asIframe && "p-4 md:p-6 lg:p-10",
              )}
            >
              {content}
            </div>
          </TabPanel>
          <TabPanel id="code">
            <div className="flex flex-col space-y-4">
              <div className="relative w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                <PreviewErrorBoundary>
                  <Code name={name} />
                </PreviewErrorBoundary>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
}
