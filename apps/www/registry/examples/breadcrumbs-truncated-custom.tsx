"use client"

import { Breadcrumb, Breadcrumbs, Menu, MenuItem } from "@opengovsg/oui"

export default function BreadcrumbsTruncatedCustom() {
  return (
    <Breadcrumbs
      itemsBeforeTruncate={1}
      renderTruncate={(items) => (
        <Menu
          placement="bottom start"
          classNames={{ base: "bg-brand-primary-50 p-2" }}
          items={items}
        >
          {(item) => (
            <MenuItem
              key={item.id}
              {...item}
              classNames={{
                container: "text-brand-primary-700 font-bold",
              }}
            >
              {item.children}
            </MenuItem>
          )}
        </Menu>
      )}
    >
      <Breadcrumb href="#">Home</Breadcrumb>
      <Breadcrumb href="#">Category</Breadcrumb>
      <Breadcrumb href="#">Subcategory A</Breadcrumb>
      <Breadcrumb onPress={() => alert("Subcategory B pressed")}>
        Subcategory B
      </Breadcrumb>
      <Breadcrumb href="#">Subcategory C</Breadcrumb>
      <Breadcrumb>Current Page</Breadcrumb>
    </Breadcrumbs>
  )
}
