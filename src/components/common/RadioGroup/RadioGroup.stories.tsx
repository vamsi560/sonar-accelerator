import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import RadioGroup from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Common/RadioGroup',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <RadioGroup label="Choose one:">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="demo" value="1" defaultChecked />
          <span>Option 1</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="demo" value="2" />
          <span>Option 2</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="demo" value="3" />
          <span>Option 3</span>
        </label>
      </RadioGroup>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState('2');
      return (
        <div className="p-4">
          <RadioGroup label="Controlled Group:">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="controlled"
                value="1"
                checked={selected === '1'}
                onChange={(e) => setSelected(e.target.value)}
              />
              <span>Red</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="controlled"
                value="2"
                checked={selected === '2'}
                onChange={(e) => setSelected(e.target.value)}
              />
              <span>Green</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="controlled"
                value="3"
                checked={selected === '3'}
                onChange={(e) => setSelected(e.target.value)}
              />
              <span>Blue</span>
            </label>
          </RadioGroup>
          <p className="mt-4 text-sm">Selected: {selected}</p>
        </div>
      );
    };
    return <Demo />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="p-4">
      <RadioGroup label="Disabled Group:" disabled>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="disabled-demo" value="1" defaultChecked disabled />
          <span>Disabled 1</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="disabled-demo" value="2" disabled />
          <span>Disabled 2</span>
        </label>
      </RadioGroup>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="p-4">
      <RadioGroup label="With Error:" error>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="error-demo" value="1" />
          <span>Option 1</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="error-demo" value="2" />
          <span>Option 2</span>
        </label>
      </RadioGroup>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="p-4">
      <RadioGroup label="Required:" required>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="required-demo" value="1" />
          <span>Yes</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="required-demo" value="2" />
          <span>No</span>
        </label>
      </RadioGroup>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-4 border-b">
        <RadioGroup label="Small:" size="small">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="size-small" value="1" defaultChecked />
            <span>Small 1</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="size-small" value="2" />
            <span>Small 2</span>
          </label>
        </RadioGroup>
      </div>

      <div className="p-4 border-b">
        <RadioGroup label="Medium:" size="medium">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="size-medium" value="1" defaultChecked />
            <span>Medium 1</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="size-medium" value="2" />
            <span>Medium 2</span>
          </label>
        </RadioGroup>
      </div>

      <div className="p-4">
        <RadioGroup label="Large:" size="large">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="size-large" value="1" defaultChecked />
            <span>Large 1</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="size-large" value="2" />
            <span>Large 2</span>
          </label>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="p-4">
      <RadioGroup label="Horizontal:" aria-orientation="horizontal">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="horizontal" value="1" defaultChecked />
          <span>Left</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="horizontal" value="2" />
          <span>Center</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="horizontal" value="3" />
          <span>Right</span>
        </label>
      </RadioGroup>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="p-4">
      <RadioGroup label="Vertical:" aria-orientation="vertical" className="flex-col">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="vertical" value="1" defaultChecked />
          <span>Top</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="vertical" value="2" />
          <span>Middle</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="vertical" value="3" />
          <span>Bottom</span>
        </label>
      </RadioGroup>
    </div>
  ),
};
