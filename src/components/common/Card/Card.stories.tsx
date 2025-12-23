import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import CardHeader from './CardHeader';
import CardContent from './CardContent';
import CardFooter from './CardFooter';

const meta: Meta<typeof Card> = {
  title: 'Common/Card',
  component: Card,
  argTypes: {
    size: { control: { type: 'radio' }, options: ['sm', 'md', 'lg'] },
    variant: { control: { type: 'radio' }, options: ['elevation', 'outlined', 'outlined-raised'] },
    className: { control: 'text' },
    tooltip: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <div className="p-6">
      <Card {...args}>
        <CardHeader
          title={<span id="card-title">Jane Doe</span>}
          subheader={<span>Product Designer</span>}
          avatar={<div className="w-8 h-8 bg-[var(--color-primary)] rounded-full" />}
          action={<button aria-label="more">⋯</button>}
        />

        <CardContent>
          <p className="text-[var(--font-size-medium)]">This is a sample card demonstrating the Card component driven by tokens.</p>
        </CardContent>

      
        <CardFooter>
          <small className="text-[var(--color-text-secondary)]">Joined Jan 2024</small>
        </CardFooter>
      </Card>
    </div>
  ),
  args: {
    size: "lg",
    variant: "outlined-raised",
    className: 'max-w-sm mx-auto',
    tooltip: 'User profile',
  'aria-label': 'hhh',
  'aria-live': 'assertive'
  },
};

export const Playground: Story = {
  render: (args) => (
    <div className="p-6">
      <Card {...args}>
        <CardHeader title="Playground title" subheader="subheader" />
        <CardContent>Adjust controls to change size/variant/etc.</CardContent>
      </Card>
    </div>
  ),
  args: {
    size: 'md',
    variant: 'elevation',
    className: 'max-w-md mx-auto',
  },
};
