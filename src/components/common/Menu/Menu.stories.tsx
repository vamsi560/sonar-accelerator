import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'danger', 'link'],
    },
    tabIndex: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default menu button with standard styling.
 */
export const Default: Story = {
  args: {
    children: 'Menu',
  },
};

/**
 * Menu button in disabled state.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Menu (Disabled)',
  },
};

/**
 * Menu button with tooltip.
 */
export const WithTooltip: Story = {
  args: {
    children: 'Menu',
    tooltip: 'Click to open menu',
  },
};

/**
 * Primary variant menu button.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Menu',
  },
};

/**
 * Secondary variant menu button.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Menu',
  },
};

/**
 * Danger variant menu button for destructive actions.
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

/**
 * Link variant menu button.
 */
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Menu',
  },
};

/**
 * Menu button with ARIA attributes for expanded/controls.
 */
export const WithAriaAttributes: Story = {
  args: {
    'aria-label': 'Options menu',
    'aria-expanded': false,
    'aria-controls': 'menu-popup',
    children: 'Open Options',
  },
};

/**
 * Controlled menu with state management.
 */
export const Controlled: Story = {
  render: (args) => {
    const ControlledMenu = () => {
      const [isOpen, setIsOpen] = React.useState(false);

      return (
        <Menu
          {...args}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close Menu' : 'Open Menu'}
        </Menu>
      );
    };
    return <ControlledMenu />;
  },
};

/**
 * Menu button with custom callback handlers.
 */
export const WithCallbacks: Story = {
  render: (args) => {
    return (
      <Menu
        {...args}
        onClick={() => alert('Menu clicked!')}
        onFocus={() => console.log('Menu focused')}
        onBlur={() => console.log('Menu blurred')}
      >
        Menu with Callbacks
      </Menu>
    );
  },
};

/**
 * Menu button with custom className for additional styling.
 */
export const WithCustomClassName: Story = {
  args: {
    children: 'Custom Styled',
    className: 'text-lg font-bold',
  },
};
