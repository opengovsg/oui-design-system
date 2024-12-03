import { Meta } from "@storybook/react";
import { Spinner } from "../spinner";
import { spinnerStyles } from "@unnamed/theme";

export default {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["current", "white"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
  },
  decorators: [
    (Story) => (
      <div className="ml-4">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Spinner>;

const defaultProps = {
  ...spinnerStyles.defaultVariants,
};

export const Default = {
  args: {
    ...defaultProps,
  },
};
