import { createContext } from "react"
import { UseComboboxPropGetters } from "downshift"
import { ContextValue, SlotProps, useContextProps } from "react-aria-components"

import { forwardRef } from "../system/utils"

export type TagFieldTriggerProps = SlotProps

export interface TagFieldTriggerContextValue<T extends object>
  extends TagFieldTriggerProps,
    ReturnType<UseComboboxPropGetters<T>["getToggleButtonProps"]> {}

export const TagFieldTriggerContext = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContextValue<TagFieldTriggerContextValue<any>, HTMLButtonElement>
>({})

export const TagFieldTrigger = forwardRef<"button", TagFieldTriggerProps>(
  (props, ref) => {
    ;[props, ref] = useContextProps(props, ref, TagFieldTriggerContext)

    return (
      <button
        aria-label="toggle menu"
        type="button"
        {...props}
        slot={props.slot || undefined}
        ref={ref}
      />
    )
  },
)
