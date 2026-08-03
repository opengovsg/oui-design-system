import { useResizeObserver } from "@react-aria/utils"
import type { RefObject } from "react"
import { useCallback, useState } from "react"

/**
 * Extracted from Select.tsx in react-aria-components. Used as a workaround for https://github.com/adobe/react-spectrum/issues/9451
 *
 * @see https://github.com/adobe/react-spectrum/blob/245a7031367d5f1d1264071b5dd84cc7b367513e/packages/react-aria-components/src/Select.tsx#L166-L176
 */
export function useElementWidth(ref: RefObject<Element | null> | undefined) {
  const [elementWidth, setElementWidth] = useState<string | null>(null)

  const onResize = useCallback(() => {
    if (ref && ref.current && ref.current instanceof HTMLElement) {
      setElementWidth(`${ref.current.offsetWidth}px`)
    }
  }, [ref])

  useResizeObserver({
    ref,
    onResize,
  })

  return elementWidth
}
