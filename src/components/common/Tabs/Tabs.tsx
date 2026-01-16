import React, { useMemo, useId } from 'react';
import '../../../styles/tokens.css';

type TabSize = 'small' | 'medium' | 'large';
type TabVariant = 'default' | 'bordered' | 'pills' | 'underlined';
type AriaLive = 'off' | 'polite' | 'assertive';

interface TabItem {
  id?: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface Props {
  id?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  size?: TabSize;
  variant?: TabVariant;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-controls'?: string;
  'aria-live'?: AriaLive;
  tabs: TabItem[];
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  fullWidth?: boolean;
}

const Tabs = ({
  id,
  className = '',
  value,
  defaultValue,
  disabled = false,
  size = 'medium',
  variant = 'default',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-live': ariaLive,
  tabs,
  onChange,
  orientation = 'horizontal',
  fullWidth = false,
}: Props) => {
  const generatedId = useId();
  const tabsId = id || `tabs-${generatedId}`;

  const [internalValue, setInternalValue] = React.useState(
    defaultValue || tabs[0]?.id || 'tab-0'
  );
  const currentValue = value !== undefined ? value : internalValue;

  const handleTabChange = (tabId: string) => {
    if (!disabled) {
      setInternalValue(tabId);
      onChange?.(tabId);
    }
  };

  const sizeClasses = useMemo(() => {
    const sizes = {
      small: 'text-sm px-3 py-2',
      medium: 'text-base px-4 py-3',
      large: 'text-lg px-5 py-4',
    };
    return sizes[size];
  }, [size]);

  const variantClasses = useMemo(() => {
    switch (variant) {
      case 'bordered':
        return 'border-b-2 border-transparent hover:border-gray-300 data-[active=true]:border-blue-500 data-[active=true]:text-blue-600';
      case 'pills':
        return 'rounded-lg mx-1 hover:bg-gray-100 data-[active=true]:bg-blue-500 data-[active=true]:text-white';
      case 'underlined':
        return 'border-b-2 border-transparent hover:border-gray-400 data-[active=true]:border-blue-600 data-[active=true]:text-blue-600';
      default:
        return 'hover:bg-gray-100 data-[active=true]:bg-gray-200 data-[active=true]:text-gray-900';
    }
  }, [variant]);

  const tabListClasses = [
    'flex',
    orientation === 'vertical' ? 'flex-col' : 'flex-row',
    'gap-1',
    variant === 'default' || variant === 'bordered' || variant === 'underlined'
      ? 'border-b border-gray-200'
      : '',
    fullWidth && orientation === 'horizontal' ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const tabButtonClasses = [
    'font-medium',
    'transition-all',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-500',
    'focus-visible:ring-offset-2',
    'cursor-pointer',
    sizeClasses,
    'whitespace-nowrap',
    'flex items-center gap-2',
  ]
    .filter(Boolean)
    .join(' ');

  const tabPanelClasses = [
    'p-4',
    'text-gray-700',
    'bg-white',
    'rounded-b-lg',
    'animation-fade-in',
  ]
    .filter(Boolean)
    .join(' ');

  const activeTab = tabs.find(
    (tab) => (tab.id || `tab-${tabs.indexOf(tab)}`) === currentValue
  );

  return (
    <div id={tabsId} className={`w-full ${disabled ? 'opacity-50' : ''}`}>
      <div
        role="tablist"
        className={tabListClasses}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-disabled={ariaDisabled || disabled}
        aria-live={ariaLive}
        aria-orientation={orientation}
      >
        {tabs.map((tab, index) => {
          const tabId = tab.id || `tab-${index}`;
          const isActive = tabId === currentValue;

          return (
            <button
              key={tabId}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tabId}`}
              tabIndex={isActive ? 0 : -1}
              disabled={disabled || tab.disabled}
              className={`${tabButtonClasses} ${variantClasses} ${
                tab.disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handleTabChange(tabId)}
              data-active={isActive}
            >
              {tab.icon && <span className="flex items-center">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab && (
        <div
          id={`panel-${currentValue}`}
          role="tabpanel"
          aria-labelledby={currentValue}
          className={tabPanelClasses}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;
