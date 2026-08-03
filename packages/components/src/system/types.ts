import type {
  AriaLabelingProps,
  DOMProps as SharedDOMProps,
} from "@react-types/shared"
import type * as CSS from "csstype"
import type { JSX, ReactNode } from "react"

/**
 * Explicit re-export to fix error:
 * The inferred type of useRenderProps cannot be named without a reference to .pnpm/csstype@3.1.3/node_modules/csstype . This is likely not portable. A type annotation is necessary.
 */

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CSSProperties extends CSS.Properties<string | number> {
  /**
   * The index signature was removed to enable closed typing for style
   * using CSSType. You're able to use type assertion or module augmentation
   * to add properties or an index signature of your own.
   *
   * For examples and more information, visit:
   * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
   */
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type As<Props = any> = React.ElementType<Props>

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As
}

export type Merge<M, N> =
  N extends Record<string, unknown> ? M : Omit<M, keyof N> & N

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  AdditionalProps extends object = {},
  AsComponent extends As = As,
> = (
  | RightJoinProps<ComponentProps, AdditionalProps>
  | RightJoinProps<AsProps, AdditionalProps>
) & {
  as?: AsComponent
}

export type OmitCommonProps<
  Target,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OmitAdditionalProps extends keyof any = never,
> = Omit<Target, "transition" | "as" | "color" | OmitAdditionalProps>

export type RightJoinProps<
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  SourceProps extends object = {},
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  OverrideProps extends object = {},
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps

/**
 * Type that omits default React HTML props that conflicts with RAC and theming UI props.
 */
export type HtmlUiProps<
  T extends As = "div",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OmitKeys extends keyof any = never,
> = Omit<
  PropsOf<T>,
  | "ref"
  | "color"
  | "slot"
  | "size"
  | "defaultChecked"
  | "defaultValue"
  | OmitKeys
> & {
  as?: As
}

export type DOMElements = keyof JSX.IntrinsicElements

export interface DOMElement extends Element, HTMLOrSVGElement {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataAttributes = Record<string, any>

export type DOMAttributes<T = DOMElement> = React.AriaAttributes &
  React.DOMAttributes<T> &
  DataAttributes & {
    id?: string
    role?: React.AriaRole
    tabIndex?: number
    style?: React.CSSProperties
  }

export type PropGetter<P = Record<string, unknown>, R = DOMAttributes> = (
  props?: Merge<DOMAttributes, P>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: React.Ref<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => R & React.RefAttributes<any>

export interface StyleRenderProps<T> {
  /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. */
  className?:
    | string
    | ((values: T & { defaultClassName: string | undefined }) => string)
  /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. */
  style?:
    | CSSProperties
    | ((
        values: T & { defaultStyle: CSSProperties },
      ) => CSSProperties | undefined)
}

export interface RenderProps<T> extends StyleRenderProps<T> {
  /** The children of the component. A function may be provided to alter the children based on component state. */
  children?:
    | ReactNode
    | ((values: T & { defaultChildren: ReactNode | undefined }) => ReactNode)
}

export interface RenderPropsHookOptions<T>
  extends RenderProps<T>, SharedDOMProps, AriaLabelingProps {
  values: T
  defaultChildren?: ReactNode
  defaultClassName?: string
  defaultStyle?: CSSProperties
}
