import type { NpmCommands } from "@/types/unist"
import type { ImageProps } from "next/image"
import Image from "next/image"
import Link from "next/link"
import { CircleAlertIcon } from "lucide-react"

import { Toaster } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"

import { Card, CardGroup } from "./card"
import { CodeBlock } from "./code-block"
import { CodeBlockCommand } from "./code-block-command"
import { ComponentPreview } from "./component-preview"
import { ShadcnInstall } from "./shadcn-install"

export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "my-8 scroll-m-20 text-4xl font-bold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mdx-heading my-6 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mdx-heading my-4 scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "my-4 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "my-4 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "my-3 scroll-m-20 text-base font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  figcaption: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // @ts-ignore
    const hasTitle = props["data-rehype-pretty-code-title"] !== undefined
    return (
      <figcaption
        {...props}
        className={cn(
          hasTitle &&
            "mt-6 rounded-t-xl border-b border-b-zinc-600 bg-zinc-800 px-4 py-2 text-white dark:bg-zinc-800",
          className,
        )}
      />
    )
  },
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "font-medium underline-offset-4 hover:underline focus:underline",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-2 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-2 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("my-1", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "[&>*]:text-foreground/70 [&>*]:dark:text-muted-foreground my-4 flex gap-2 rounded-lg border p-2",
        className,
      )}
      {...props}
    >
      <div className="flex-shrink-0">
        <CircleAlertIcon
          size={20}
          className="fill-blue-500 stroke-zinc-100 dark:stroke-zinc-800"
        />
      </div>
      <div>{props.children}</div>
    </blockquote>
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("even:bg-muted m-0 border-t p-0", className)}
      {...props}
    />
  ),
  th: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: (
    props: React.HTMLAttributes<HTMLPreElement> & {
      __rawString__?: string
      __src__?: string
    } & NpmCommands,
  ) => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      __rawString__,
      __npmCommand__,
      __yarnCommand__,
      __pnpmCommand__,
      __bunCommand__,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      __src__,
      ...rest
    } = props
    const isNpmCommand =
      __npmCommand__ && __yarnCommand__ && __pnpmCommand__ && __bunCommand__

    if (isNpmCommand) {
      return (
        <CodeBlockCommand
          __npmCommand__={__npmCommand__}
          __yarnCommand__={__yarnCommand__}
          __pnpmCommand__={__pnpmCommand__}
          __bunCommand__={__bunCommand__}
        />
      )
    }
    return <CodeBlock {...rest} />
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "rounded-md font-mono",
        // @ts-ignore
        !props["data-theme"] &&
          "text-[0.9em] font-semibold before:content-['`'] after:content-['`']",
        className,
      )}
      {...props}
    />
  ),
  Image: (props: ImageProps) => <Image {...props} alt="blog image" />,
  Step: function Step<As extends React.ElementType>({
    as: As = "div",
    className,
    ...props
  }: React.ComponentProps<As> & { as?: As }) {
    return <As className={cn("step my-6 scroll-m-20", className)} {...props} />
  },
  Steps: ({ ...props }) => (
    <div
      className="steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "bg-card text-card-foreground hover:bg-muted/50 flex w-full flex-col items-center rounded-xl border p-6 shadow transition-colors sm:p-10",
        className,
      )}
      {...props}
    />
  ),
  Card,
  CardGroup,
  ComponentPreview,
  ShadcnInstall,
  Toaster,
  Kbd: ({ ...props }) => {
    // TODO: Change to kbd component when implemented
    return (
      <kbd
        className="bg-interaction-muted-neutral-active border-base-divider-strong inline-flex items-center space-x-0.5 rounded-md border px-1.5 py-0.5 text-center font-sans font-normal"
        {...props}
      />
    )
  },
}
