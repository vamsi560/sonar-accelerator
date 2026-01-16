import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta = {
  title: 'Common/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    variant: 'default',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Card Title</h3>
        <p style={{ margin: '0', color: '#666' }}>
          This is a default card with basic border and shadow styling.
        </p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    size: 'medium',
    variant: 'elevated',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Elevated Card</h3>
        <p style={{ margin: '0', color: '#666' }}>
          This card has an elevated shadow effect for prominence.
        </p>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    size: 'medium',
    variant: 'outlined',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Outlined Card</h3>
        <p style={{ margin: '0', color: '#666' }}>
          This card features an outlined style with transparent background.
        </p>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    variant: 'default',
    children: <p style={{ margin: '0' }}>Small Card</p>,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    variant: 'elevated',
    children: (
      <div>
        <h3 style={{ margin: '0 0 12px 0' }}>Large Card</h3>
        <p style={{ margin: '0', color: '#666', lineHeight: '1.5' }}>
          This is a large card with more padding and spacing. It works great for
          containing more content or creating visual emphasis in your layout.
        </p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    size: 'medium',
    variant: 'default',
    onClick: () => alert('Card clicked!'),
    'aria-label': 'Clickable card',
    tooltip: 'Click to interact',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Interactive Card</h3>
        <p style={{ margin: '0', color: '#666' }}>
          This card is clickable and keyboard accessible.
        </p>
      </div>
    ),
  },
};

export const WithAriaLabel: Story = {
  args: {
    size: 'medium',
    variant: 'default',
    'aria-label': 'Important announcement card',
    'aria-live': 'polite',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Accessible Card</h3>
        <p style={{ margin: '0', color: '#666' }}>
          This card includes ARIA attributes for better accessibility.
        </p>
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    size: 'medium',
    variant: 'outlined',
    'aria-hidden': true,
    children: (
      <div style={{ opacity: 0.5 }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Disabled Card</h3>
        <p style={{ margin: '0', color: '#999' }}>
          This card is hidden from accessibility tree.
        </p>
      </div>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    size: 'medium',
    variant: 'elevated',
    id: 'card-1',
    'aria-labelledby': 'card-title',
    'aria-describedby': 'card-description',
    children: (
      <div>
        <h3 id="card-title" style={{ margin: '0 0 8px 0' }}>
          Card with Description
        </h3>
        <p id="card-description" style={{ margin: '0', color: '#666' }}>
          This card uses aria-labelledby and aria-describedby for comprehensive
          accessibility support.
        </p>
      </div>
    ),
  },
};
