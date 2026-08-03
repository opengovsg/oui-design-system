import { Toaster } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"
import { Step, Steps } from "fumadocs-ui/components/steps"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import Link from "next/link"
import type { ComponentProps } from "react"

import { Card, CardGroup } from "./mdx/card"
import { ComponentPreview } from "./mdx/component-preview"
import { ShadcnInstall } from "./mdx/shadcn-install"

/**
 * MDX component map for docs pages.
 *
 * Prose elements (headings with anchors, lists, tables, blockquotes/callouts,
 * code blocks with copy buttons) come from Fumadocs' `defaultMdxComponents`.
 * On top of that we register the OUI-specific docs components — live component
 * previews, the shadcn install widget, and a few small primitives — plus
 * Fumadocs `Tab`/`Tabs` (used by the generated `package-install` blocks).
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    Steps,
    Step,
    Card,
    CardGroup,
    ComponentPreview,
    ShadcnInstall,
    Toaster,
    Link: ({ className, ...props }: ComponentProps<typeof Link>) => (
      <Link
        className={cn("font-medium underline underline-offset-4", className)}
        {...props}
      />
    ),
    Kbd: ({ className, ...props }: ComponentProps<"kbd">) => (
      <kbd
        className={cn(
          "bg-interaction-muted-neutral-active border-base-divider-strong inline-flex items-center space-x-0.5 rounded-md border px-1.5 py-0.5 text-center font-sans font-normal",
          className,
        )}
        {...props}
      />
    ),
    ...components,
  }
}
