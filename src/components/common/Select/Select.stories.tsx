import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'Common/Select',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <Select label="Choose an option" defaultValue="1">
        <option value="">Select...</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [val, setVal] = useState<string | number>('2');
      return (
        <div className="p-4">
          <Select label="Controlled Select" value={val} onChange={(e) => setVal(e.target.value)}>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Select>
          <p className="mt-4 text-sm">Selected: {val}</p>
        </div>
      );
    };
    return <Demo />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="p-4">
      <Select label="Disabled Select" disabled defaultValue="1">
        <option value="1">One</option>
        <option value="2">Two</option>
      </Select>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="p-4">
      <Select label="Select with Error" error defaultValue="">
        <option value="">Select...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
      </Select>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="p-4">
      <Select label="Required Field" required defaultValue="">
        <option value="">Select...</option>
        <option value="1">Option A</option>
        <option value="2">Option B</option>
      </Select>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-4 space-y-6">
      <Select label="Small Select" size="small" defaultValue="1">
        <option value="1">Small One</option>
        <option value="2">Small Two</option>
      </Select>

      <Select label="Medium Select" size="medium" defaultValue="1">
        <option value="1">Medium One</option>
        <option value="2">Medium Two</option>
      </Select>

      <Select label="Large Select" size="large" defaultValue="1">
        <option value="1">Large One</option>
        <option value="2">Large Two</option>
      </Select>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="p-4 space-y-6">
      <Select label="Outlined Variant" variant="outlined" defaultValue="1">
        <option value="1">Outlined One</option>
        <option value="2">Outlined Two</option>
      </Select>

      <Select label="Filled Variant" variant="filled" defaultValue="1">
        <option value="1">Filled One</option>
        <option value="2">Filled Two</option>
      </Select>

      <Select label="Standard Variant" variant="standard" defaultValue="1">
        <option value="1">Standard One</option>
        <option value="2">Standard Two</option>
      </Select>
    </div>
  ),
};

export const WithLongOptions: Story = {
  render: () => (
    <div className="p-4">
      <Select label="Select with Long Labels" defaultValue="">
        <option value="">Choose a country...</option>
        <option value="us">United States of America</option>
        <option value="uk">United Kingdom</option>
        <option value="au">Australia</option>
        <option value="ca">Canada</option>
        <option value="nz">New Zealand</option>
      </Select>
    </div>
  ),
};

 
