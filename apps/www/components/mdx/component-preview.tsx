import { Index } from "@/__registry__"
import { readRegistryFile } from "@/lib/mdx"
import { highlightCode } from "@/lib/shiki"

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"

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
        className="code-highlight overflow-x-auto rounded-tr-md rounded-b-md bg-zinc-950 p-4 font-mono text-sm dark:bg-zinc-900"
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
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs
        variant="bordered"
        defaultSelectedKey="preview"
        className="relative mr-auto mb-4 w-full gap-0"
      >
        <div className="border-base-divider-strong z-11 flex w-full items-center justify-between">
          <TabList className="-mb-px">
            <Tab className="rounded-es-none!" id="preview">
              Preview
            </Tab>
            <Tab className="rounded-ee-none!" id="code">
              Code
            </Tab>
          </TabList>
        </div>
        <TabPanels>
          <TabPanel
            id="preview"
            className={cn(
              "relative rounded-tr-md rounded-b-md",
              !asIframe && "border-base-divider-strong border",
            )}
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
              <div className="relative w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-87.5 [&_pre]:overflow-auto">
                <PreviewErrorBoundary>
                  <Code name={name} />
                </PreviewErrorBoundary>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
