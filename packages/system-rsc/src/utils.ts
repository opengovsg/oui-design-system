import { forwardRef as baseForwardRef } from "react";
import type { WeakValidationMap } from "prop-types";
import { As, MergeWithAs, PropsOf, RightJoinProps } from "./types";

export type InternalForwardRefRenderFunction<
  Component extends As,
  Props extends object = {},
  OmitKeys extends keyof any = never,
> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentPropsWithoutRef<Component>,
      Omit<React.ComponentPropsWithoutRef<AsComponent>, OmitKeys>,
      Props,
      AsComponent
    >
  ): React.ReactElement | null;
  readonly $$typeof: symbol;
  defaultProps?: Partial<Props> | undefined;
  propTypes?: WeakValidationMap<Props> | undefined;
  displayName?: string | undefined;
};

export function forwardRef<
  Component extends As,
  Props extends object,
  OmitKeys extends keyof any = never,
>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >
) {
  return baseForwardRef(component) as InternalForwardRefRenderFunction<
    Component,
    Props,
    OmitKeys
  >;
}

export const mapPropsVariants = <
  T extends Record<string, any>,
  K extends keyof T,
>(
  props: T,
  variantKeys?: K[],
  removeVariantProps = true
): readonly [Omit<T, K> | T, Pick<T, K> | {}] => {
  if (!variantKeys) {
    return [props, {}];
  }

  const picked = variantKeys.reduce((acc, key) => {
    // Only include the key in `picked` if it exists in `props`
    if (key in props) {
      return { ...acc, [key]: props[key] };
    } else {
      return acc;
    }
  }, {});

  if (removeVariantProps) {
    const omitted = Object.keys(props)
      .filter((key) => !variantKeys.includes(key as K))
      .reduce((acc, key) => ({ ...acc, [key]: props[key as keyof T] }), {});

    return [omitted, picked] as [Omit<T, K>, Pick<T, K>];
  } else {
    return [props, picked] as [T, Pick<T, K>];
  }
};
