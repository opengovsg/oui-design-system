import { Meta } from "@storybook/react";
import { Button, ButtonProps } from "../button";
import { buttonStyles } from "@unnamed/theme";
import { useState } from "react";

import { AlertTriangle, User2Icon } from "lucide-react";

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
} as Meta<typeof Button>;

const defaultProps = {
  children: "Button",
  spinnerPlacement: "start",
  ...buttonStyles.defaultVariants,
};

const StateTemplate = (args: ButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    // eslint-disable-next-line no-console
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
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const WithState = {
  render: StateTemplate,

  args: {
    ...defaultProps,
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DisableRipple = {
  args: {
    ...defaultProps,
    disableRipple: true,
  },
};

export const WithIcons = {
  args: {
    ...defaultProps,
    startContent: <AlertTriangle className="fill-current" />,
    endContent: <User2Icon className="fill-current" />,
  },
};

export const IconButton = {
  args: {
    ...defaultProps,
    isIconOnly: true,
    // children: <HeadphonesIcon className="w-5 h-5" />,
  },
};

export const IsLoading = {
  args: {
    ...defaultProps,
    color: "primary",
    isLoading: true,
  },
};

export const CustomWithClassNames = {
  args: {
    ...defaultProps,
    radius: "full",
    className:
      "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
  },
};
