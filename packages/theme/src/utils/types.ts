/**
 * This Typescript utility transform a list of slots into a list of `{slot: classes}`
 */
export type SlotsToClasses<S extends string> = {
  [key in S]?: string
}

export type ClassNameOrFunction<T> = string | ((values: T) => string)

export type SlotsToClassesWithRenderProps<S extends string, T> = {
  [key in S]?: ClassNameOrFunction<T>
}
