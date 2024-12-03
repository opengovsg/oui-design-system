import { forwardRef } from "@unnamed/system-rsc";
import { UseSpinnerProps, useSpinner } from "./use-spinner";

export interface SpinnerProps extends UseSpinnerProps {}

export const Spinner = forwardRef<"div", SpinnerProps>((props, ref) => {
  const { slots, classNames, getSpinnerProps } = useSpinner(props);

  return (
    <div ref={ref} {...getSpinnerProps()}>
      <div className={slots.wrapper({ class: classNames?.wrapper })}>
        <i className={slots.circle1({ class: classNames?.circle1 })} />
        <i className={slots.circle2({ class: classNames?.circle2 })} />
      </div>
    </div>
  );
});
