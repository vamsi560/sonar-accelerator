import React, { useState, useId, useRef, useEffect } from 'react';
import '../../../styles/tokens.css';

type MenuVariant = 'default' | 'compact' | 'minimal';
type AriaOrientation = 'horizontal' | 'vertical';
type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time';

interface MenuItemProps {
  id?: string;
  label?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
  className?: string;
}

export const MenuItem = ({ id, label, selected = false, disabled = false, onClick, children, className = '' }: MenuItemProps) => {
  const selectedClass = selected ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const combinedClassName = [
    'px-4 py-2 transition-colors duration-200 rounded',
    selectedClass,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      id={id}
      className={combinedClassName}
      role="menuitem"
      aria-selected={selected}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      tabIndex={disabled ? -1 : 0}
    >
      {children || label}
    </div>
  );
};

export interface Props {
  id?: string;
  className?: string;
  disabled?: boolean;
  title?: string;
  tabIndex?: number;
  variant?: MenuVariant;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-disabled'?: boolean;
  'aria-selected'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: AriaCurrent;
  'aria-orientation'?: AriaOrientation;
  triggerLabel?: string;
  items?: Array<{
    id?: string;
    label?: string;
    disabled?: boolean;
    onClick?: () => void;
  }>;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Menu = ({
  id,
  className = '',
  disabled = false,
  title,
  tabIndex,
  variant = 'default',
  onClick,
  onFocus,
  onBlur,
  tooltip,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-expanded': ariaExpanded,
  'aria-disabled': ariaDisabled,
  'aria-selected': ariaSelected,
  'aria-controls': ariaControls,
  'aria-current': ariaCurrent,
  'aria-orientation': ariaOrientation = 'vertical',
  triggerLabel = 'Menu',
  items = [],
  children,
  defaultOpen = false,
  onOpenChange,
}: Props) => {
  const generatedId = useId();
  const menuId = id || `menu-${generatedId}`;
  const menuButtonId = `${menuId}-trigger`;
  const menuListId = `${menuId}-list`;
  const tooltipId = tooltip ? `${menuId}-tooltip` : undefined;
  const menuRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const descriptionIds = [ariaDescribedby, tooltipId].filter(Boolean).join(' ');

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [isOpen, onOpenChange]);

  const sizeClasses = {
    default: 'py-2 px-3',
    compact: 'py-1.5 px-2 text-sm',
    minimal: 'py-1 px-2 text-xs',
  };

  const triggerClasses = `
    ${sizeClasses[variant]}
    rounded-lg border border-gray-300 bg-white font-medium
    transition-all duration-200
    hover:border-gray-400 hover:bg-gray-50
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
    ${disabled || ariaDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const menuClasses = `
    absolute top-full left-0 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg
    ${variant === 'minimal' ? 'min-w-32' : 'min-w-40'}
    z-50
  `;

  const allItems = items.length > 0 ? items : [];

  return (
    <div
      ref={menuRef}
      id={menuId}
      className={`relative inline-block ${className}`}
      title={tooltip || title}
      aria-label={ariaLabel || triggerLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={descriptionIds || undefined}
      aria-orientation={ariaOrientation}
    >
      <button
        id={menuButtonId}
        type="button"
        className={triggerClasses}
        onClick={(e) => {
          handleToggle();
          if (onClick) {
            onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        onFocus={(e) => {
          if (onFocus) {
            onFocus(e as unknown as React.FocusEvent<HTMLDivElement>);
          }
        }}
        onBlur={(e) => {
          if (onBlur) {
            onBlur(e as unknown as React.FocusEvent<HTMLDivElement>);
          }
        }}
        disabled={disabled || ariaDisabled}
        tabIndex={tabIndex ?? 0}
        aria-expanded={ariaExpanded !== undefined ? ariaExpanded : isOpen}
        aria-haspopup="menu"
        aria-controls={ariaControls || menuListId}
        aria-current={ariaCurrent}
      >
        {triggerLabel}
        <span className={`ml-2 inline-block transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div
          id={menuListId}
          className={menuClasses}
          role="menu"
          aria-disabled={ariaDisabled}
          aria-selected={ariaSelected}
        >
          {allItems.length > 0
            ? allItems.map((item, index) => (
                <MenuItem
                  key={item.id || index}
                  id={item.id}
                  label={item.label}
                  disabled={item.disabled}
                  selected={selectedIndex === index}
                  onClick={() => {
                    setSelectedIndex(index);
                    item.onClick?.();
                    setIsOpen(false);
                    onOpenChange?.(false);
                  }}
                />
              ))
            : children}
        </div>
      )}

      {tooltip && (
        <span id={tooltipId} className="sr-only">
          {tooltip}
        </span>
      )}
    </div>
  );
};



export default Menu;
