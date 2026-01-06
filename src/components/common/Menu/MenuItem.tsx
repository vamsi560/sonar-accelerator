import React, { forwardRef, useRef, useImperativeHandle } from 'react';

/**
 * MenuItemProps
 * - A reusable menu item component for use within MenuContainer
 * - Renders as <li role="menuitem">
 * - Supports text-based menu items without icons
 * - Full accessibility support with ARIA attributes
 */
export interface MenuItemProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  selected?: boolean;
  title?: string;
  tooltip?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLLIElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLLIElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-selected'?: boolean;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
  children?: React.ReactNode;
}

const sizeMap: Record<string, string> = {
  sm: 'px-[var(--padding-small)] py-1 text-[var(--font-size-small)]',
  md: 'px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)]',
  lg: 'px-[var(--padding-large)] py-3 text-[var(--font-size-large)]',
};

/**
 * MenuItem
 * A reusable menu item component for text-based menu items.
 * - Renders as <li role="menuitem">
 * - Token-driven styling with Tailwind
 * - Supports hover, focus, disabled, and selected states
 * - Full accessibility support with ARIA attributes
 */
const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  const {
    id,
    className = '',
    disabled = false,
    selected = false,
    title,
    tooltip,
    size = 'md',
    onClick,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-disabled': ariaDisabled,
    'aria-selected': ariaSelected,
    'aria-current': ariaCurrent,
    children,
  } = props;

  const innerRef = useRef<HTMLLIElement | null>(null);
  useImperativeHandle<HTMLLIElement | null, HTMLLIElement | null>(ref, () => innerRef.current);

  const sizeClass = sizeMap[size] ?? sizeMap.md;
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  const selectedClass = selected ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]' : '';
  const hoverClass = !disabled ? 'hover:bg-gray-100 transition-colors' : '';

  return (
    <li
      ref={innerRef}
      id={id}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      title={tooltip ?? title}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-disabled={ariaDisabled ?? disabled}
      aria-selected={ariaSelected ?? selected}
      aria-current={ariaCurrent}
      className={`${sizeClass} ${disabledClass} ${selectedClass} ${hoverClass} rounded text-[var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${className}`}
    >
      {children}
    </li>
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
