/**
 * Tabs Component Examples
 * Demonstrates all tab variants: basic, scrollable, centered, full-width, vertical, icon, badge, disabled
 */
import  { useState } from 'react';
import { Tabs, Tab, TabPanel } from './Tabs';

// ============================================================================
// Basic Tabs Example
// ============================================================================
export const BasicTabsExample = () => {
  const [value, setValue] = useState<string | number>(0);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Basic Tabs</h3>
      <Tabs value={value} onChange={setValue} variant="basic">
        <Tab value={0} label="Tab 1" />
        <Tab value={1} label="Tab 2" />
        <Tab value={2} label="Tab 3" />
      </Tabs>

      <TabPanel value={0}>Content for Tab 1</TabPanel>
      <TabPanel value={1}>Content for Tab 2</TabPanel>
      <TabPanel value={2}>Content for Tab 3</TabPanel>
    </div>
  );
};

// ============================================================================
// Scrollable Tabs Example
// ============================================================================
export const ScrollableTabsExample = () => {
  const [value, setValue] = useState<string | number>(0);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Scrollable Tabs</h3>
      <Tabs value={value} onChange={setValue} variant="scrollable">
        <Tab value={0} label="Tab 1" />
        <Tab value={1} label="Tab 2" />
        <Tab value={2} label="Tab 3" />
        <Tab value={3} label="Tab 4" />
        <Tab value={4} label="Tab 5" />
        <Tab value={5} label="Tab 6" />
      </Tabs>

      <TabPanel value={0}>Content for Tab 1</TabPanel>
      <TabPanel value={1}>Content for Tab 2</TabPanel>
      <TabPanel value={2}>Content for Tab 3</TabPanel>
      <TabPanel value={3}>Content for Tab 4</TabPanel>
      <TabPanel value={4}>Content for Tab 5</TabPanel>
      <TabPanel value={5}>Content for Tab 6</TabPanel>
    </div>
  );
};

// ============================================================================
// Centered Tabs Example
// ============================================================================
export const CenteredTabsExample = () => {
  const [value, setValue] = useState<string | number>(0);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Centered Tabs</h3>
      <Tabs value={value} onChange={setValue} variant="centered">
        <Tab value={0} label="Tab 1" />
        <Tab value={1} label="Tab 2" />
        <Tab value={2} label="Tab 3" />
      </Tabs>

      <TabPanel value={0}>Content for Tab 1</TabPanel>
      <TabPanel value={1}>Content for Tab 2</TabPanel>
      <TabPanel value={2}>Content for Tab 3</TabPanel>
    </div>
  );
};

// ============================================================================
// Full-Width Tabs Example
// ============================================================================
export const FullWidthTabsExample = () => {
  const [value, setValue] = useState<string | number>(0);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Full-Width Tabs</h3>
      <Tabs value={value} onChange={setValue} variant="full-width">
        <Tab value={0} label="Tab 1" />
        <Tab value={1} label="Tab 2" />
        <Tab value={2} label="Tab 3" />
      </Tabs>

      <TabPanel value={0}>Content for Tab 1</TabPanel>
      <TabPanel value={1}>Content for Tab 2</TabPanel>
      <TabPanel value={2}>Content for Tab 3</TabPanel>
    </div>
  );
};

// ============================================================================
// Vertical Tabs Example
// ============================================================================
export const VerticalTabsExample = () => {
  const [value, setValue] = useState<string | number>(0);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Vertical Tabs</h3>
      <div className="flex gap-4">
        <Tabs value={value} onChange={setValue} variant="vertical" className="w-32">
          <Tab value={0} label="Tab 1" />
          <Tab value={1} label="Tab 2" />
          <Tab value={2} label="Tab 3" />
        </Tabs>

        <div className="flex-1">
          <TabPanel value={0}>Content for Tab 1</TabPanel>
          <TabPanel value={1}>Content for Tab 2</TabPanel>
          <TabPanel value={2}>Content for Tab 3</TabPanel>
        </div>
      </div>
    </div>
  );
};

// Icon Components (defined outside to avoid recreating during render)
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const FavsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l1.72-1.35c.15-.12.19-.34.1-.51l-1.64-2.84c-.1-.17-.33-.24-.51-.17l-2.03.81c-.42-.32-.9-.6-1.42-.82l-.31-2.15c-.05-.2-.23-.34-.44-.34h-3.28c-.2 0-.39.14-.43.34l-.31 2.15c-.52.23-1 .5-1.42.82l-2.03-.81c-.17-.07-.41 0-.51.17L2.3 8.64c-.1.17-.05.39.1.51l1.72 1.35c-.05.3-.07.62-.07.94s.02.64.07.94l-1.72 1.35c-.15.12-.19.34-.1.51l1.64 2.84c.1.17.33.24.51.17l2.03-.81c.42.32.9.6 1.42.82l.31 2.15c.05.2.23.34.43.34h3.28c.2 0 .39-.14.43-.34l.31-2.15c.52-.23 1-.5 1.42-.82l2.03.81c.17.07.41 0 .51-.17l1.64-2.84c.1-.17.05-.39-.1-.51l-1.72-1.35zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

// ============================================================================
// Icon Tabs Example
// ============================================================================
export const IconTabsExample = () => {
  const [value, setValue] = useState<string | number>(0);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Icon Tabs</h3>
      <Tabs value={value} onChange={setValue} variant="basic">
        <Tab value={0} icon={<HomeIcon />} label="Home" />
        <Tab value={1} icon={<FavsIcon />} label="Favorites" />
        <Tab value={2} icon={<SettingsIcon />} label="Settings" />
      </Tabs>

      <TabPanel value={0}>Home content</TabPanel>
      <TabPanel value={1}>Favorites content</TabPanel>
      <TabPanel value={2}>Settings content</TabPanel>
    </div>
  );
};
// Badge Tabs Example
export const BadgeTabsExample = () => {
  const [value, setValue] = useState<string | number>(0);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Tabs with Badges</h3>
      <Tabs value={value} onChange={setValue} variant="basic">
        <Tab value={0} label="Inbox" badge={5} />
        <Tab value={1} label="Starred" badge={2} />
        <Tab value={2} label="Sent" badge={0} />
      </Tabs>

      <TabPanel value={0}>Inbox content</TabPanel>
      <TabPanel value={1}>Starred content</TabPanel>
      <TabPanel value={2}>Sent content</TabPanel>
    </div>
  );
};

// ============================================================================
// Disabled Tabs Example
// ============================================================================
export const DisabledTabsExample = () => {
  const [value, setValue] = useState<string | number>(0);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Disabled Tabs</h3>
      <Tabs value={value} onChange={setValue} variant="basic">
        <Tab value={0} label="Tab 1" />
        <Tab value={1} label="Tab 2 (Disabled)" disabled />
        <Tab value={2} label="Tab 3" />
      </Tabs>

      <TabPanel value={0}>Content for Tab 1</TabPanel>
      <TabPanel value={1}>Content for Tab 2</TabPanel>
      <TabPanel value={2}>Content for Tab 3</TabPanel>
    </div>
  );
};

// ============================================================================
// Sizes Example
// ============================================================================
export const SizesExample = () => {
  const [value, setValue] = useState<{ [key: string]: string | number }>({
    small: 0,
    medium: 0,
    large: 0,
  });

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Tabs</h3>
        <Tabs value={value.small} onChange={(v) => setValue({ ...value, small: v })} variant="basic" size="small">
          <Tab value={0} label="Tab 1" />
          <Tab value={1} label="Tab 2" />
          <Tab value={2} label="Tab 3" />
        </Tabs>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Tabs (Default)</h3>
        <Tabs value={value.medium} onChange={(v) => setValue({ ...value, medium: v })} variant="basic" size="medium">
          <Tab value={0} label="Tab 1" />
          <Tab value={1} label="Tab 2" />
          <Tab value={2} label="Tab 3" />
        </Tabs>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Large Tabs</h3>
        <Tabs value={value.large} onChange={(v) => setValue({ ...value, large: v })} variant="basic" size="large">
          <Tab value={0} label="Tab 1" />
          <Tab value={1} label="Tab 2" />
          <Tab value={2} label="Tab 3" />
        </Tabs>
      </div>
    </div>
  );
};

// ============================================================================
// Complete Demo Component
// ============================================================================
export const TabsDemoAll = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 space-y-8">
      <BasicTabsExample />
      <ScrollableTabsExample />
      <CenteredTabsExample />
      <FullWidthTabsExample />
      <VerticalTabsExample />
      <IconTabsExample />
      <BadgeTabsExample />
      <DisabledTabsExample />
      <SizesExample />
    </div>
  );
};
