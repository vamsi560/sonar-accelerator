import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Common/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    title: 'Accordion Item',
    children: 'This is the content of the accordion item. It expands and collapses on click.',
  },
};

export const Expanded: Story = {
  args: {
    title: 'Expanded Item',
    expanded: true,
    children: 'This accordion item is expanded by default.',
  },
};

// Size Variants
export const SizeSmall: Story = {
  args: {
    title: 'Small Accordion',
    size: 'small',
    children: 'Small accordion content with compact spacing.',
  },
};

export const SizeMedium: Story = {
  args: {
    title: 'Medium Accordion',
    size: 'medium',
    children: 'Medium accordion content with standard spacing.',
  },
};

export const SizeLarge: Story = {
  args: {
    title: 'Large Accordion',
    size: 'large',
    children: 'Large accordion content with spacious padding.',
  },
};

// Variant Examples
export const VariantDefault: Story = {
  args: {
    title: 'Default Variant',
    variant: 'default',
    children: 'Default accordion with border and white background.',
  },
};

export const VariantOutlined: Story = {
  args: {
    title: 'Outlined Variant',
    variant: 'outlined',
    children: 'Outlined accordion with thicker border.',
  },
};

export const VariantMinimal: Story = {
  args: {
    title: 'Minimal Variant',
    variant: 'minimal',
    children: 'Minimal accordion with bottom border only.',
  },
};

export const VariantFilled: Story = {
  args: {
    title: 'Filled Variant',
    variant: 'filled',
    children: 'Filled accordion with gray background.',
  },
};

// Content Example
export const WithContent: Story = {
  args: {
    title: 'Features',
    children: (
      <ul className="list-disc list-inside space-y-2">
        <li>Easy to use</li>
        <li>Fully accessible</li>
        <li>Customizable variants</li>
        <li>Responsive design</li>
      </ul>
    ),
  },
};

// Accessibility
export const Accessible: Story = {
  args: {
    title: 'Accessible Section',
    'aria-label': 'Product details accordion',
    children: 'This accordion has proper ARIA labels for screen readers.',
  },
};

// Multiple Accordions
const MultipleAccordionsComponent = () => {
  const [expandedIndex, setExpandedIndex] = React.useState(0);

  const items = [
    {
      title: 'What is React?',
      content: 'React is a JavaScript library for building user interfaces with components.',
    },
    {
      title: 'What is TypeScript?',
      content: 'TypeScript is a superset of JavaScript that adds static typing.',
    },
    {
      title: 'What is Tailwind CSS?',
      content: 'Tailwind CSS is a utility-first CSS framework for building designs.',
    },
  ];

  return (
    <div className="space-y-2 max-w-2xl">
      {items.map((item, index) => (
        <Accordion
          key={index}
          title={item.title}
          expanded={expandedIndex === index}
          onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
        >
          {item.content}
        </Accordion>
      ))}
    </div>
  );
};

export const MultipleAccordions: Story = {
  render: () => <MultipleAccordionsComponent />,
};
