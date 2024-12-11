const solid = {
  main: "bg-interaction-main-default hover:bg-interaction-main-hover active:bg-interaction-main-active text-base-content-inverse disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
  sub: "bg-interaction-sub-default hover:bg-interaction-sub-hover active:bg-interaction-sub-active text-base-content-inverse disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
  neutral:
    "bg-interaction-neutral-default hover:bg-interaction-neutral-hover active:bg-interaction-neutral-active text-base-content-inverse disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
  critical:
    "bg-interaction-critical-default hover:bg-interaction-critical-hover active:bg-interaction-critical-active text-base-content-inverse disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
  success:
    "bg-interaction-success-default hover:bg-interaction-success-hover active:bg-interaction-success-active text-base-content-inverse disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
  warning:
    "bg-interaction-warning-default hover:bg-interaction-warning-hover active:bg-interaction-warning-active text-base-content-default disabled:bg-interaction-support-disabled disabled:text-interaction-support-disabled-content",
} as const;

const reverse = {
  main: "bg-utility-ui hover:bg-interaction-muted-main-hover active:bg-interaction-muted-main-active text-interaction-main-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui",
  critical:
    "bg-utility-ui hover:bg-interaction-muted-critical-hover active:bg-interaction-muted-critical-active text-interaction-critical-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui",
  sub: "bg-utility-ui hover:bg-interaction-muted-sub-hover active:bg-interaction-muted-sub-active text-interaction-sub-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui",
  neutral:
    "bg-utility-ui hover:bg-interaction-muted-neutral-hover active:bg-interaction-muted-neutral-active text-interaction-neutral-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui",
};

const outline = {
  main: "border border-interaction-main-default active:bg-interaction-tinted-main-active hover:bg-interaction-tinted-main-hover text-interaction-main-default disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
  critical:
    "border border-interaction-critical-default active:bg-interaction-tinted-critical-active hover:bg-interaction-tinted-critical-hover text-interaction-critical-default disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
  neutral:
    "border border-base-content-strong active:bg-interaction-tinted-neutral-active hover:bg-interaction-tinted-neutral-hover text-base-content-strong disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
  sub: "border border-interaction-sub-default active:bg-interaction-tinted-sub-active hover:bg-interaction-tinted-sub-hover text-interaction-sub-default disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
  inverse:
    "border border-base-content-inverse hover:bg-interaction-tinted-inverse-hover active:bg-interaction-tinted-inverse-active text-base-content-inverse disabled:border-interaction-support-disabled-content disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
};

const clear = {
  main: "border border-utility-ui-clear active:bg-interaction-tinted-main-active hover:bg-interaction-tinted-main-hover text-interaction-main-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
  critical:
    "border border-utility-ui-clear active:bg-interaction-tinted-critical-active hover:bg-interaction-tinted-critical-hover text-interaction-critical-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
  neutral:
    "border border-utility-ui-clear active:bg-interaction-tinted-neutral-active hover:bg-interaction-tinted-neutral-hover text-base-content-strong disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
  sub: "border border-utility-ui-clear active:bg-interaction-tinted-sub-active hover:bg-interaction-tinted-sub-hover text-interaction-sub-default disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
  inverse:
    "border border-utility-ui-clear hover:bg-interaction-tinted-inverse-hover active:bg-interaction-tinted-inverse-active text-base-content-inverse disabled:text-interaction-support-disabled-content disabled:bg-utility-ui-clear",
};

export const colorVariants = {
  solid,
  reverse,
  outline,
  clear,
};
