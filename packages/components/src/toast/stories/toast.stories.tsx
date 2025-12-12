import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect } from "react"

import { Button } from "../../button"
import { toast, Toaster } from "../toast"

type ToastStoryProps = {
  title: Parameters<typeof toast>[0]
  data?: Parameters<typeof toast>[1]
  buttonText?: string
}

function ToastStory({
  title,
  data,
  buttonText = "Show toast",
}: ToastStoryProps) {
  return (
    <div>
      <Button
        onPress={() => {
          toast(title, data)
        }}
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default {
  title: "Components/Toast",
  component: ToastStory,
  args: {
    title: "This is a toast message",
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        return () => {
          toast.dismiss()
        }
      }, [])

      return (
        <>
          <Toaster />
          <Story />
        </>
      )
    },
  ],
} as Meta<typeof ToastStory>

type Story = StoryObj<typeof ToastStory>

export const Default: Story = {}

export const WithDescription: Story = {
  args: {
    title: "Post updated",
    data: {
      description: "Your post has been successfully updated.",
    },
  },
}

// TODO: Move this into documentation instead
export const Positions: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <ToastStory
            buttonText="Top-left"
            title="Top left toast"
            data={{ position: "top-left" }}
          />
          <ToastStory
            buttonText="Top-center"
            title="Top center toast"
            data={{ position: "top-center" }}
          />
          <ToastStory
            buttonText="Top-right"
            title="Top right toast"
            data={{ position: "top-right" }}
          />
        </div>
        <div className="flex gap-4">
          <ToastStory
            buttonText="Bottom-left"
            title="Bottom left toast"
            data={{ position: "bottom-left" }}
          />
          <ToastStory
            buttonText="Bottom-center"
            title="Bottom center toast"
            data={{ position: "bottom-center" }}
          />
          <ToastStory
            buttonText="Bottom-right"
            title="Bottom right toast"
            data={{ position: "bottom-right" }}
          />
        </div>
      </div>
    )
  },
}

function wait(number: number) {
  return new Promise((resolve) => setTimeout(resolve, number))
}

export const Statuses: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onPress={() => toast.error("The registration failed")}
        >
          Error
        </Button>
        <Button
          variant="outline"
          onPress={() => toast.success("The registration was successful.")}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onPress={() =>
            toast.warning("There was an issue during registration")
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onPress={() => toast.info("Email is already registered.")}
        >
          Info
        </Button>
        <Button
          variant="outline"
          onPress={() => {
            toast.promise(wait(2000), {
              loading: "Deleting database...",
              success: "Database deleted.",
              error: "Failed to delete database.",
            })
          }}
        >
          Promise / Loading
        </Button>
      </div>
    )
  },
}

export const Action: Story = {
  render: () => {
    return (
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          onPress={() =>
            toast("New comment on your post!", {
              action: {
                label: "View",
                onClick: () => alert("Viewed"),
              },
            })
          }
        >
          Action
        </Button>
        <Button
          variant="outline"
          size="sm"
          onPress={() =>
            toast("New comment on your post!", {
              action: {
                label: "View",
                onClick: () => alert("Viewed"),
              },
              cancel: {
                label: "Cancel",
                onClick: () => alert("Cancelled"),
              },
            })
          }
        >
          Do or Not
        </Button>
        <Button
          variant="outline"
          size="sm"
          onPress={() =>
            toast("New comment on your post!", {
              cancel: {
                label: "Cancel",
                onClick: () => alert("Cancelled"),
              },
            })
          }
        >
          Cancel
        </Button>
      </div>
    )
  },
}
