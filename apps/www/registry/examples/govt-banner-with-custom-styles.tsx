import { GovtBanner } from "@opengovsg/oui"

export default function GovtBannerWithCustomStyles() {
  return (
    <GovtBanner
      classNames={{
        banner: "px-8 lg:px-16",
        mainContentContainer: "mx-auto max-w-5xl",
      }}
    />
  )
}
