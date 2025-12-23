import type { Meta, StoryObj } from "@storybook/react";
import AutoComplete from "../AutoComplete/AutoComplte";

const options = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
];

const meta: Meta<typeof AutoComplete> = {
  title: "Common/AutoComplete",
  component: AutoComplete,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

export const Primary: Story = {
  args: {
    id: "autocomplete-demo",
    label: "Fruit",
    placeholder: "Select a fruit...",
    options,
    value: "",
    onChange: () => {},
    required: false,
    disabled: false,
    readOnly: false,
    size: "medium",
    autoFocus: false,
    autoCompleteProp: "off",
    tooltip: "Pick your favorite fruit",
    "aria-label": "Fruit Autocomplete",
  },
};
