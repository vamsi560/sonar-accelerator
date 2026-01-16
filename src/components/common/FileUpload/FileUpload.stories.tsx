import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FileUpload from './FileUpload';

const meta = {
  title: 'Common/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

const FileUploadWithCallback = (args: Record<string, unknown>) => {
  const [fileName, setFileName] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      const names = Array.from(files)
        .map((file) => file.name)
        .join(', ');
      setFileName(names);
    }
  };

  return (
    <div className="space-y-4">
      <FileUpload {...args} onChange={handleChange} />
      {fileName && <p className="text-sm text-gray-600">Selected: {fileName}</p>}
    </div>
  );
};

export const Default: Story = {
  args: {
    id: 'file-upload-default',
    label: 'Upload File',
    size: 'medium',
    variant: 'default',
    accept: '.pdf,.doc,.docx',
  },
};

export const Multiple: Story = {
  args: {
    id: 'file-upload-multiple',
    label: 'Upload Multiple Files',
    size: 'medium',
    variant: 'default',
    multiple: true,
    accept: '.jpg,.png,.pdf',
  },
};

export const VariantDashed: Story = {
  args: {
    id: 'file-upload-dashed',
    label: 'Drag and Drop Files',
    size: 'medium',
    variant: 'dashed',
    multiple: true,
    tooltip: 'Drag files here or click to select',
  },
};

export const VariantOutlined: Story = {
  args: {
    id: 'file-upload-outlined',
    label: 'Select Images',
    size: 'medium',
    variant: 'outlined',
    accept: '.jpg,.png,.gif,.webp',
  },
};

export const SizeSmall: Story = {
  args: {
    id: 'file-upload-small',
    label: 'Upload',
    size: 'small',
    variant: 'default',
  },
};

export const SizeLarge: Story = {
  args: {
    id: 'file-upload-large',
    label: 'Upload Large File',
    size: 'large',
    variant: 'default',
  },
};

export const Disabled: Story = {
  args: {
    id: 'file-upload-disabled',
    label: 'Disabled Upload',
    size: 'medium',
    variant: 'default',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    id: 'file-upload-error',
    label: 'Upload Document',
    size: 'medium',
    variant: 'default',
    error: 'File size exceeds 5MB limit.',
    accept: '.pdf,.doc,.docx',
  },
};

export const Required: Story = {
  args: {
    id: 'file-upload-required',
    label: 'Required Document',
    size: 'medium',
    variant: 'default',
    required: true,
    'aria-required': true,
  },
};

export const Accessible: Story = {
  args: {
    id: 'file-upload-aria',
    label: 'Upload Profile Photo',
    size: 'medium',
    variant: 'default',
    'aria-label': 'Upload your profile photo in JPG or PNG format',
    'aria-describedby': 'photo-help-text',
  },
};

export const FullWidth: Story = {
  args: {
    id: 'file-upload-fullwidth',
    label: 'Full Width Upload',
    size: 'medium',
    variant: 'dashed',
    fullWidth: true,
  },
};

export const WithCallback: Story = {
  render: (args) => <FileUploadWithCallback {...args} />,
  args: {
    id: 'file-upload-callback',
    label: 'Select File and Display Name',
    size: 'medium',
    variant: 'default',
    multiple: true,
  },
};
