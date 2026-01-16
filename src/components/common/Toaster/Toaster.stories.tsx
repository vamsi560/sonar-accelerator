import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Toaster from './Toaster';

const meta: Meta<typeof Toaster> = {
  title: 'Common/Toaster',
  component: Toaster,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    message: 'An error occurred. Please try again.',
    variant: 'error',
  },
};

export const Warning: Story = {
  args: {
    message: 'Please review before proceeding.',
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    message: 'This is an informational message.',
    variant: 'info',
  },
};

export const Large: Story = {
  args: {
    message: 'Large notification with more padding and text',
    size: 'large',
    variant: 'success',
  },
};

export const WithCustomIcon: Story = {
  args: {
    message: 'Custom icon notification',
    variant: 'info',
    startDecorator: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500 flex-shrink-0"
      >
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
  },
};

export const WithAction: Story = {
  args: {
    message: 'Your session is about to expire',
    variant: 'warning',
    endDecorator: (
      <button className="text-yellow-600 hover:text-yellow-800 font-medium text-sm flex-shrink-0">
        Extend
      </button>
    ),
    onClose: () => console.log('Toast closed'),
  },
};

const DynamicToasterComponent = () => {
  const [toasts, setToasts] = React.useState<Array<{ id: string; message: string; variant: 'success' | 'error' | 'warning' | 'info' }>>([]);

  const addToast = (message: string, variant: typeof toasts[number]['variant']) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, variant }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => addToast('Success!', 'success')} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Success
        </button>
        <button onClick={() => addToast('Error!', 'error')} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Error
        </button>
        <button onClick={() => addToast('Warning!', 'warning')} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Warning
        </button>
        <button onClick={() => addToast('Info', 'info')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Info
        </button>
      </div>

      <div className="space-y-2 mt-4">
        {toasts.map((toast) => (
          <Toaster
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
            onClose={() => removeToast(toast.id)}
            autoCloseDuration={4000}
          />
        ))}
      </div>
    </div>
  );
};

export const Dynamic: Story = {
  render: () => <DynamicToasterComponent />,
};

export const Accessibility: Story = {
  args: {
    message: 'Your changes have been saved',
    variant: 'success',
    'aria-label': 'Success notification',
    'aria-live': 'polite',
  },
};
