import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Common/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Helpful tooltip text',
    children: <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Hover me</button>,
  },
};

export const Large: Story = {
  args: {
    title: 'Large tooltip with more content and detailed information',
    size: 'large',
    children: <button className="px-5 py-3 bg-gray-500 text-white rounded-lg text-lg">Large</button>,
  },
};

export const PlacementTop: Story = {
  args: {
    title: 'Top placement',
    placement: 'top',
    children: <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Top</button>,
  },
};

export const PlacementBottom: Story = {
  args: {
    title: 'Bottom placement',
    placement: 'bottom',
    children: <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">Bottom</button>,
  },
};

export const Disabled: Story = {
  args: {
    title: 'This tooltip is disabled',
    disabled: true,
    children: <button className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed" disabled>Disabled</button>,
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Info tooltip',
    placement: 'top',
    children: (
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
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
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        Info
      </button>
    ),
  },
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip title="First tooltip" placement="top">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Btn 1</button>
      </Tooltip>
      <Tooltip title="Second tooltip" placement="top">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Btn 2</button>
      </Tooltip>
      <Tooltip title="Third tooltip" placement="top">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Btn 3</button>
      </Tooltip>
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    title: 'Accessible tooltip with proper ARIA attributes',
    'aria-label': 'Help information tooltip',
    placement: 'top',
    children: (
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
        aria-label="Click for help"
      >
        Help
      </button>
    ),
  },
};
