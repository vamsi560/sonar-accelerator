import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';

const meta = {
  title: 'Common/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'link-default',
    label: 'Click here',
    to: 'https://example.com',
    variant: 'primary',
    size: 'medium',
  },
};

export const Primary: Story = {
  args: {
    id: 'link-primary',
    label: 'Primary Link',
    to: '/dashboard',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    id: 'link-secondary',
    label: 'Secondary Link',
    to: '/about',
    variant: 'secondary',
    size: 'medium',
  },
};

export const Success: Story = {
  args: {
    id: 'link-success',
    label: 'Success Link',
    to: '/success',
    variant: 'success',
    size: 'medium',
  },
};

export const Error: Story = {
  args: {
    id: 'link-error',
    label: 'Error Link',
    to: '/error',
    variant: 'error',
    size: 'medium',
  },
};

export const Warning: Story = {
  args: {
    id: 'link-warning',
    label: 'Warning Link',
    to: '/warning',
    variant: 'warning',
    size: 'medium',
  },
};

export const Info: Story = {
  args: {
    id: 'link-info',
    label: 'Info Link',
    to: '/info',
    variant: 'info',
    size: 'medium',
  },
};

export const SizeSmall: Story = {
  args: {
    id: 'link-small',
    label: 'Small Link',
    to: '/small',
    variant: 'primary',
    size: 'small',
  },
};

export const SizeLarge: Story = {
  args: {
    id: 'link-large',
    label: 'Large Link',
    to: '/large',
    variant: 'primary',
    size: 'large',
  },
};

export const External: Story = {
  args: {
    id: 'link-external',
    label: 'Open in new tab',
    to: 'https://github.com',
    target: '_blank',
    variant: 'primary',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    id: 'link-disabled',
    label: 'Disabled Link',
    to: '#',
    variant: 'primary',
    size: 'medium',
    'aria-disabled': true,
  },
};

export const Accessible: Story = {
  args: {
    id: 'link-aria',
    label: 'Learn more',
    to: '/docs',
    variant: 'primary',
    size: 'medium',
    'aria-label': 'Learn more about our services',
  },
};

export const CurrentPage: Story = {
  args: {
    id: 'link-current',
    label: 'Current Page',
    to: '/current',
    variant: 'secondary',
    size: 'medium',
    'aria-current': 'page',
  },
};
