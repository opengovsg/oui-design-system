import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react"

export interface CreateContextOptions<T = any> {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean
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

export type CreateContextReturn<T> = [React.Context<T>, () => T]

/**
 * Creates a named context, provider, and hook.
 *
 * @param options - create context options
 */
export function createContext<ContextType>(
  options: CreateContextOptions<ContextType> = {},
): CreateContextReturn<ContextType> {
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

  return [Context, useContext] as CreateContextReturn<ContextType>
}
