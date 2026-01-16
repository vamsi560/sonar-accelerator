import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import React from 'react';

const meta: Meta<typeof Select> = {
  title: 'Common/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic select with options array
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

// Large size variant
export const Large: Story = {
  args: {
    label: 'Large select',
    size: 'large',
    options: [
      { value: 'large1', label: 'Large 1' },
      { value: 'large2', label: 'Large 2' },
      { value: 'large3', label: 'Large 3' },
    ],
    defaultValue: 'large1',
  },
};

// Default variant
export const VariantDefault: Story = {
  args: {
    label: 'Default variant',
    variant: 'default',
    options: [
      { value: 'default1', label: 'Default 1' },
      { value: 'default2', label: 'Default 2' },
      { value: 'default3', label: 'Default 3' },
    ],
    defaultValue: 'default1',
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
    label: 'Disabled select',
    disabled: true,
    options: [
      { value: 'disabled1', label: 'Disabled 1' },
      { value: 'disabled2', label: 'Disabled 2' },
      { value: 'disabled3', label: 'Disabled 3' },
    ],
    defaultValue: 'disabled1',
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Required selection',
    required: true,
    options: [
      { value: 'req1', label: 'Required 1' },
      { value: 'req2', label: 'Required 2' },
      { value: 'req3', label: 'Required 3' },
    ],
  },
};

// Interactive controlled component
const ControlledWrapper = () => {
  const [selected, setSelected] = React.useState('controlled1');

  return (
    <div className="space-y-4">
      <Select
        label="Controlled Select"
        value={selected}
        onChange={(value: string | number) => setSelected(String(value))}
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
      <Select
        id="accessibility-demo"
        name="accessibility-group"
        label="Accessibility Features Demo"
        aria-label="Select your preferred option"
        aria-required={true}
        aria-live="polite"
        value={value}
        onChange={(val: string | number) => setValue(String(val))}
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
