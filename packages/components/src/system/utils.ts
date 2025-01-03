import type { WeakValidationMap } from "prop-types"
import { forwardRef as baseForwardRef } from "react"

import type { As, MergeWithAs, PropsOf, RightJoinProps } from "./types"

export interface InternalForwardRefRenderFunction<
  Component extends As,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Props extends object = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OmitKeys extends keyof any = never,
> {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentPropsWithoutRef<Component>,
      Omit<React.ComponentPropsWithoutRef<AsComponent>, OmitKeys>,
      Props,
      AsComponent
    >,
  ): React.ReactElement | null
  readonly $$typeof: symbol
  defaultProps?: Partial<Props> | undefined

  propTypes?: WeakValidationMap<Props> | undefined
  displayName?: string | undefined
}

export function forwardRef<
  Component extends As,
  Props extends object,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OmitKeys extends keyof any = never,
>(
  component: React.ForwardRefRenderFunction<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As
    }
  >,
): InternalForwardRefRenderFunction<Component, Props, OmitKeys> {
  return baseForwardRef(component) as InternalForwardRefRenderFunction<
    Component,
    Props,
    OmitKeys
  >
}

export const mapPropsVariants = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
  K extends keyof T,
>(
  props: T,
  variantKeys?: K[],
  removeVariantProps = true,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
): readonly [Omit<T, K> | T, Pick<T, K> | {}] => {
  if (!variantKeys) {
    return [props, {}]
  }

  const picked = variantKeys.reduce((acc, key) => {
    // Only include the key in `picked` if it exists in `props`
    if (key in props) {
      return { ...acc, [key]: props[key] }
    }
    return acc
  }, {})

  if (removeVariantProps) {
    const omitted = Object.keys(props)
      .filter((key) => !variantKeys.includes(key as K))
      .reduce((acc, key) => ({ ...acc, [key]: props[key as keyof T] }), {})

    return [omitted, picked] as [Omit<T, K>, Pick<T, K>]
  }
  return [props, picked] as [T, Pick<T, K>]
}
