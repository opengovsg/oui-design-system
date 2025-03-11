import type { WeakValidationMap } from "prop-types"
import React, { forwardRef as baseForwardRef, useMemo } from "react"

import type {
  As,
  MergeWithAs,
  PropsOf,
  RenderPropsHookOptions,
  RightJoinProps,
} from "./types"

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

type PropsWithoutRef<Props> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Props extends any
    ? "ref" extends keyof Props
      ? Omit<Props, "ref">
      : Props
    : Props

export function forwardRef<
  Component extends As,
  Props extends object,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OmitKeys extends keyof any = never,
>(
  component: React.ForwardRefRenderFunction<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    PropsWithoutRef<
      RightJoinProps<PropsOf<Component>, Props> & {
        as?: As
      }
    >
  >,
): InternalForwardRefRenderFunction<Component, Props, OmitKeys> {
  return baseForwardRef(component) as InternalForwardRefRenderFunction<
    Component,
    Props,
    OmitKeys
  >
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export function forwardRefGeneric<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode,
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  return forwardRef(render)
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

export function useRenderProps<T>(props: RenderPropsHookOptions<T>) {
  const {
    className,
    style,
    children,
    defaultClassName = undefined,
    defaultChildren = undefined,
    defaultStyle,
    values,
  } = props

  return useMemo(() => {
    let computedClassName: string | undefined
    let computedStyle: React.CSSProperties | undefined
    let computedChildren: React.ReactNode | undefined

    if (typeof className === "function") {
      computedClassName = className({ ...values, defaultClassName })
    } else {
      computedClassName = className
    }

    if (typeof style === "function") {
      computedStyle = style({ ...values, defaultStyle: defaultStyle || {} })
    } else {
      computedStyle = style
    }

    if (typeof children === "function") {
      computedChildren = children({ ...values, defaultChildren })
    } else if (children == null) {
      computedChildren = defaultChildren
    } else {
      computedChildren = children
    }

    return {
      className: computedClassName ?? defaultClassName,
      style:
        computedStyle || defaultStyle
          ? { ...defaultStyle, ...computedStyle }
          : undefined,
      children: computedChildren ?? defaultChildren,
      "data-rac": "",
    }
  }, [
    className,
    style,
    children,
    defaultClassName,
    defaultChildren,
    defaultStyle,
    values,
  ])
}

/**
 * Filters out `data-*` attributes to keep them from being passed down and duplicated.
 * @param props
 */
export function removeDataAttributes<T>(props: T): T {
  const prefix = /^(data-.*)$/
  const filteredProps = {} as T

  for (const prop in props) {
    if (!prefix.test(prop)) {
      filteredProps[prop] = props[prop]
    }
  }

  return filteredProps
}

export function pickAriaAttributes<T>(props: T): T {
  const prefix = /^(aria-.*)$/
  const filteredProps = {} as T

  for (const prop in props) {
    if (prefix.test(prop)) {
      filteredProps[prop] = props[prop]
    }
  }

  return filteredProps
}
