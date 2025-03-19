import Link from "next/link"
import { MdxContentRenderer } from "@/components/mdx/content-renderer"
import { SiGithub, SiStorybook } from "@icons-pack/react-simple-icons"
import { ArrowUpRight } from "lucide-react"

interface PageHeaderProps {
  title: string
  description: string
  links?: {
    source?: string
    storybook?: string
    theme?: string
  }
}

const LinkIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "source":
      return <SiGithub className="fill=[#181717] size-4" />
    case "storybook":
      return <SiStorybook className="size-4 fill-[#FF4785]" />
    case "theme":
      return <SiGithub className="fill=[#181717] size-4" />
  }
}

export const PageHeader = ({ title, description, links }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <MdxContentRenderer code={description} />
      {links && (
        <div className="flex flex-wrap gap-4">
          {Object.entries(links).map(([title, url], i) => (
            <Link
              key={i}
              className="flex items-center gap-1 p-1 text-xs capitalize underline-offset-2 hover:underline"
              href={url}
              target="_blank"
            >
              <LinkIcon type={title} />
              <span>{title}</span>
              <ArrowUpRight className="-ml-1 size-4" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
