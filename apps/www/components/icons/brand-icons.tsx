import { SVGProps } from "react"

export const AdobeIcon = ({
  width = "1em",
  height = "1em",
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      aria-label="Adobe"
      fill="currentColor"
      focusable="false"
      height={height}
      viewBox="0 0 30 26"
      width={width}
      {...props}
    >
      <polygon points="19,0 30,0 30,26" />
      <polygon points="11.1,0 0,0 0,26" />
      <polygon points="15,9.6 22.1,26 17.5,26 15.4,20.8 10.2,20.8" />
    </svg>
  )
}
