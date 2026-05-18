import { createElement, useMemo } from "react"
import * as runtime from "react/jsx-runtime"
import { LRUCache } from "lru-cache"

import { mdxComponents } from "./components"

const getMdxComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

// This exists so we don't have to call new Function for the given code
// for every request for a given mdx file.
const mdxComponentCache = new LRUCache<
  string,
  ReturnType<typeof getMdxComponent>
>({
  max: 1000,
})

const useMdxComponent = (code: string) => {
  return useMemo(() => {
    if (mdxComponentCache.has(code)) {
      return mdxComponentCache.get(code)!
    }
    const component = getMdxComponent(code)
    mdxComponentCache.set(code, component)
    return component
  }, [code])
}

interface MdxProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export const MdxContentRenderer = ({ code, components }: MdxProps) => {
  const mdxComponent = useMdxComponent(code)
  return createElement(mdxComponent, {
    components: { ...mdxComponents, ...components },
  })
}
