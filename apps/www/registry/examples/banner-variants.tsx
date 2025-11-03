import { Banner } from "@opengovsg/oui"

export default function BannerVariants() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Banner variant="info">Banner (info)</Banner>
      <Banner variant="warning">Banner (warning)</Banner>
      <Banner variant="error">Banner (error)</Banner>
      <Banner variant="unstyled">Banner (unstyled)</Banner>
    </div>
  )
}
