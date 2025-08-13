import Link from "next/link"
import { AdobeIcon } from "@/components/icons/brand-icons"
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

const TYPE_TO_LABEL = {
  source: "Source",
  storybook: "Storybook",
  theme: "Theme",
  reactaria: "React Aria",
}

const LinkIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "source":
      return <SiGithub className="size-4 fill-[#181717]" />
    case "storybook":
      return <SiStorybook className="size-4 fill-[#FF4785]" />
    case "theme":
      return <SiGithub className="size-4 fill-[#181717]" />
    case "reactaria":
      return <AdobeIcon className="size-4 fill-[#E1251B]" />
  }
}

export const PageHeader = ({ title, description, links }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p>{description}</p>
      {links && (
        <div className="flex flex-wrap gap-4">
          {Object.entries(links).map(([type, url], i) => (
            <Link
              key={i}
              className="flex items-center gap-1 p-1 text-xs capitalize underline-offset-2 hover:underline"
              href={url}
              target="_blank"
            >
              <LinkIcon type={type} />
              <span>{TYPE_TO_LABEL[type as keyof typeof links]}</span>
              <ArrowUpRight className="-ml-1 size-4" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
