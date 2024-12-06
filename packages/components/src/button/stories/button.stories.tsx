import type { Meta, StoryObj } from "@storybook/react";
import { buttonStyles } from "@unnamed/theme";
import { AlertTriangle, HeadphonesIcon, User2Icon } from "lucide-react";
import { useState } from "react";
import type { ButtonProps } from "../button";
import { Button } from "../button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: [
        "solid",
        "bordered",
        "light",
        "flat",
        "faded",
        "shadow",
        "ghost",
      ],
    },
    color: {
      control: {
        type: "select",
      },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    spinnerPlacement: {
      control: {
        type: "select",
      },
      options: ["start", "end"],
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    isLoading: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    children: "Button",
    spinnerPlacement: "start",
    ...buttonStyles.defaultVariants,
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

function StateTemplate(args: ButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    // eslint-disable-next-line no-console -- storybook explicit log
    console.log("Pressed");
    setIsOpen((prev) => !prev);
  };

  return (
    <Button
      {...args}
      aria-label="Open"
      aria-pressed={isOpen}
      onPress={handlePress}
    >
      {isOpen ? "Close" : "Open"}
    </Button>
  );
}

export const Default: Story = {};

export const WithState: Story = {
  render: StateTemplate,
  args: {},
};

export const IsDisabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const DisableRipple: Story = {
  args: {
    disableRipple: true,
  },
};

export const WithIcons: Story = {
  args: {
    startContent: <AlertTriangle />,
    endContent: <User2Icon />,
  },
};

export const IconButton: Story = {
  args: {
    isIconOnly: true,
    children: <HeadphonesIcon className="w-5 h-5" />,
  },
};

export const IsPending: Story = {
  args: {
    isPending: true,
  },
};

export const CustomWithClassNames: Story = {
  args: {
    radius: "full",
    className:
      "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
  },
};
