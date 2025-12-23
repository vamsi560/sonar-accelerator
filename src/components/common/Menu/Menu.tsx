import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';

/* =========================
   PROPS
========================= */

export interface MenuProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  tabIndex?: number;

  /* Styling */
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'full';

  /* Events */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;

  /* Accessibility */
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-disabled'?: boolean;
  'aria-selected'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
  'aria-orientation'?: 'horizontal' | 'vertical';

  children?: React.ReactNode;
}

/* =========================
   STYLE MAPS (DYNAMIC)
========================= */

const baseClass =
  'focus:outline-none transition-colors duration-200';

const sizeMap: Record<NonNullable<MenuProps['size']>, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const roundedMap: Record<NonNullable<MenuProps['rounded']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  full: 'rounded-full',
};

const variantMap: Record<NonNullable<MenuProps['variant']>, string> = {
  default: 'bg-transparent text-black',
  primary:
    'bg-white text-black border border-gray-300 hover:bg-gray-100',
  secondary:
    'bg-blue-600 text-white hover:bg-blue-700',
  danger:
    'bg-red-600 text-white hover:bg-red-700',
  link:
    'bg-transparent text-blue-600 underline hover:text-blue-800',
};

const enabledClass =
  'cursor-pointer focus:ring-2 focus:ring-blue-500';

const disabledClass =
  'opacity-50 cursor-not-allowed pointer-events-none';

/* =========================
   COMPONENT
========================= */

const Menu = forwardRef<HTMLButtonElement, MenuProps>(
  (props, ref) => {
    const {
      id,
      className = '',
      disabled = false,
      tabIndex = 0,

      variant = 'default',
      size = 'md',
      rounded = 'md',

      onClick,
      onFocus,
      onBlur,
      tooltip,

      children,
      ...ariaProps
    } = props;

    const innerRef = useRef<HTMLButtonElement | null>(null);
useImperativeHandle(ref, () => innerRef.current!, []);
 
    const classes = [
      baseClass,
      sizeMap[size],
      roundedMap[rounded],
      variantMap[variant],
      disabled ? disabledClass : enabledClass,
      className,
    ].join(' ');

    return (
      <button
        ref={innerRef}
        id={id}
        type="button"
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
        title={tooltip}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        className={classes}
        aria-disabled={ariaProps['aria-disabled'] ?? disabled}
        {...ariaProps}
      >
        {children}
      </button>
    );
  }
);

Menu.displayName = 'Menu';

export default Menu;
