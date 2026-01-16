import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', content: 'Content for Tab 1' },
      { id: 'tab-2', label: 'Tab 2', content: 'Content for Tab 2' },
      { id: 'tab-3', label: 'Tab 3', content: 'Content for Tab 3' },
    ],
    defaultValue: 'tab-1',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    tabs: [
      { id: 'large-1', label: 'Large 1', content: 'Large tab content 1' },
      { id: 'large-2', label: 'Large 2', content: 'Large tab content 2' },
      { id: 'large-3', label: 'Large 3', content: 'Large tab content 3' },
    ],
    defaultValue: 'large-1',
  },
};

export const Pills: Story = {
  args: {
    variant: 'pills',
    tabs: [
      { id: 'pill-1', label: 'Pill 1', content: 'Pill variant content 1' },
      { id: 'pill-2', label: 'Pill 2', content: 'Pill variant content 2' },
      { id: 'pill-3', label: 'Pill 3', content: 'Pill variant content 3' },
    ],
    defaultValue: 'pill-1',
  },
};

export const WithIcons: Story = {
  args: {
    tabs: [
      { id: 'icon-1', label: 'Home', icon: '🏠', content: 'Home content' },
      { id: 'icon-2', label: 'Settings', icon: '⚙️', content: 'Settings content' },
      { id: 'icon-3', label: 'Profile', icon: '👤', content: 'Profile content' },
    ],
    defaultValue: 'icon-1',
  },
};

const ControlledWrapper = () => {
  const [selectedTab, setSelectedTab] = React.useState('controlled-1');
  return (
    <div className="space-y-6">
      <Tabs
        value={selectedTab}
        onChange={setSelectedTab}
        tabs={[
          { id: 'controlled-1', label: 'Tab A', content: 'Content A' },
          { id: 'controlled-2', label: 'Tab B', content: 'Content B' },
          { id: 'controlled-3', label: 'Tab C', content: 'Content C' },
        ]}
      />
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm font-medium text-gray-700">Current Tab:</p>
        <p className="text-lg font-bold text-blue-600">{selectedTab}</p>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledWrapper />,
};

const AccessibilityWrapper = () => {
  const [activeTab, setActiveTab] = React.useState('access-1');
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-2">Accessible Tabs</h2>
        <p className="text-sm text-gray-600 mb-4">Full keyboard navigation and screen reader support</p>
      </div>
      <Tabs
        aria-label="Accessible tab navigation"
        aria-live="polite"
        value={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'access-1', label: 'Docs', icon: '📖', content: 'Documentation' },
          { id: 'access-2', label: 'Examples', icon: '📝', content: 'Code examples' },
          { id: 'access-3', label: 'API', icon: '⚡', content: 'API reference' },
        ]}
      />
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm font-medium text-green-800">Active: <strong>{activeTab}</strong></p>
      </div>
    </div>
  );
};

export const Accessibility: Story = {
  render: () => <AccessibilityWrapper />,
};
