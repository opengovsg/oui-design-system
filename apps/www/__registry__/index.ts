import React from "react"

type RegistryComponent = {
  name: string
  description: string
  type: string
  files?: {
    path: string
  }[]
  component: React.LazyExoticComponent<React.ComponentType<any>>
}

export const Index: Record<string, RegistryComponent> = {
  "button-demo": {
    name: "button-demo",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/button-demo.tsx",
      },
    ],
    component: React.lazy(() => import("@/registry/examples/button-demo.tsx")),
  },
}
