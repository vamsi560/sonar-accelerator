import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Radiogroup } from './Radiogroup';

const meta: Meta<typeof Radiogroup> = {
  title: 'Common/Radiogroup',
  component: Radiogroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic radiogroup with options array
export const Basic: Story = {
  args: {
    label: 'Select an option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
  },
};

// Small size variant
export const Small: Story = {
  args: {
    label: 'Small radio buttons',
    size: 'small',
    options: [
      { value: 'small1', label: 'Small 1' },
      { value: 'small2', label: 'Small 2' },
      { value: 'small3', label: 'Small 3' },
    ],
    defaultValue: 'small1',
  },
};

// Large size variant
export const Large: Story = {
  args: {
    label: 'Large radio buttons',
    size: 'large',
    options: [
      { value: 'large1', label: 'Large 1' },
      { value: 'large2', label: 'Large 2' },
      { value: 'large3', label: 'Large 3' },
    ],
    defaultValue: 'large1',
  },
};

// Horizontal orientation
export const Horizontal: Story = {
  args: {
    label: 'Select layout direction',
    'aria-orientation': 'horizontal',
    options: [
      { value: 'horiz1', label: 'Horizontal 1' },
      { value: 'horiz2', label: 'Horizontal 2' },
      { value: 'horiz3', label: 'Horizontal 3' },
    ],
    defaultValue: 'horiz1',
  },
};

// Vertical orientation (default)
export const Vertical: Story = {
  args: {
    label: 'Select layout direction',
    'aria-orientation': 'vertical',
    options: [
      { value: 'vert1', label: 'Vertical 1' },
      { value: 'vert2', label: 'Vertical 2' },
      { value: 'vert3', label: 'Vertical 3' },
    ],
    defaultValue: 'vert1',
  },
};

// With error state
export const WithError: Story = {
  args: {
    label: 'Please select an option',
    error: 'This field is required',
    options: [
      { value: 'error1', label: 'Error Option 1' },
      { value: 'error2', label: 'Error Option 2' },
      { value: 'error3', label: 'Error Option 3' },
    ],
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled radiogroup',
    disabled: true,
    options: [
      { value: 'disabled1', label: 'Disabled 1' },
      { value: 'disabled2', label: 'Disabled 2' },
      { value: 'disabled3', label: 'Disabled 3' },
    ],
    defaultValue: 'disabled1',
  },
};

// With some disabled options
export const PartiallyDisabled: Story = {
  args: {
    label: 'Select with disabled options',
    options: [
      { value: 'part1', label: 'Available 1' },
      { value: 'part2', label: 'Unavailable', disabled: true },
      { value: 'part3', label: 'Available 2' },
    ],
    defaultValue: 'part1',
  },
};

// Interactive controlled component
const ControlledWrapper = () => {
  const [selected, setSelected] = React.useState('controlled1');

  return (
    <div className="space-y-4">
      <Radiogroup
        label="Controlled Radiogroup"
        value={selected}
        onChange={(value) => setSelected(String(value))}
        options={[
          { value: 'controlled1', label: 'Option 1' },
          { value: 'controlled2', label: 'Option 2' },
          { value: 'controlled3', label: 'Option 3' },
        ]}
      />
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm font-medium text-gray-700">Selected value:</p>
        <p className="text-lg font-bold text-blue-600">{selected}</p>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledWrapper />,
};

// Accessibility example
const AccessibilityWrapper = () => {
  const [value, setValue] = React.useState('access1');

  return (
    <div className="space-y-6">
      <Radiogroup
        id="accessibility-demo"
        name="accessibility-group"
        label="Accessibility Features Demo"
        aria-label="Select your preferred option"
        aria-required={true}
        aria-live="polite"
        value={value}
        onChange={(val) => setValue(String(val))}
        options={[
          { value: 'access1', label: 'Keyboard navigation enabled' },
          { value: 'access2', label: 'Screen reader optimized' },
          { value: 'access3', label: 'WCAG 2.2 compliant' },
        ]}
      />
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm font-medium text-green-800">Current selection: {value}</p>
      </div>
    </div>
  );
};

export const Accessibility: Story = {
  render: () => <AccessibilityWrapper />,
};
