import { Banner } from "@opengovsg/oui"

export default function BannerWithSizes() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Banner size="sm">Banner (sm)</Banner>
      <Banner size="md">Banner (md)</Banner>
    </div>
  )
}
