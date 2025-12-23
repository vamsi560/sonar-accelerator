import type { Meta, StoryObj } from '@storybook/react';
import List from './List';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    'aria-live': {
      control: 'select',
      options: ['off', 'polite', 'assertive'],
    },
    'aria-orientation': {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default list with basic items.
 */
export const Default: Story = {
  args: {
    'aria-label': 'Basic list',
    children: (
      <>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Item 1
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Item 2
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Item 3
        </li>
      </>
    ),
  },
};

/**
 * List with title and description.
 */
export const WithTitle: Story = {
  args: {
    tooltip: 'Menu Items',
    'aria-label': 'Navigation menu',
    children: (
      <>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Home
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          About
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Contact
        </li>
      </>
    ),
  },
};

/**
 * List with tooltip.
 */
export const WithTooltip: Story = {
  args: {
    tooltip: 'Click any item to select',
    'aria-label': 'Options list with tooltip',
    children: (
      <>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Option A
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Option B
        </li>
      </>
    ),
  },
};

/**
 * Horizontal list with aria-orientation.
 */
export const Horizontal: Story = {
  args: {
    tooltip: 'Navigation',
    'aria-orientation': 'horizontal',
    'aria-label': 'Horizontal navigation list',
    children: (
      <>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer whitespace-nowrap">
          Home
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer whitespace-nowrap">
          Products
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer whitespace-nowrap">
          Services
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer whitespace-nowrap">
          Contact
        </li>
      </>
    ),
  },
};

/**
 * Vertical list with aria-orientation.
 */
export const Vertical: Story = {
  args: {
    'aria-orientation': 'vertical',
    'aria-label': 'Vertical list',
    children: (
      <>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          First
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Second
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Third
        </li>
      </>
    ),
  },
};

/**
 * List with aria-live set to polite (announcements without interrupting).
 */
export const WithAriaLivePolite: Story = {
  args: {
    tooltip: 'Updates',
    'aria-live': 'polite',
    'aria-label': 'Live update list',
    children: (
      <>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-success)] hover:bg-[var(--color-success-light)] rounded transition-colors">
          ✓ Task completed
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-info)] hover:bg-[var(--color-info-light)] rounded transition-colors">
          ℹ Info updated
        </li>
      </>
    ),
  },
};

/**
 * List with aria-live set to assertive (important announcements).
 */
export const WithAriaLiveAssertive: Story = {
  args: {
    tooltip: 'Alerts',
    'aria-live': 'assertive',
    'aria-label': 'Alert list',
    children: (
      <>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-error)] hover:bg-[var(--color-error-light)] rounded transition-colors">
          ⚠ Error occurred
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-warning)] hover:bg-[var(--color-warning-light)] rounded transition-colors">
          ⚡ Warning
        </li>
      </>
    ),
  },
};

/**
 * List with ARIA labelledby attribute linking to external title.
 */
export const WithAriaLabelledby: Story = {
  render: (args) => (
    <div>
      <h2 id="custom-list-title" className="text-lg font-bold mb-4">
        Custom List Title
      </h2>
      <List {...args} aria-labelledby="custom-list-title">
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Item A
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Item B
        </li>
      </List>
    </div>
  ),
};

/**
 * List with aria-describedby for additional description.
 */
export const WithAriaDescribedby: Story = {
  render: (args) => (
    <div>
      <List {...args} aria-describedby="list-description">
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Action 1
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Action 2
        </li>
      </List>
      <p id="list-description" className="text-sm text-[var(--color-text-secondary)] mt-2">
        Select any action from the list above to proceed.
      </p>
    </div>
  ),
};

/**
 * List with custom className for additional styling.
 */
export const WithCustomClassName: Story = {
  args: {
    tooltip: 'Custom Styled List',
    className: 'bg-[var(--color-primary-light)] rounded-lg p-2 border border-[var(--color-primary)]',
    'aria-label': 'Custom styled list',
    children: (
      <>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-primary)] hover:bg-white rounded transition-colors cursor-pointer">
          Item 1
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-primary)] hover:bg-white rounded transition-colors cursor-pointer">
          Item 2
        </li>
      </>
    ),
  },
};

/**
 * List with multiple items showing divider pattern.
 */
export const WithDividers: Story = {
  args: {
    tooltip: 'Sectioned List',
    'aria-label': 'List with dividers',
    children: (
      <>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Section 1 - Item 1
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Section 1 - Item 2
        </li>
        <li className="border-b border-[var(--color-divider)] my-1" />
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Section 2 - Item 1
        </li>
        <li className="px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] text-[var(--color-black)] hover:bg-[var(--color-primary-light)] rounded transition-colors cursor-pointer">
          Section 2 - Item 2
        </li>
      </>
    ),
  },
};
