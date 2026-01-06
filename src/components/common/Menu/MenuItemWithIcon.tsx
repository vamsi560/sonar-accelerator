import React, { forwardRef, useRef, useImperativeHandle } from 'react';

/**
 * MenuItemWithIconProps
 * - A reusable menu item component with icon support
 * - Renders as <li role="menuitem"> with flex layout for icon + text
 * - Icon can be placed at start or end
 * - Full accessibility support with ARIA attributes
 */
export interface MenuItemWithIconProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  selected?: boolean;
  title?: string;
  tooltip?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  badge?: React.ReactNode;
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
  sm: 'px-2 py-1 text-[var(--font-size-small)] gap-2',
  md: 'px-[var(--padding-medium)] py-2 text-[var(--font-size-medium)] gap-3',
  lg: 'px-[var(--padding-large)] py-3 text-[var(--font-size-large)] gap-4',
};

const iconSizeMap: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

/**
 * MenuItemWithIcon
 * A reusable menu item component with icon support.
 * - Renders as <li role="menuitem"> with flex layout
 * - Icon can be placed at start (default) or end
 * - Optional badge for notifications/counts
 * - Token-driven styling with Tailwind
 * - Full accessibility support
 */
const MenuItemWithIcon = forwardRef<HTMLLIElement, MenuItemWithIconProps>((props, ref) => {
  const {
    id,
    className = '',
    disabled = false,
    selected = false,
    title,
    tooltip,
    size = 'md',
    icon,
    iconPosition = 'start',
    badge,
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
  const iconSize = iconSizeMap[size] ?? iconSizeMap.md;
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  const selectedClass = selected ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]' : '';
  const hoverClass = !disabled ? 'hover:bg-gray-100 transition-colors' : '';
  const flexDirection = iconPosition === 'end' ? 'flex-row-reverse' : 'flex-row';

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
      className={`flex items-center ${flexDirection} ${sizeClass} ${disabledClass} ${selectedClass} ${hoverClass} rounded text-[var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${className}`}
    >
      {icon && (
        <span className={`inline-flex flex-shrink-0 ${iconSize} text-[var(--color-primary)]`}>
          {icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {badge && (
        <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold bg-[var(--color-error)] text-white rounded-full">
          {badge}
        </span>
      )}
    </li>
  );
});

MenuItemWithIcon.displayName = 'MenuItemWithIcon';

export default MenuItemWithIcon;
