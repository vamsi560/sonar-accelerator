import type { Meta, StoryObj } from '@storybook/react';
import List, { ListItem } from './List';

const meta = {
  title: 'Common/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'list-default',
    title: 'Default List',
    type: 'ul',
    items: [
      { id: 'item-1', label: 'First item' },
      { id: 'item-2', label: 'Second item' },
      { id: 'item-3', label: 'Third item' },
    ],
  },
};

export const Unordered: Story = {
  args: {
    id: 'list-unordered',
    title: 'Shopping List',
    type: 'ul',
    items: [
      { id: 'milk', label: 'Milk' },
      { id: 'bread', label: 'Bread' },
      { id: 'eggs', label: 'Eggs' },
      { id: 'cheese', label: 'Cheese' },
    ],
  },
};

export const Ordered: Story = {
  args: {
    id: 'list-ordered',
    title: 'Steps to Follow',
    type: 'ol',
    items: [
      { id: 'step-1', label: 'Prepare the ingredients' },
      { id: 'step-2', label: 'Mix in a bowl' },
      { id: 'step-3', label: 'Cook for 20 minutes' },
      { id: 'step-4', label: 'Serve while hot' },
    ],
  },
};

export const Accessible: Story = {
  args: {
    id: 'list-aria-label',
    'aria-label': 'List of required documents',
    type: 'ul',
    items: [
      { id: 'doc-1', label: 'Passport' },
      { id: 'doc-2', label: 'Visa' },
      { id: 'doc-3', label: 'Travel insurance' },
    ],
  },
};

export const WithDescription: Story = {
  args: {
    id: 'list-aria-described',
    title: 'Tasks',
    'aria-describedby': 'task-description',
    type: 'ul',
    items: [
      { id: 'task-1', label: 'Review design' },
      { id: 'task-2', label: 'Code implementation' },
      { id: 'task-3', label: 'Testing' },
    ],
  },
};

export const WithLiveRegion: Story = {
  args: {
    id: 'list-live',
    title: 'Real-time Updates',
    'aria-live': 'polite',
    'aria-label': 'System notifications',
    type: 'ul',
    items: [
      { id: 'notif-1', label: '✓ Database backup completed' },
      { id: 'notif-2', label: '⚠️ High memory usage detected' },
      { id: 'notif-3', label: '✓ Service deployed successfully' },
    ],
  },
};

export const WithCustomContent: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem id="custom-1">
        <div className="flex justify-between items-center">
          <span className="font-medium">User Profile</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Active</span>
        </div>
      </ListItem>
      <ListItem id="custom-2">
        <div className="flex justify-between items-center">
          <span className="font-medium">Settings</span>
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Updated</span>
        </div>
      </ListItem>
      <ListItem id="custom-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Notifications</span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Enabled</span>
        </div>
      </ListItem>
    </List>
  ),
  args: {
    id: 'list-custom',
    title: 'Account Options',
    type: 'ul',
  },
};

export const LargeList: Story = {
  args: {
    id: 'list-large',
    title: 'Comprehensive List',
    type: 'ol',
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `item-${i + 1}`,
      label: `Item ${i + 1}`,
    })),
  },
};

export const NestedContent: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem id="nested-1">
        <div>
          <h4 className="font-semibold text-gray-800">React Component Library</h4>
          <p className="text-sm text-gray-600">A comprehensive set of reusable components</p>
        </div>
      </ListItem>
      <ListItem id="nested-2">
        <div>
          <h4 className="font-semibold text-gray-800">Type-Safe Development</h4>
          <p className="text-sm text-gray-600">Full TypeScript support for better development experience</p>
        </div>
      </ListItem>
      <ListItem id="nested-3">
        <div>
          <h4 className="font-semibold text-gray-800">Accessibility First</h4>
          <p className="text-sm text-gray-600">WCAG 2.2 compliant components with proper ARIA attributes</p>
        </div>
      </ListItem>
    </List>
  ),
  args: {
    id: 'list-nested',
    title: 'Key Features',
    type: 'ul',
  },
};

export const EmptyState: Story = {
  args: {
    id: 'list-empty',
    title: 'No items available',
    type: 'ul',
    items: [],
    children: (
      <ListItem>
        <p className="text-center text-gray-500 py-4">No items in this list</p>
      </ListItem>
    ),
  },
};
