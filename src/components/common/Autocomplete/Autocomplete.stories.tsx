import type { Meta, StoryObj } from '@storybook/react';
import Autocomplete from './Autocomplete';

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Kiwi',
  'Lemon',
  'Mango',
  'Nectarine',
];

export const Default: Story = {
  args: {
    id: 'autocomplete-default',
    placeholder: 'Search fruits...',
    label: 'Select Fruit',
    options: mockOptions,
  },
};

export const WithValue: Story = {
  args: {
    id: 'autocomplete-value',
    placeholder: 'Search fruits...',
    label: 'Select Fruit',
    value: 'Apple',
    options: mockOptions,
  },
};

export const Small: Story = {
  args: {
    id: 'autocomplete-small',
    placeholder: 'Search...',
    label: 'Small Input',
    size: 'small',
    options: mockOptions,
  },
};

export const Large: Story = {
  args: {
    id: 'autocomplete-large',
    placeholder: 'Search fruits...',
    label: 'Large Input',
    size: 'large',
    options: mockOptions,
  },
};

export const Required: Story = {
  args: {
    id: 'autocomplete-required',
    placeholder: 'Search fruits...',
    label: 'Select Fruit',
    required: true,
    options: mockOptions,
  },
};

export const Disabled: Story = {
  args: {
    id: 'autocomplete-disabled',
    placeholder: 'Search fruits...',
    label: 'Select Fruit',
    disabled: true,
    value: 'Apple',
    options: mockOptions,
  },
};

export const WithTooltip: Story = {
  args: {
    id: 'autocomplete-tooltip',
    placeholder: 'Search fruits...',
    label: 'Select Fruit',
    tooltip: 'Start typing to see available options',
    options: mockOptions,
  },
};
