import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';

const meta: Meta<typeof Table> = {
  title: 'Common/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    caption: 'Sample Data Table',
    headers: ['Name', 'Email', 'Role', 'Status'],
    rows: [
      {
        id: 'row-1',
        cells: [
          { content: 'John Doe', align: 'left' },
          { content: 'john@example.com', align: 'left' },
          { content: 'Admin', align: 'left' },
          { content: '✓ Active', align: 'center' },
        ],
      },
      {
        id: 'row-2',
        cells: [
          { content: 'Jane Smith', align: 'left' },
          { content: 'jane@example.com', align: 'left' },
          { content: 'User', align: 'left' },
          { content: '✓ Active', align: 'center' },
        ],
      },
      {
        id: 'row-3',
        cells: [
          { content: 'Bob Johnson', align: 'left' },
          { content: 'bob@example.com', align: 'left' },
          { content: 'Editor', align: 'left' },
          { content: '✗ Inactive', align: 'center' },
        ],
      },
    ],
  },
};

export const Striped: Story = {
  args: {
    variant: 'striped',
    caption: 'Striped Table',
    headers: ['Product', 'Category', 'Stock'],
    rows: [
      {
        cells: [
          { content: 'Laptop', align: 'left' },
          { content: 'Electronics', align: 'left' },
          { content: '25', align: 'center' },
        ],
      },
      {
        cells: [
          { content: 'Mouse', align: 'left' },
          { content: 'Electronics', align: 'left' },
          { content: '150', align: 'center' },
        ],
      },
      {
        cells: [
          { content: 'Keyboard', align: 'left' },
          { content: 'Electronics', align: 'left' },
          { content: '85', align: 'center' },
        ],
      },
    ],
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    caption: 'Small Table',
    headers: ['Item', 'Qty', 'Price'],
    rows: [
      { cells: [{ content: 'Product A', align: 'left' }, { content: '5', align: 'center' }, { content: '$50', align: 'right' }] },
      { cells: [{ content: 'Product B', align: 'left' }, { content: '3', align: 'center' }, { content: '$30', align: 'right' }] },
    ],
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    caption: 'Large Table',
    headers: ['Project', 'Status', 'Progress'],
    rows: [
      { cells: [{ content: 'Website Redesign', align: 'left' }, { content: 'In Progress', align: 'left' }, { content: '75%', align: 'center' }] },
      { cells: [{ content: 'Mobile App', align: 'left' }, { content: 'Planned', align: 'left' }, { content: '10%', align: 'center' }] },
    ],
  },
};

export const Accessible: Story = {
  args: {
    id: 'employees-table',
    'aria-label': 'Employee Directory',
    caption: 'Employee Directory',
    headers: ['Name', 'Position', 'Department'],
    rows: [
      { cells: [{ content: 'Emily Rodriguez', align: 'left' }, { content: 'Senior Developer', align: 'left' }, { content: 'Engineering', align: 'left' }] },
      { cells: [{ content: 'Marcus Thompson', align: 'left' }, { content: 'Product Manager', align: 'left' }, { content: 'Product', align: 'left' }] },
      { cells: [{ content: 'Lisa Zhang', align: 'left' }, { content: 'UX Designer', align: 'left' }, { content: 'Design', align: 'left' }] },
    ],
    variant: 'striped',
    hoverable: true,
  },
};
