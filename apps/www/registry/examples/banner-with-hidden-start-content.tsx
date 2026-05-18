import { Banner } from "@opengovsg/oui"

export default function BannerWithHiddenStartContent() {
  return (
    <Banner variant="error" startContent={null}>
      This banner has no icon
    </Banner>
  )
}
