import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'checkbox-default',
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    id: 'checkbox-checked',
    label: 'I agree',
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    id: 'checkbox-unchecked',
    label: 'Subscribe to newsletter',
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    id: 'checkbox-disabled',
    label: 'This option is unavailable',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    id: 'checkbox-sm',
    label: 'Small checkbox',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    id: 'checkbox-lg',
    label: 'Large checkbox',
    size: 'lg',
  },
};

export const Success: Story = {
  args: {
    id: 'checkbox-success',
    label: 'Success checkbox',
    variant: 'success',
    checked: true,
  },
};

export const Error: Story = {
  args: {
    id: 'checkbox-error',
    label: 'Error checkbox',
    variant: 'error',
    checked: true,
  },
};

export const WithTooltip: Story = {
  args: {
    id: 'checkbox-tooltip',
    label: 'Enable two-factor authentication',
    tooltip: 'Recommended for account security',
  },
};
