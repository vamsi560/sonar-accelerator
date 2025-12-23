import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  args: {
    to: "/about",
    target: "_self",
    children: "About",
    color: "primary",
    size: "medium",
    underline: "hover",
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "inherit",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    underline: {
      control: { type: "select" },
      options: ["none", "hover", "always"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const Secondary: Story = { args: { color: "secondary" } };

export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
export const UnderlineAlways: Story = { args: { underline: "always" } };
export const UnderlineNone: Story = { args: {
  underline: "none",
} };
