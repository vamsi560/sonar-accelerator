import React, { useCallback } from 'react';

export type Size = 'small' | 'medium' | 'large';
export type Variant = 'contained' | 'outlined' | 'text';

export interface PaginationProps {
  id?: string;
  className?: string;
  value?: number | string;
  disabled?: boolean;
  selected?: boolean;
  title?: string;
  tabIndex?: number;
  size?: Size;
  variant?: Variant;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;

  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-selected'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: 'page' | 'step' | 'true' | 'false';
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

const sizeClasses = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-3 py-1.5 text-base',
  large: 'px-4 py-2 text-lg',
};

const Pagination: React.FC<PaginationProps> = ({
  value,
  disabled = false,
  selected = false,
  size = 'medium',
  variant = 'outlined',
  className = '',
  onClick,
  ...aria
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) onClick?.(e);
    },
    [disabled, onClick]
  );

  const variantClasses =
    variant === 'contained'
      ? selected
        ? 'bg-[var(--color-primary)] text-white'
        : 'bg-white border'
      : variant === 'outlined'
      ? selected
        ? 'border-2 border-[var(--color-primary)] text-[var(--color-primary)]'
        : 'border border-gray-300'
      : selected
      ? 'text-[var(--color-primary)] font-semibold'
      : 'text-gray-700';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`rounded-md ${sizeClasses[size]} ${variantClasses} ${className}`}
      aria-selected={selected}
      aria-current={selected ? 'page' : undefined}
      {...aria}
    >
      {value}
    </button>
  );
};

export default Pagination;
