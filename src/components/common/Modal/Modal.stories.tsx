import type { Meta, StoryObj } from '@storybook/react';
import  { useState } from 'react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
};

export default meta;

export const Default: StoryObj<typeof Modal> = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <div>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded">Open Modal</button>
          <Modal isOpen={open} onClose={() => setOpen(false)} aria-label="Demo modal">
            <div className="text-left">
              <h2 className="text-xl font-semibold mb-2">Modal Title</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">This modal uses tokens from tokens.css for colors and spacing.</p>
              <div className="flex justify-end">
                <button onClick={() => setOpen(false)} className="px-3 py-1 bg-gray-200 rounded">Close</button>
              </div>
            </div>
          </Modal>
        </div>
      );
    };
    return <Demo />;
  },
};
