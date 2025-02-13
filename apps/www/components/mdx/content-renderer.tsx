"use client"

import * as runtime from "react/jsx-runtime"

import { mdxComponents } from "./components"

const useMdxComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MdxProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export const MdxContentRenderer = ({ code, components }: MdxProps) => {
  const Component = useMdxComponent(code)
  return <Component components={{ ...mdxComponents, ...components }} />
}
