// apps/www/scripts/registry/descriptions.ts

/**
 * Hand-maintained description text for components that need consumer-side
 * setup notes beyond "import and use." Most components don't need entries here.
 */
export const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  toast:
    "Toast notifications. Mount the <Toaster /> component at your app root once; then call toast(...) from anywhere to dispatch notifications.",
  modal:
    "Modal dialog. Renders into a portal at the document root; no provider setup required, but ensure your global styles do not override fixed-position elements.",
  popover:
    "Popover. Renders into a portal at the document root. Position is automatically managed by react-aria-components.",
  tooltip:
    "Tooltip. Renders into a portal at the document root. For keyboard-triggered tooltips, ensure the trigger is focusable.",
}
