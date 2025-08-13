"use client"

import { useCallback } from "react"
import { useLocale } from "@react-aria/i18n"
import { ChevronLeftIcon, ChevronsRightIcon, EllipsisIcon } from "lucide-react"

import { cn, dataAttr } from "@opengovsg/oui-theme"

import type { PaginationItemValue } from "./hooks/use-pagination"
import type { UsePaginationProps } from "./use-pagination"
import { forwardRef } from "../system/utils"
import { PaginationItemType } from "./hooks/use-pagination"
import { PaginationCursor } from "./pagination-cursor"
import { PaginationItem } from "./pagination-item"
import { usePagination } from "./use-pagination"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationProps extends UsePaginationProps {}

export const Pagination = forwardRef<"nav", PaginationProps>((props, ref) => {
  const {
    Component,
    dotsJump,
    slots,
    classNames,
    total,
    range,
    loop,
    activePage,
    disableCursorAnimation,
    disableAnimation,
    renderItem: renderItemProp,
    onNext,
    onPrevious,
    setPage,
    getItemAriaLabel,
    getItemRef,
    getBaseProps,
    getWrapperProps,
    getItemProps,
    getCursorProps,
  } = usePagination({ ...props, ref })

  const { direction } = useLocale()

  const isRTL = direction === "rtl"

  const renderChevronIcon = useCallback(
    (key: PaginationItemType) => {
      if (
        (key === PaginationItemType.PREV && !isRTL) ||
        (key === PaginationItemType.NEXT && isRTL)
      ) {
        return <ChevronLeftIcon />
      }

      return (
        <ChevronLeftIcon
          className={slots.chevronNext({
            class: classNames?.chevronNext,
          })}
        />
      )
    },
    [isRTL, slots, classNames?.chevronNext],
  )

  const renderPrevItem = useCallback(() => {
    return (
      <PaginationItem
        key={PaginationItemType.PREV}
        className={slots.prev({
          class: classNames?.prev,
        })}
        data-slot="prev"
        getAriaLabel={getItemAriaLabel}
        isDisabled={props.isDisabled || (!loop && activePage === 1)}
        value={PaginationItemType.PREV}
        onPress={onPrevious}
      >
        {renderChevronIcon(PaginationItemType.PREV)}
      </PaginationItem>
    )
  }, [
    slots,
    classNames?.prev,
    getItemAriaLabel,
    props.isDisabled,
    loop,
    activePage,
    onPrevious,
    renderChevronIcon,
  ])

  const renderNextItem = useCallback(() => {
    return (
      <PaginationItem
        key={PaginationItemType.NEXT}
        className={slots.next({
          class: cn(classNames?.next),
        })}
        data-slot="next"
        getAriaLabel={getItemAriaLabel}
        isDisabled={props.isDisabled || (!loop && activePage === total)}
        value={PaginationItemType.NEXT}
        onPress={onNext}
      >
        {renderChevronIcon(PaginationItemType.NEXT)}
      </PaginationItem>
    )
  }, [
    slots,
    classNames?.next,
    getItemAriaLabel,
    props.isDisabled,
    loop,
    activePage,
    total,
    onNext,
    renderChevronIcon,
  ])

  const renderItem = useCallback(
    (value: PaginationItemValue, index: number) => {
      const isBefore = index < range.indexOf(activePage)

      if (renderItemProp && typeof renderItemProp === "function") {
        let page = typeof value == "number" ? value : index

        if (value === PaginationItemType.NEXT) {
          page = activePage + 1
        }

        if (value === PaginationItemType.PREV) {
          page = activePage - 1
        }

        if (value === PaginationItemType.DOTS) {
          page = isBefore
            ? activePage - dotsJump >= 1
              ? activePage - dotsJump
              : 1
            : activePage + dotsJump <= total
              ? activePage + dotsJump
              : total
        }

        const itemChildren: Record<PaginationItemType, React.ReactNode> = {
          [PaginationItemType.PREV]: renderChevronIcon(PaginationItemType.PREV),
          [PaginationItemType.NEXT]: renderChevronIcon(PaginationItemType.NEXT),
          [PaginationItemType.DOTS]: (
            <>
              <EllipsisIcon
                className={slots?.ellipsis({ class: classNames?.ellipsis })}
              />
              <ChevronsRightIcon
                className={slots?.forwardIcon({
                  class: classNames?.forwardIcon,
                })}
                data-before={dataAttr(isBefore)}
              />
            </>
          ),
        }

        return renderItemProp({
          value,
          index,
          key: `${value}-${index}`,
          page,
          total,
          children: typeof value === "number" ? value : itemChildren[value],
          activePage,
          dotsJump,
          isBefore,
          isActive: value === activePage,
          isPrevious: value === activePage - 1,
          isNext: value === activePage + 1,
          isFirst: value === 1,
          isLast: value === total,
          onNext,
          onPrevious,
          setPage,
          onPress: () => setPage(page),
          ref:
            typeof value === "number"
              ? (node) => getItemRef(node, value)
              : undefined,
          className: slots.item({ class: classNames?.item }),
          getAriaLabel: getItemAriaLabel,
        })
      }

      if (value === PaginationItemType.PREV) {
        return renderPrevItem()
      }
      if (value === PaginationItemType.NEXT) {
        return renderNextItem()
      }

      if (value === PaginationItemType.DOTS) {
        return (
          <PaginationItem
            key={PaginationItemType.DOTS + isBefore}
            className={slots.item({
              class: cn(classNames?.item, "group"),
            })}
            isDisabled={props.isDisabled}
            data-slot="item"
            getAriaLabel={getItemAriaLabel}
            value={value}
            onPress={() =>
              isBefore
                ? setPage(
                    activePage - dotsJump >= 1 ? activePage - dotsJump : 1,
                  )
                : setPage(
                    activePage + dotsJump <= total
                      ? activePage + dotsJump
                      : total,
                  )
            }
          >
            <EllipsisIcon
              className={slots?.ellipsis({ class: classNames?.ellipsis })}
            />
            <ChevronsRightIcon
              className={slots?.forwardIcon({ class: classNames?.forwardIcon })}
              data-before={dataAttr(isRTL ? !isBefore : isBefore)}
            />
          </PaginationItem>
        )
      }

      return (
        <PaginationItem
          {...getItemProps({ value })}
          key={value}
          getAriaLabel={getItemAriaLabel}
        >
          {value}
        </PaginationItem>
      )
    },
    [
      range,
      activePage,
      renderItemProp,
      getItemProps,
      getItemAriaLabel,
      renderChevronIcon,
      slots,
      classNames?.ellipsis,
      classNames?.forwardIcon,
      classNames?.item,
      total,
      dotsJump,
      onNext,
      onPrevious,
      setPage,
      getItemRef,
      renderPrevItem,
      renderNextItem,
      props.isDisabled,
      isRTL,
    ],
  )

  if (props.isCompact) {
    return (
      <Component {...getBaseProps()}>
        <ul {...getWrapperProps()}>
          {renderPrevItem()}
          <li className={slots.item({ class: classNames?.item })}>
            Page {activePage} of {total}
          </li>
          {renderNextItem()}
        </ul>
      </Component>
    )
  }

  return (
    <Component {...getBaseProps()}>
      <ul {...getWrapperProps()}>
        {!disableCursorAnimation && !disableAnimation && (
          <PaginationCursor {...getCursorProps()} />
        )}
        {range.map(renderItem)}
      </ul>
    </Component>
  )
})
