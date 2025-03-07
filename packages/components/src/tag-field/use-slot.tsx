/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
  RefCallback,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

export function useSlot<T>(
  initialState: boolean | (() => boolean) = true,
): [RefCallback<T>, boolean] {
  // Initial state is typically based on the parent having an aria-label or aria-labelledby.
  // If it does, this value should be false so that we don't update the state and cause a rerender when we go through the layoutEffect
  const [hasSlot, setHasSlot] = useState(initialState)
  const hasRun = useRef(false)

  // A callback ref which will run when the slotted element mounts.
  // This should happen before the useLayoutEffect below.
  const ref = useCallback((el: T) => {
    hasRun.current = true
    setHasSlot(!!el)
  }, [])

  // If the callback hasn't been called, then reset to false.
  useLayoutEffect(() => {
    if (!hasRun.current) {
      setHasSlot(false)
    }
  }, [])

  return [ref, hasSlot]
}
