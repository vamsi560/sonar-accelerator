import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Pagination from './Pagination';
import type { Props } from './Pagination';

const meta = {
  title: 'Common/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'pagination-default',
    currentPage: 1,
    totalPages: 10,
    size: 'medium',
    variant: 'default',
    showPreviousNext: true,
  },
};

export const Large: Story = {
  args: {
    id: 'pagination-large',
    currentPage: 1,
    totalPages: 10,
    size: 'large',
    variant: 'default',
    showPreviousNext: true,
  },
};

export const WithFirstLast: Story = {
  args: {
    id: 'pagination-first-last',
    currentPage: 5,
    totalPages: 10,
    size: 'medium',
    variant: 'default',
    showPreviousNext: true,
    showFirstLast: true,
  },
};

export const LargeDataset: Story = {
  args: {
    id: 'pagination-large-dataset',
    currentPage: 1,
    totalPages: 100,
    size: 'medium',
    variant: 'default',
    showPreviousNext: true,
    maxVisiblePages: 5,
  },
};

export const Disabled: Story = {
  args: {
    id: 'pagination-disabled',
    currentPage: 1,
    totalPages: 10,
    size: 'medium',
    variant: 'default',
    disabled: true,
    showPreviousNext: true,
  },
};

export const Accessible: Story = {
  args: {
    id: 'pagination-aria-label',
    currentPage: 1,
    totalPages: 10,
    size: 'medium',
    variant: 'default',
    'aria-label': 'Search results pagination',
    showPreviousNext: true,
  },
};

const PaginationWithState = (args: Props) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

  return (
    <div className="space-y-4">
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <p className="text-sm text-gray-600">
        Current page: {currentPage} of {args.totalPages}
      </p>
    </div>
  );
};

export const InteractiveWithState: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: {
    id: 'pagination-interactive',
    currentPage: 1,
    totalPages: 10,
    size: 'medium',
    variant: 'default',
    showPreviousNext: true,
  },
};

const SearchResultsPagination = (args: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 245;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
      </p>
      <Pagination
        {...args}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export const SearchResults: Story = {
  render: (args) => <SearchResultsPagination {...args} />,
  args: {
    id: 'pagination-search',
    size: 'medium',
    variant: 'default',
    showPreviousNext: true,
  },
};

const TableDataPagination = (args: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalItems = 500;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded p-4 bg-gray-50">
        <p className="text-sm text-gray-600">
          Table data for page {currentPage} ({itemsPerPage} items per page)
        </p>
      </div>
      <Pagination
        {...args}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export const TablePagination: Story = {
  render: (args) => <TableDataPagination {...args} />,
  args: {
    id: 'pagination-table',
    size: 'medium',
    variant: 'default',
    showPreviousNext: true,
    showFirstLast: true,
  },
};
