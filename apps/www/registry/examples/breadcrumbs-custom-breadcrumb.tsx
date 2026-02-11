"use client"

import {
  Breadcrumb,
  Breadcrumbs,
  Link,
  Menu,
  MenuItem,
  MenuTrigger,
} from "@opengovsg/oui"

export default function BreadcrumbsCustomBreadcrumb() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="#">Home</Breadcrumb>
      <Breadcrumb href="#">Category</Breadcrumb>
      <Breadcrumb>
        <MenuTrigger>
          <Link>Subcategory</Link>
          <Menu>
            <MenuItem id="option-1" href="#">
              Option 1
            </MenuItem>
            <MenuItem id="option-2" href="#">
              Option 2
            </MenuItem>
            <MenuItem id="option-3" href="#">
              Option 3
            </MenuItem>
          </Menu>
        </MenuTrigger>
      </Breadcrumb>
      <Breadcrumb>Current Page</Breadcrumb>
    </Breadcrumbs>
  )
}
