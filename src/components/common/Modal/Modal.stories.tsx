import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'modal-default',
    title: 'Modal Title',
    isOpen: true,
    onClose: () => {},
  },
  render: (args) => (
    <Modal {...args}>
      <p className="text-gray-700">This is a basic modal with default settings.</p>
    </Modal>
  ),
};

export const Small: Story = {
  args: {
    id: 'modal-small',
    title: 'Small Modal',
    isOpen: true,
    maxWidth: 'sm',
    onClose: () => {},
  },
  render: (args) => (
    <Modal {...args}>
      <p className="text-gray-700">This is a small modal window.</p>
    </Modal>
  ),
};

export const Large: Story = {
  args: {
    id: 'modal-large',
    title: 'Large Modal',
    isOpen: true,
    maxWidth: 'lg',
    onClose: () => {},
  },
  render: (args) => (
    <Modal {...args}>
      <p className="text-gray-700">This is a large modal window with more content space.</p>
    </Modal>
  ),
};

export const WithForm: Story = {
  args: {
    id: 'modal-form',
    title: 'User Information',
    isOpen: true,
    maxWidth: 'md',
    onClose: () => {},
  },
  render: (args) => (
    <Modal {...args}>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex gap-3 justify-end pt-4">
          <button
            type="button"
            onClick={args.onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  ),
};

export const Confirmation: Story = {
  args: {
    id: 'modal-confirm',
    title: 'Confirm Action',
    isOpen: true,
    maxWidth: 'sm',
    onClose: () => {},
  },
  render: (args) => (
    <Modal {...args}>
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={args.onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  ),
};
