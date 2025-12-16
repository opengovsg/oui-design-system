import type { Meta, StoryObj } from "@storybook/react-vite"
import { Link } from "react-aria-components"

import type { NavbarProps } from "../navbar"
import { Banner } from "../../banner"
import { Button } from "../../button"
import { Navbar } from "../navbar"
import { NavbarBrand } from "../navbar-brand"
import { NavbarContent } from "../navbar-content"
import { NavbarItem } from "../navbar-item"
import { NavbarMenuItem } from "../navbar-menu/item"
import { NavbarMenu } from "../navbar-menu/menu"
import { NavbarMenuToggle } from "../navbar-menu/toggle"

const storyMenuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
]

const Template = (args: NavbarProps) => (
  <div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
    <div className="relative border md:max-w-5xl">
      <Banner>test</Banner>
      <Navbar {...args}>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
          <NavbarMenu>
            {storyMenuItems.map((item, index) => (
              <NavbarMenuItem
                className={({ isActive }) => (isActive ? "font-semibold" : "")}
                isActive={index === 0}
                key={`${item}-${index}`}
              >
                <Link className="w-full" href="#">
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
          <NavbarBrand>
            <p className="font-bold text-inherit">OUI</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">OUI</p>
          </NavbarBrand>
          <NavbarItem>
            <Link href="#">Features</Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link aria-current="page" href="#">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">Integrations</Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="#">Go to app</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex flex-col gap-2 px-6">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          dignissim nisl a vulputate dapibus. Duis at dui facilisis, dapibus
          enim vel, rhoncus diam. Integer id placerat enim, sit amet efficitur
          nulla. Morbi ullamcorper orci nec ligula dictum interdum. Vestibulum
          porttitor sodales elit at tristique. Sed sed erat ut diam tincidunt
          volutpat vel vel turpis. Donec efficitur aliquam magna, a egestas nunc
          fermentum eu. Pellentesque fermentum mollis ligula, nec vestibulum
          orci feugiat venenatis. Etiam aliquam felis rhoncus velit viverra,
          quis posuere libero blandit. Nulla vestibulum a ligula sit amet
          varius.
        </p>
        <p>
          Curabitur dapibus libero elit, venenatis pharetra mauris tempus eu.
          Praesent fringilla risus non est fringilla venenatis. Sed eget est
          blandit, ornare ante non, viverra dolor. Morbi viverra, nunc sit amet
          molestie congue, dui mi auctor ante, cursus vulputate libero diam vel
          neque. Aenean vulputate placerat nisl a tincidunt. Sed feugiat viverra
          nunc, eget varius elit tincidunt quis. Etiam vestibulum, tellus eu
          volutpat vestibulum, eros mi fringilla felis, quis commodo lectus
          turpis vehicula tortor. Sed leo ex, varius in nunc vestibulum, porta
          vestibulum felis. Vestibulum ultrices, mi vitae auctor efficitur, elit
          lorem blandit mauris, vitae facilisis sem dui vel risus.
        </p>
        <p>
          Nulla ut tortor bibendum, auctor ligula eget, molestie leo. In justo
          ex, tincidunt vitae posuere nec, condimentum vitae enim. Pellentesque
          vel nibh eget nibh semper facilisis. Phasellus at fermentum lectus,
          mollis dignissim nibh. Morbi consequat vitae velit et tristique.
          Quisque sit amet imperdiet felis, a mollis nibh. Curabitur posuere,
          sem sit amet ornare dignissim, massa quam consequat enim, non ornare
          velit magna sed dolor. Cras viverra erat eu sapien viverra congue.
        </p>
        <p>
          Duis dapibus molestie porta. Pellentesque sollicitudin lectus nec
          augue hendrerit dapibus. Sed eget purus metus. Suspendisse rhoncus
          enim quis molestie lacinia. Vestibulum mauris elit, finibus et egestas
          nec, rutrum quis tortor. Nam ligula diam, pulvinar ut hendrerit eget,
          scelerisque id odio. Vivamus condimentum lectus augue, eu fermentum
          sem fringilla ac. Interdum et malesuada fames ac ante ipsum primis in
          faucibus.
        </p>
        Nam facilisis ultrices nulla et hendrerit. Praesent urna lectus,
        interdum sit amet gravida molestie, tristique in metus. Etiam nec
        lobortis augue. Suspendisse blandit risus at luctus tempus. Aliquam
        consectetur dolor in nisl aliquam elementum. Nam ut posuere purus, ac
        pharetra mi. Curabitur eu odio non quam molestie dapibus. Cras vel
        convallis sapien. Donec interdum massa eget tincidunt iaculis. Etiam ut
        quam eget arcu tempus dapibus a eu mauris. Donec sodales consectetur
        est, ac venenatis felis ullamcorper ac.
      </div>
      <Button onPress={() => alert("should not be focused")}>A button</Button>
    </div>
  </div>
)

export default {
  title: "Components/Navbar",
  component: Navbar,
  render: Template,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["sticky", "static"],
    },
  },
} as Meta<typeof Navbar>

type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  args: {},
}

export const StaticNavbar: Story = {
  args: {
    position: "static",
  },
}

export const StaticNavbarShowOnScrollUp: Story = {
  args: {
    position: "static",
    shouldShowOnScrollUp: true,
  },
}

export const WithoutBorder: Story = {
  args: {
    hasBorder: false,
  },
}
