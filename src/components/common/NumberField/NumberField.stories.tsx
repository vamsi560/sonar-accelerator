import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import NumberField from './NumberField';
import type { Props } from './NumberField';

const meta = {
  title: 'Common/NumberField',
  component: NumberField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'number-default',
    label: 'Enter a number',
    placeholder: '0',
    size: 'medium',
    variant: 'default',
  },
};

export const Outlined: Story = {
  args: {
    id: 'number-outlined',
    label: 'Outlined Number Field',
    placeholder: '0',
    size: 'medium',
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    id: 'number-filled',
    label: 'Filled Number Field',
    placeholder: '0',
    size: 'medium',
    variant: 'filled',
  },
};

export const Small: Story = {
  args: {
    id: 'number-small',
    label: 'Small Number Field',
    size: 'small',
    variant: 'default',
  },
};

export const Large: Story = {
  args: {
    id: 'number-large',
    label: 'Large Number Field',
    size: 'large',
    variant: 'default',
  },
};

export const WithRange: Story = {
  args: {
    id: 'number-range',
    label: 'Select quantity',
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 10,
    size: 'medium',
    variant: 'default',
    title: 'Enter a value between 1 and 100',
  },
};

export const Disabled: Story = {
  args: {
    id: 'number-disabled',
    label: 'Disabled Field',
    disabled: true,
    defaultValue: 42,
    size: 'medium',
    variant: 'default',
  },
};

export const Required: Story = {
  args: {
    id: 'number-required',
    label: 'Required Number',
    required: true,
    placeholder: 'This field is required',
    size: 'medium',
    variant: 'default',
    'aria-required': true,
  },
};

export const WithError: Story = {
  args: {
    id: 'number-error',
    label: 'Age',
    min: 18,
    max: 120,
    error: 'Please enter a valid age between 18 and 120',
    size: 'medium',
    variant: 'default',
    'aria-invalid': true,
  },
};

export const Currency: Story = {
  args: {
    id: 'number-currency',
    label: 'Amount (USD)',
    type: 'number',
    min: 0,
    step: 0.01,
    placeholder: '0.00',
    defaultValue: 0,
    size: 'medium',
    variant: 'default',
    title: 'Enter amount in USD',
  },
};

export const Age: Story = {
  args: {
    id: 'number-age',
    label: 'Age',
    min: 0,
    max: 150,
    step: 1,
    defaultValue: 25,
    size: 'medium',
    variant: 'default',
    required: true,
  },
};

const NumberFieldWithState = (args: Record<string, unknown>) => {
  const [value, setValue] = useState<number | string>((args.defaultValue as number | string) || 0);

  return (
    <div className="space-y-4">
      <NumberField
        {...(args as Props)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && <p className="text-sm text-gray-600">Current value: {value}</p>}
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => <NumberFieldWithState {...args} />,
  args: {
    id: 'number-interactive',
    label: 'Select Number',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    size: 'medium',
    variant: 'default',
  },
};
