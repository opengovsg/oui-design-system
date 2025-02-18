import { cn, composeTailwindRenderProps } from "@opengovsg/oui-theme"
import { CircleAlert } from "lucide-react"
import {
  FieldError as AriaFieldError,
  Label as AriaLabel,
  FieldErrorProps,
  LabelProps,
  Text,
  TextProps,
} from "react-aria-components"

export function Label(props: LabelProps) {
  return (
    <AriaLabel
      {...props}
      className={cn(
        "prose-subhead-1 text-base-content-strong w-fit cursor-default",
        props.className,
      )}
    />
  )
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={cn("prose-body-2 text-base-content-medium", props.className)}
    />
  )
}

export function FieldError({ children, className, ...props }: FieldErrorProps) {
  return (
    <AriaFieldError
      {...props}
      className={composeTailwindRenderProps(
        className,
        "prose-body-2 text-utility-feedback-critical flex flex-row flex-wrap items-center gap-2",
      )}
    >
      <>
        <CircleAlert className="h-4 w-4" />
        {children}
      </>
    </AriaFieldError>
  )
}
