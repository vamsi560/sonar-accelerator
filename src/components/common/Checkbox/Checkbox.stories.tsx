import { useState } from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Common/Checkbox',
  component: Checkbox,
};

export const Default = () => {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onChange={() => setChecked(!checked)} label="Default" />;
};

export const Checked = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Checkbox
      checked={checked}
      onChange={() => setChecked(!checked)}
      label="Checked"
    />
  );
};



export const Sizes = () => (
  <div className="space-x-4">
    <Checkbox size="small" label="Small" />
    <Checkbox size="medium" label="Medium" />
  </div>
);

export const Disabled = () => (
  <Checkbox disabled label="Disabled" />
);
