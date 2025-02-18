import { SkipNavLink } from "@opengovsg/oui"

import { Header } from "./components/header"
import { DocsSidebar } from "./components/sidebar"

const SKIP_NAV_ID = "oui-docs-start-content"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink id={SKIP_NAV_ID}>Skip to Content</SkipNavLink>
      <Header />
      <div className="grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] pt-26.25 lg:grid-cols-[var(--container-2xs)_2.5rem_minmax(0,1fr)_2.5rem] lg:pt-14.25 xl:grid-cols-[var(--container-2xs)_2.5rem_minmax(0,1fr)_2.5rem]">
        <div className="relative col-start-1 row-span-full row-start-1 max-lg:hidden">
          <DocsSidebar />
        </div>
        <div className="col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10" />
        <div className="relative row-start-1 grid grid-cols-subgrid lg:col-start-3">
          <div className="hidden" tabIndex={-1} id={SKIP_NAV_ID} />
          {children}
        </div>
      </div>
    </>
  )
}
