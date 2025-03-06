import { useCallback, useMemo, useRef, useState } from "react"
import { cn } from "@opengovsg/oui-theme"
import { useResizeObserver } from "@react-aria/utils"
import { useCombobox, useMultipleSelection } from "downshift"
import { AriaComboBoxProps, Key, useFilter } from "react-aria"
import {
  ComboBoxRenderProps,
  LabelContext,
  ListBox,
  ListBoxItem,
  Popover,
  PopoverContext,
  Provider,
  SlotProps,
  UNSTABLE_ListLayout,
  UNSTABLE_Virtualizer,
} from "react-aria-components"
import { useListData } from "react-stately"

import { Label } from "../field"
import { useControllableState } from "../hooks"

type TagFieldItem = {
  textValue: string
  key: Key
  description?: string
}

export interface TagFieldProps<T extends object>
  extends Omit<
      AriaComboBoxProps<T>,
      | "children"
      | "placeholder"
      | "label"
      | "description"
      | "errorMessage"
      | "validationState"
      | "validationBehavior"
      | "isDisabled"
      | "isInvalid"
      | "isRequired"
      | "selectedKey"
      | "defaultSelectedKey"
    >,
    ComboBoxRenderProps,
    SlotProps {
  /** The filter function used to determine if a option should be included in the combo box list. */
  defaultFilter?: (textValue: string, inputValue: string) => boolean
  /**
   * Whether the text or key of the selected item is submitted as part of an HTML form.
   * When `allowsCustomValue` is `true`, this option does not apply and the text is always submitted.
   * @default 'key'
   */
  formValue?: "text" | "key"
  /** Whether the combo box allows the menu to be open when the collection is empty. */
  allowsEmptyCollection?: boolean

  /**
   * Whether to hide selected items from the dropdown.
   * @defaultValue `true`
   */
  hideSelectedItems?: boolean

  selectedKeys?: Key[]
  defaultSelectedKeys?: Key[]
}

function MultipleComboBox<T extends TagFieldItem>({
  hideSelectedItems = true,
  defaultFilter,
  ...props
}: TagFieldProps<T>) {
  const [inputValue, setInputValue] = useControllableState({
    defaultValue: props.defaultInputValue ?? "",
    value: props.inputValue,
    onChange: props.onInputChange,
  })
  const { contains } = useFilter({ sensitivity: "base" })

  const fieldRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLElement>(null)
  const listBoxRef = useRef<HTMLUListElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)

  // const state = useListState({
  //   items: props.items,
  //   defaultSelectedKeys: props.defaultSelectedKeys,
  //   selectedKeys: props.selectedKeys,
  //   selectionMode: "multiple",
  // })

  const list = useListData<TagFieldItem>({
    initialItems: Array.from(props.items ?? props.defaultItems ?? []),
    initialSelectedKeys: props.defaultSelectedKeys,
    getKey: (item) => item.key,
  })

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems: [...list.selectedKeys],
      onStateChange({ selectedItems: newSelectedItems, type }) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
            list.setSelectedKeys(new Set(newSelectedItems))
            break
          default:
            break
        }
      },
    })

  const filteredItems = useMemo(() => {
    const items = list.items
    const filter = defaultFilter ?? contains
    const { selectedKeys } = list
    if (selectedKeys === "all") return []
    return items.filter((item) => {
      if (hideSelectedItems) {
        return !selectedKeys.has(item.key) && filter(item.textValue, inputValue)
      }
      return filter(item.textValue, inputValue)
    })
  }, [list, defaultFilter, hideSelectedItems, contains, inputValue])

  // Make menu width match input + button
  const [menuWidth, setMenuWidth] = useState<string | null>(null)
  const onResize = useCallback(() => {
    if (fieldRef.current) {
      const fieldRect = fieldRef.current.getBoundingClientRect()
      setMenuWidth(fieldRect.right - fieldRect.left + "px")
    }
  }, [])

  useResizeObserver({
    ref: fieldRef,
    onResize,
  })

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items: filteredItems,
    itemToString(item) {
      return item ? item.textValue : ""
    },
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    inputValue,
    // stateReducer(state, actionAndChanges) {
    //   const { changes, type } = actionAndChanges

    //   switch (type) {
    //     case useCombobox.stateChangeTypes.InputKeyDownEnter:
    //     case useCombobox.stateChangeTypes.ItemClick:
    //       return {
    //         ...changes,
    //         isOpen: true, // keep the menu open after selection.
    //         highlightedIndex: 0, // with the first option highlighted.
    //       }
    //     default:
    //       return changes
    //   }
    // },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            list.setSelectedKeys(
              new Set([...list.selectedKeys, newSelectedItem.key]),
            )
            setInputValue("")
          }
          break

        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue ?? "")

          break
        default:
          break
      }
    },
  })
  const layout = useMemo(() => {
    return new UNSTABLE_ListLayout({
      estimatedRowHeight: 48,
    })
  }, [])

  return (
    <Provider
      values={[
        [LabelContext, { ...getLabelProps({ ref: labelRef }) }],
        [
          PopoverContext,
          {
            ref: popoverRef,
            triggerRef: fieldRef,
            scrollRef: listBoxRef,
            placement: "bottom start",
            isNonModal: true,
            trigger: "TagField",
            style: { "--trigger-width": menuWidth } as React.CSSProperties,
          },
        ],
      ]}
    >
      <div className="w-[592px]">
        <div className="flex flex-col gap-1">
          <Label>hehe</Label>
          <div
            className="inline-flex flex-wrap items-center gap-2 bg-white p-1.5 shadow-sm"
            ref={fieldRef}
          >
            {[...list.selectedKeys].map(
              function renderSelectedItem(selectedItemForRender, index) {
                return (
                  <span
                    className="rounded-md bg-gray-100 px-1 focus:bg-red-400"
                    key={`selected-item-${index}`}
                    {...getSelectedItemProps({
                      selectedItem: selectedItemForRender,
                      index,
                    })}
                  >
                    {selectedItemForRender.toString()}
                    <span
                      className="cursor-pointer px-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeSelectedItem(selectedItemForRender)
                      }}
                    >
                      &#10005;
                    </span>
                  </span>
                )
              },
            )}
            <div className="flex grow gap-0.5">
              <input
                placeholder="Best book ever"
                className="w-full"
                {...getInputProps(
                  getDropdownProps({ preventKeyAction: isOpen }),
                )}
              />
              <button
                aria-label="toggle menu"
                className="px-2"
                type="button"
                {...getToggleButtonProps()}
              >
                &#8595;
              </button>
            </div>
          </div>
        </div>
        {/* <UNSTABLE_Virtualizer layout={layout}> */}
        <Popover isOpen={isOpen} ref={popoverRef}>
          <ul
            className={`w-(--trigger-width) absolute z-10 mt-1 max-h-80 overflow-scroll bg-white p-0 shadow-md ${
              !(isOpen && filteredItems.length) && "hidden"
            }`}
            {...getMenuProps({ ref: listBoxRef }, { suppressRefError: true })}
          >
            {isOpen &&
              filteredItems.map((item, index) => (
                <li
                  className={cn(
                    highlightedIndex === index && "bg-blue-300",
                    selectedItem?.key === item.key && "font-bold",
                    "flex flex-col px-3 py-2 shadow-sm",
                  )}
                  key={item.key}
                  {...getItemProps({ item, index })}
                >
                  <span>{item.textValue}</span>
                  {/* <span className="text-sm text-gray-700">
                  {item.}
                </span> */}
                </li>
              ))}
          </ul>
        </Popover>
        {/* </UNSTABLE_Virtualizer> */}
      </div>
    </Provider>
  )
}

// ;<ul
//   className={`w-inherit absolute z-10 mt-1 max-h-80 overflow-scroll bg-white p-0 shadow-md ${
//     !(isOpen && filteredItems.length) && "hidden"
//   }`}
//   {...getMenuProps()}
// >
//   {isOpen &&
//     filteredItems.map((item, index) => (
//       <li
//         className={cn(
//           highlightedIndex === index && "bg-blue-300",
//           selectedItem?.key === item.key && "font-bold",
//           "flex flex-col px-3 py-2 shadow-sm",
//         )}
//         key={item.key}
//         {...getItemProps({ item, index })}
//       >
//         <span>{item.textValue}</span>
//         {/* <span className="text-sm text-gray-700">
//                   {item.}
//                 </span> */}
//       </li>
//     ))}
// </ul>

export function TagField() {
  const books: TagFieldItem[] = [
    { key: "To Kill a Mockingbird", textValue: "To Kill a Mockingbird" },
    { key: "1984", textValue: "1984" },
    { key: "The Catcher in the Rye", textValue: "The Catcher in the Rye" },
    { key: "The Great Gatsby", textValue: "The Great Gatsby" },
  ]

  // function MultipleComboBox() {
  //   const [inputValue, setInputValue] = useState("")
  //   const [selectedItems, setSelectedItems] = useState(initialSelectedItems)
  //   const { contains } = useFilter({ sensitivity: "base" })
  //   const items = useMemo(
  //     () => books.filter((book) => contains(book.title, inputValue)),
  //     [contains, inputValue],
  //   )
  //   const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
  //     useMultipleSelection({
  //       selectedItems,
  //       onStateChange({ selectedItems: newSelectedItems, type }) {
  //         switch (type) {
  //           case useMultipleSelection.stateChangeTypes
  //             .SelectedItemKeyDownBackspace:
  //           case useMultipleSelection.stateChangeTypes
  //             .SelectedItemKeyDownDelete:
  //           case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
  //           case useMultipleSelection.stateChangeTypes
  //             .FunctionRemoveSelectedItem:
  //             setSelectedItems(newSelectedItems)
  //             break
  //           default:
  //             break
  //         }
  //       },
  //     })
  //   const {
  //     isOpen,
  //     getToggleButtonProps,
  //     getLabelProps,
  //     getMenuProps,
  //     getInputProps,
  //     highlightedIndex,
  //     getItemProps,
  //     selectedItem,
  //   } = useCombobox({
  //     items,
  //     itemToString(item) {
  //       return item ? item.title : ""
  //     },
  //     defaultHighlightedIndex: 0, // after selection, highlight the first item.
  //     selectedItem: null,
  //     inputValue,
  //     stateReducer(state, actionAndChanges) {
  //       const { changes, type } = actionAndChanges

  //       switch (type) {
  //         case useCombobox.stateChangeTypes.InputKeyDownEnter:
  //         case useCombobox.stateChangeTypes.ItemClick:
  //           return {
  //             ...changes,
  //             isOpen: true, // keep the menu open after selection.
  //             highlightedIndex: 0, // with the first option highlighted.
  //           }
  //         default:
  //           return changes
  //       }
  //     },
  //     onStateChange({
  //       inputValue: newInputValue,
  //       type,
  //       selectedItem: newSelectedItem,
  //     }) {
  //       switch (type) {
  //         case useCombobox.stateChangeTypes.InputKeyDownEnter:
  //         case useCombobox.stateChangeTypes.ItemClick:
  //         case useCombobox.stateChangeTypes.InputBlur:
  //           if (newSelectedItem) {
  //             setSelectedItems([...selectedItems, newSelectedItem])
  //             setInputValue("")
  //           }
  //           break

  //         case useCombobox.stateChangeTypes.InputChange:
  //           setInputValue(newInputValue)

  //           break
  //         default:
  //           break
  //       }
  //     },
  //   })

  //   return (
  //     <div className="w-[592px]">
  //       <div className="flex flex-col gap-1">
  //         <label className="w-fit" {...getLabelProps()}>
  //           Pick some books:
  //         </label>
  //         <div className="inline-flex flex-wrap items-center gap-2 bg-white p-1.5 shadow-sm">
  //           {selectedItems.map(
  //             function renderSelectedItem(selectedItemForRender, index) {
  //               return (
  //                 <span
  //                   className="rounded-md bg-gray-100 px-1 focus:bg-red-400"
  //                   key={`selected-item-${index}`}
  //                   {...getSelectedItemProps({
  //                     selectedItem: selectedItemForRender,
  //                     index,
  //                   })}
  //                 >
  //                   {selectedItemForRender.title}
  //                   <span
  //                     className="cursor-pointer px-1"
  //                     onClick={(e) => {
  //                       e.stopPropagation()
  //                       removeSelectedItem(selectedItemForRender)
  //                     }}
  //                   >
  //                     &#10005;
  //                   </span>
  //                 </span>
  //               )
  //             },
  //           )}
  //           <div className="flex grow gap-0.5">
  //             <input
  //               placeholder="Best book ever"
  //               className="w-full"
  //               {...getInputProps(
  //                 getDropdownProps({ preventKeyAction: isOpen }),
  //               )}
  //             />
  //             <button
  //               aria-label="toggle menu"
  //               className="px-2"
  //               type="button"
  //               {...getToggleButtonProps()}
  //             >
  //               &#8595;
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //       <ul
  //         className={`w-inherit absolute z-10 mt-1 max-h-80 overflow-scroll bg-white p-0 shadow-md ${
  //           !(isOpen && items.length) && "hidden"
  //         }`}
  //         {...getMenuProps()}
  //       >
  //         {isOpen &&
  //           items.map((item, index) => (
  //             <li
  //               className={cn(
  //                 highlightedIndex === index && "bg-blue-300",
  //                 selectedItem === item && "font-bold",
  //                 "flex flex-col px-3 py-2 shadow-sm",
  //               )}
  //               key={`${item.value}${index}`}
  //               {...getItemProps({ item, index })}
  //             >
  //               <span>{item.title}</span>
  //               <span className="text-sm text-gray-700">{item.author}</span>
  //             </li>
  //           ))}
  //       </ul>
  //     </div>
  //   )
  // }
  return (
    <MultipleComboBox
      items={[...Array(3000)].map((_, i) => ({
        key: String(i),
        textValue: `Item ${i}`,
      }))}
    />
  )
}
