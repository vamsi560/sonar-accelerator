import type { Meta, StoryObj } from "@storybook/react";
import Accordion from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Common/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    title: { control: "text" },
    children: { control: "text" },
    expanded: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: "Accordion Summary",
    children: "Accordion details go here. You can put any content inside.",
    expanded: false,
  },
};

export const Expanded: Story = {
  args: {
    title: "Expanded Accordion",
    children: "This accordion is expanded by default.",
    expanded: true,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled Accordion",
    children: "This accordion is disabled.",
  },
};

export const Primary: Story = {
  args: {
    id: "accordion-1",
    title: "Sample Accordion",
    expanded: false,
    size: "medium",
    variant: "outlined",
    isOpen: false,
    tooltip: "Accordion helper text",
    "aria-label": "Accordion",
    "aria-expanded": false,
    "aria-controls": "accordion-panel-1",
    children: "Accordion details go here.",
  },
};