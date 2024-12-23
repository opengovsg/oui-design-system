import type { ClassValue } from "tailwind-variants"

import { twMerge } from "./tw-merge"

/**
 * A helper function that accepts a user-provided render prop value (either a static value or a function),
 * and combines it with another value to create a final result.
 * Retrieved from react-aria-components without importing rac into this package.
 */
export function composeRenderProps<T, U, V extends T>(
  // https://stackoverflow.com/questions/60898079/typescript-type-t-or-function-t-usage
  value: T extends unknown ? T | ((renderProps: U) => V) : never,
  wrap: (prevValue: T, renderProps: U) => V,
): (renderProps: U) => V {
  return (renderProps) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    wrap(typeof value === "function" ? value(renderProps) : value, renderProps)
}

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | ClassValue | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (nextClassName) =>
    twMerge(tw, nextClassName),
  )
}
