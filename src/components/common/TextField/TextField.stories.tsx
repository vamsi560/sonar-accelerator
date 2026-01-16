import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TextField from './TextField';
import type { Props } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Common/TextField',
  component: TextField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    label: 'Text Field',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Text Field',
    size: 'large',
    placeholder: 'Large input',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Variant',
    variant: 'outlined',
    placeholder: 'Enter text',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Text Field',
    placeholder: 'Disabled input',
    disabled: true,
    value: 'Cannot edit',
  },
};

export const WithError: Story = {
  args: {
    label: 'Text Field',
    placeholder: 'Enter text',
    error: 'This field is required',
    'aria-invalid': true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required Text Field',
    required: true,
    placeholder: 'Enter required text',
    'aria-required': true,
  },
};

export const WithDecorator: Story = {
  args: {
    label: 'Email Field',
    type: 'email',
    placeholder: 'user@example.com',
    startDecorator: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
};

const InteractiveComponent = (args: Props) => {
  const [value, setValue] = React.useState('');
  return (
    <div className="flex flex-col gap-4">
      <TextField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="text-sm text-gray-600">Current value: {value}</p>
    </div>
  );
};

export const Interactive: Story = {
  args: {
    label: 'Interactive Text Field',
    placeholder: 'Type something...',
    size: 'medium',
    variant: 'outlined',
  },
  render: (args) => <InteractiveComponent {...args} />,
};

export const Accessibility: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    required: true,
    'aria-label': 'Username input field',
    'aria-required': true,
    'aria-describedby': 'username-hint',
  },
};
