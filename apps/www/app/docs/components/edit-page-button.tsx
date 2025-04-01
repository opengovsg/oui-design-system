import Link from "next/link"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { ArrowUpRight } from "lucide-react"

interface Props {
  href: string
}

export const EditPageButton = ({ href }: Props) => {
  return (
    <Link
      href={href}
      className="flex w-fit items-center gap-2 rounded-sm py-4 text-xs"
    >
      <SiGithub className="size-3" />
      <span className="flex flex-row items-center">
        Edit page <ArrowUpRight className="size-4" />
      </span>
    </Link>
  )
}
