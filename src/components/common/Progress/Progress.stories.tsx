import type { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'progress-default',
    value: 50,
    title: 'Download Progress',
  },
};

export const Empty: Story = {
  args: {
    id: 'progress-empty',
    value: 0,
    title: 'Task Progress',
  },
};

export const Completed: Story = {
  args: {
    id: 'progress-completed',
    value: 100,
    title: 'Loading',
  },
};

export const Small: Story = {
  args: {
    id: 'progress-sm',
    value: 45,
    title: 'Small Progress',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    id: 'progress-lg',
    value: 75,
    title: 'Large Progress',
    size: 'lg',
  },
};

export const Success: Story = {
  args: {
    id: 'progress-success',
    value: 100,
    title: 'Installation Complete',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    id: 'progress-warning',
    value: 70,
    title: 'Disk Usage',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    id: 'progress-error',
    value: 25,
    title: 'Failed Download',
    variant: 'error',
  },
};

export const Circular: Story = {
  args: {
    id: 'progress-circular',
    value: 60,
    title: 'Loading',
    type: 'circular',
    variant: 'primary',
  },
};
