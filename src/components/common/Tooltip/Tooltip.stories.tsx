import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
// (no explicit React import required for JSX with modern TS toolchain)

const meta: Meta<typeof Tooltip> = {
  title: 'Common/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <div className="p-12 bg-gray-50 min-h-screen flex items-center justify-center space-x-8">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    title: { control: 'text' },
    className: { control: 'text' },
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
    'aria-describedby': { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    title: 'Basic Tooltip',
    size: 'medium',
    placement: 'top',
    'aria-label': 'basic tooltip',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="bg-[var(--color-primary)] text-[var(--color-white)] px-3 py-2 rounded">Hover me</button>
    </Tooltip>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div className="flex gap-8 items-center justify-center">
      <Tooltip title="Top Tooltip" placement="top">
        <button className="bg-[var(--color-primary)] text-[var(--color-white)] px-3 py-2 rounded">Top</button>
      </Tooltip>
      <Tooltip title="Right Tooltip" placement="right">
        <button className="bg-[var(--color-secondary)] text-[var(--color-white)] px-3 py-2 rounded">Right</button>
      </Tooltip>
      <Tooltip title="Bottom Tooltip" placement="bottom">
        <button className="bg-[var(--color-success)] text-[var(--color-white)] px-3 py-2 rounded">Bottom</button>
      </Tooltip>
      <Tooltip title="Left Tooltip" placement="left">
        <button className="bg-[var(--color-warning)] text-[var(--color-white)] px-3 py-2 rounded">Left</button>
      </Tooltip>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip title="Small" size="small">
        <button className="bg-[var(--color-primary)] text-[var(--color-white)] px-3 py-2 rounded">Small</button>
      </Tooltip>
      <Tooltip title="Medium" size="medium">
        <button className="bg-[var(--color-secondary)] text-[var(--color-white)] px-3 py-2 rounded">Medium</button>
      </Tooltip>
      <Tooltip title="Large" size="large">
        <button className="bg-[var(--color-success)] text-[var(--color-white)] px-3 py-2 rounded">Large</button>
      </Tooltip>
    </div>
  ),
};
