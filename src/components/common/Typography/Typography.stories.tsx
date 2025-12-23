import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Common/Typography',
  component: Typography,
  decorators: [
    (Story) => (
      <div className="p-6 bg-white min-h-screen">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
        'button',
        'inherit',
      ],
    },
    ariaLabel: { control: 'text' },
    ariaLabelledby: { control: 'text' },
    ariaDescribedby: { control: 'text' },
    ariaHidden: { control: 'boolean' },
    ariaLive: { control: 'select', options: ['off', 'polite', 'assertive'] },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Variants: Story = {
  args: {
    children: 'Typography sample',
    variant: 'body1',
  },
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">H1 Heading</Typography>
      <Typography variant="h2">H2 Heading</Typography>
      <Typography variant="h3">H3 Heading</Typography>
      <Typography variant="h4">H4 Heading</Typography>
      <Typography variant="h5">H5 Heading</Typography>
      <Typography variant="h6">H6 Heading</Typography>
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="body1">Body 1 - use for long paragraphs of text.</Typography>
      <Typography variant="body2">Body 2 - smaller paragraph text.</Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="overline">Overline text</Typography>
      <Typography variant="button">Button text</Typography>
    </div>
  ),
};

export const AriaAndTooltip: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography ariaLabel="title-label" variant="h4">
        H4 with aria-label
      </Typography>
      <Typography ariaLabelledby="my-id" ariaDescribedby="desc-id" variant="body1">
        <span id="my-id">Body with aria-labelledby</span>
        <span className="sr-only" id="desc-id">Described content for assistive tech.</span>
      </Typography>
      <Typography ariaHidden variant="caption">Hidden caption (aria-hidden)</Typography>
    </div>
  ),
};
