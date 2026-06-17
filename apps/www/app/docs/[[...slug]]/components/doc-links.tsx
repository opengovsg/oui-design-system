import type { ResolvedDocLinks } from "@/lib/doc-links"
import Link from "next/link"
import { AdobeIcon } from "@/components/icons/brand-icons"
import { SiGithub, SiStorybook } from "@icons-pack/react-simple-icons"
import { ArrowUpRight, Package } from "lucide-react"

const TYPE_TO_LABEL: Record<string, string> = {
  source: "Source",
  storybook: "Storybook",
  theme: "Theme",
  reactaria: "React Aria",
}

const LinkIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "source":
    case "theme":
      return <SiGithub className="size-4 fill-[#181717]" />
    case "storybook":
      return <SiStorybook className="size-4 fill-[#FF4785]" />
    case "reactaria":
      return <AdobeIcon className="size-4 fill-[#E1251B]" />
    default:
      return <Package className="size-4" />
  }
}

/**
 * Row of external reference links (Source / Storybook / Theme / React Aria)
 * shown under the page title. Replaces the links portion of the old
 * PageHeader.
 */
export function DocLinks({ links }: { links: ResolvedDocLinks }) {
  const entries = Object.entries(links).filter(([, url]) => Boolean(url)) as [
    string,
    string,
  ][]
  if (entries.length === 0) return null

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {entries.map(([type, url]) => (
        <Link
          key={type}
          className="flex items-center gap-1 p-1 text-xs underline-offset-2 hover:underline"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkIcon type={type} />
          <span>{TYPE_TO_LABEL[type] ?? type}</span>
          <ArrowUpRight className="-ml-1 size-4" />
        </Link>
      ))}
    </div>
  )
}
