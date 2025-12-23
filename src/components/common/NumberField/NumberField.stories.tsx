import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import NumberField from './NumberField';

const meta: Meta<typeof NumberField> = {
  title: 'Common/NumberField',
  component: NumberField,
};

export default meta;
type Story = StoryObj<typeof NumberField>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <NumberField label="Enter a number" placeholder="Type a number..." />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [val, setVal] = useState<string | number>(5);
      return (
        <div className="p-4">
          <NumberField label="Controlled Number" value={val} onChange={(e) => setVal(e.target.value)} min={0} max={100} />
          <p className="mt-4 text-sm">Value: {val}</p>
        </div>
      );
    };
    return <Demo />;
  },
};

export const WithMinMax: Story = {
  render: () => (
    <div className="p-4">
      <NumberField label="Number (0-100)" min={0} max={100} defaultValue={50} step={5} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="p-4">
      <NumberField label="Disabled Field" disabled defaultValue={42} />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="p-4">
      <NumberField label="With Error" error placeholder="Invalid input" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="p-4">
      <NumberField label="Required" required placeholder="Enter a value" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-4 space-y-6">
      <NumberField label="Small" size="sm" defaultValue={1} />
      <NumberField label="Medium" size="md" defaultValue={2} />
      <NumberField label="Large" size="l" defaultValue={3} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="p-4 space-y-6">
      <NumberField label="Outlined" variant="outlined" defaultValue={10} />
      <NumberField label="Filled" variant="filled" defaultValue={20} />
      <NumberField label="Standard" variant="standard" defaultValue={30} />
    </div>
  ),
};

export const WithStep: Story = {
  render: () => (
    <div className="p-4">
      <NumberField label="Step by 0.5" min={0} max={10} step={0.5} defaultValue={2.5} />
    </div>
  ),
};
