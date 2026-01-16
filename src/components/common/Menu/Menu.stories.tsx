import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Menu from './Menu';
import type { Props } from './Menu';

const meta = {
  title: 'Common/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'menu-default',
    triggerLabel: 'Menu',
    variant: 'default',
    items: [
      { id: 'item-1', label: 'New File' },
      { id: 'item-2', label: 'Open' },
      { id: 'item-3', label: 'Save' },
      { id: 'item-4', label: 'Exit' },
    ],
  },
};

export const Compact: Story = {
  args: {
    id: 'menu-compact',
    triggerLabel: 'Options',
    variant: 'compact',
    items: [
      { id: 'edit', label: 'Edit' },
      { id: 'delete', label: 'Delete' },
      { id: 'duplicate', label: 'Duplicate' },
    ],
  },
};

export const Minimal: Story = {
  args: {
    id: 'menu-minimal',
    triggerLabel: '⋯',
    variant: 'minimal',
    items: [
      { id: 'view', label: 'View' },
      { id: 'share', label: 'Share' },
      { id: 'archive', label: 'Archive' },
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    id: 'menu-disabled-items',
    triggerLabel: 'Actions',
    variant: 'default',
    items: [
      { id: 'copy', label: 'Copy' },
      { id: 'paste', label: 'Paste', disabled: true },
      { id: 'cut', label: 'Cut' },
      { id: 'delete', label: 'Delete', disabled: true },
    ],
  },
};

export const Disabled: Story = {
  args: {
    id: 'menu-disabled',
    triggerLabel: 'Disabled Menu',
    variant: 'default',
    disabled: true,
    items: [
      { id: 'item-1', label: 'Option 1' },
      { id: 'item-2', label: 'Option 2' },
    ],
  },
};

export const Accessible: Story = {
  args: {
    id: 'menu-aria-label',
    triggerLabel: 'File',
    variant: 'default',
    'aria-label': 'File operations menu',
    items: [
      { id: 'new', label: 'New' },
      { id: 'open', label: 'Open' },
      { id: 'close', label: 'Close' },
    ],
  },
};

const MenuWithState = (args: Props) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <Menu
        {...args}
        items={[
          {
            id: 'option-1',
            label: 'Option 1',
            onClick: () => setSelectedItem('Option 1'),
          },
          {
            id: 'option-2',
            label: 'Option 2',
            onClick: () => setSelectedItem('Option 2'),
          },
          {
            id: 'option-3',
            label: 'Option 3',
            onClick: () => setSelectedItem('Option 3'),
          },
        ]}
      />
      {selectedItem && <p className="text-sm text-gray-600">Selected: {selectedItem}</p>}
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => <MenuWithState {...args} />,
  args: {
    id: 'menu-interactive',
    triggerLabel: 'Select Option',
    variant: 'default',
  },
};

export const UserMenu: Story = {
  args: {
    id: 'menu-user',
    triggerLabel: '👤 Account',
    variant: 'default',
    items: [
      { id: 'profile', label: '👤 My Profile' },
      { id: 'settings', label: '⚙️ Settings' },
      { id: 'notifications', label: '🔔 Notifications' },
      { id: 'help', label: '❓ Help' },
      { id: 'logout', label: '🚪 Logout' },
    ],
  },
};

export const EditMenu: Story = {
  args: {
    id: 'menu-edit',
    triggerLabel: 'Edit',
    variant: 'default',
    items: [
      { id: 'undo', label: 'Undo' },
      { id: 'redo', label: 'Redo' },
      { id: 'cut', label: 'Cut' },
      { id: 'copy', label: 'Copy' },
      { id: 'paste', label: 'Paste', disabled: true },
    ],
  },
};

export const LargeMenu: Story = {
  args: {
    id: 'menu-large',
    triggerLabel: 'Select Item',
    variant: 'default',
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `item-${i + 1}`,
      label: `Item ${i + 1}`,
    })),
  },
};

export const ContextMenu: Story = {
  args: {
    id: 'menu-context',
    triggerLabel: 'Context',
    variant: 'minimal',
    items: [
      { id: 'rename', label: 'Rename' },
      { id: 'duplicate', label: 'Duplicate' },
      { id: 'delete', label: 'Delete' },
      { id: 'share', label: 'Share' },
    ],
  },
};
