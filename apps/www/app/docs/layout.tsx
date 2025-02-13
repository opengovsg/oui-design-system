import { SkipNavLink } from "@opengovsg/oui"

const SKIP_NAV_ID = "oui-docs-start-content"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink id={SKIP_NAV_ID}>Skip to Content</SkipNavLink>
      <main>
        <div className="container mx-auto">
          <div tabIndex={-1} id={SKIP_NAV_ID} />
          {children}
        </div>
      </main>
    </>
  )
}
