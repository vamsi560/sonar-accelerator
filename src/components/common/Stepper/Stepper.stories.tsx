import type { Meta, StoryObj } from '@storybook/react';
import Stepper from './Stepper';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

export const Default: Story = {
  args: {
    id: 'stepper-default',
    type: 'horizontal',
    activeStep: 0,
    steps,
  },
};

export const Horizontal: Story = {
  args: {
    id: 'stepper-h',
    type: 'horizontal',
    activeStep: 2,
    steps,
  },
};

export const Vertical: Story = {
  args: {
    id: 'stepper-v',
    type: 'vertical',
    activeStep: 1,
    steps,
  },
};

export const WithTitle: Story = {
  args: {
    id: 'stepper-title',
    type: 'horizontal',
    title: 'Process Steps',
    activeStep: 1,
    steps,
  },
};

export const Disabled: Story = {
  args: {
    id: 'stepper-disabled',
    type: 'horizontal',
    disabled: true,
    activeStep: 0,
    steps,
  },
};
