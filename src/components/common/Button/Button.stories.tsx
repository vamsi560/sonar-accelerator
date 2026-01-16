import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Secondary Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md',
    children: 'Delete',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    size: 'md',
    children: 'Save',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    children: 'Disabled Button',
  },
};

export const WithTooltip: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    tooltip: 'This is a helpful tooltip',
    children: 'Hover for tooltip',
  },
};
