import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Common/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'This is a Level 1 Heading',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'This is a Level 2 Heading',
  },
};

export const Paragraph: Story = {
  args: {
    variant: 'p',
    children:
      'This is a paragraph with default body text. It provides the main content for the page and is typically used for longer form text and descriptions.',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Form Label',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is a small caption text, typically used for descriptions or helper text.',
  },
};

export const Blockquote: Story = {
  args: {
    variant: 'blockquote',
    children: 'The only way to do great work is to love what you do. - Steve Jobs',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large text size example',
  },
};

export const CustomStyling: Story = {
  args: {
    variant: 'p',
    className: 'text-blue-600 font-semibold underline',
    children: 'Paragraph with custom styling',
  },
};

export const Accessibility: Story = {
  args: {
    variant: 'p',
    'aria-live': 'polite',
    children: 'Dynamic content with aria-live polite announcement',
  },
};

export const TextHierarchy: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <section>
        <Typography variant="h1">Article Title</Typography>
        <Typography variant="caption" className="mt-1 block">
          Published on January 14, 2026
        </Typography>
      </section>

      <Typography variant="p">
        The introduction paragraph sets the context for the article. It should be engaging and
        encourage the reader to continue reading the rest of the content.
      </Typography>

      <section>
        <Typography variant="h2">Main Section</Typography>
        <Typography variant="p">
          This section contains the main body text with detailed information and context about the
          topic being discussed.
        </Typography>
      </section>

      <Typography variant="blockquote">
        Typography is not about making beautiful letters, but about making beautiful language
        visible. - Ellen Lupton
      </Typography>

      <section>
        <Typography variant="h2">Conclusion</Typography>
        <Typography variant="p">
          The conclusion summarizes the key points and provides final thoughts on the topic.
        </Typography>
      </section>
    </div>
  ),
};
