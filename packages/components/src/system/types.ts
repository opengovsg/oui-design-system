// eslint-disable-next-line @typescript-eslint/no-explicit-any -- explicit any type
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
  // eslint-disable-next-line @typescript-eslint/ban-types -- explicit object type
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- explicit any type
  OmitAdditionalProps extends keyof any = never,
> = Omit<Target, "transition" | "as" | "color" | OmitAdditionalProps>

export type RightJoinProps<
  // eslint-disable-next-line @typescript-eslint/ban-types -- explicit object type
  SourceProps extends object = {},
  // eslint-disable-next-line @typescript-eslint/ban-types -- explicit object type
  OverrideProps extends object = {},
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps

/**
 * Type that omits default React HTML props that conflicts with RAC and theming UI props.
 */
export type HtmlUiProps<
  T extends As = "div",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- explicit any type
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- explicit any type
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- explicit any type
  ref?: React.Ref<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- explicit any type
) => R & React.RefAttributes<any>
