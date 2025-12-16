import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CreateContextOptions<T = any, S extends boolean = true> {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: S
  /**
   * Error message to throw if the context is `undefined`
   */
  errorMessage?: string
  /**
   * The display name of the context
   */
  name?: string

  defaultValue?: T
}

export type CreateContextReturn<T, S extends boolean> = S extends true
  ? [React.Context<T>, () => T]
  : [React.Context<T | undefined>, () => T | undefined]

/**
 * Creates a named context, provider, and hook.
 *
 * @param options - create context options
 */
export function createContext<ContextType, S extends boolean = true>(
  options: CreateContextOptions<ContextType, S> = {},
): CreateContextReturn<ContextType, S> {
  const {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name,
    defaultValue,
  } = options

  const Context = createReactContext<ContextType | undefined>(defaultValue)

  Context.displayName = name

  function useContext(): ContextType | undefined {
    const context = useReactContext(Context)

    if (!context && strict) {
      const error = new Error(errorMessage)

      error.name = "ContextError"
      Error.captureStackTrace?.(error, useContext)
      throw error
    }

    return context
  }

  return [Context, useContext] as CreateContextReturn<ContextType, S>
}
