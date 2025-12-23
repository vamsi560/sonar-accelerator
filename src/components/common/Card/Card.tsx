import React from 'react';

/**
 * CardProps
 * - A reusable card component with token-driven styling (Tailwind + tokens.css)
 * - When onClick/tabIndex are present, card becomes interactive (role="button")
 * - aria-hidden should only be used for presentational cards (no interactive handlers)
 */
export interface CardProps {
  id?: string;
  className?: string;
  tabIndex?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'elevation' | 'outlined' | 'outlined-raised';
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  children?: React.ReactNode;
}

/**
 * Contract: Card renders a container with token-driven padding, radius and background.
 * - size maps to padding and min-height using tokens
 * - variant controls border/shadow
 * - When onClick or tabIndex are present, adds role="button" for accessibility
 * - aria-hidden should NOT be used with interactive handlers (onClick/tabIndex)
 */
const sizeMap: Record<NonNullable<CardProps['size']>, string> = {
  sm: 'p-[var(--padding-small)] text-[var(--font-size-small)]',
  md: 'p-[var(--padding-medium)] text-[var(--font-size-medium)]',
  lg: 'p-[var(--padding-large)] text-[var(--font-size-large)]',
};

const minHeightMap: Record<NonNullable<CardProps['size']>, string> = {
  sm: 'min-h-[var(--min-height-small)]',
  md: 'min-h-[var(--min-height-medium)]',
  lg: 'min-h-[var(--min-height-large)]',
};

const variantMap: Record<NonNullable<CardProps['variant']>, string> = {
  elevation: 'bg-[var(--color-white)] shadow-md',
  outlined: 'bg-[var(--color-white)] border border-[var(--color-divider)]',
  'outlined-raised': 'bg-[var(--color-white)] border border-[var(--color-divider)] shadow-sm',
};

const Card: React.FC<CardProps> = ({
  id,
  className = '',
  tabIndex,
  size = 'md',
  variant = 'elevation',
  onClick,
  onFocus,
  onBlur,
  tooltip,
  children,
  'aria-hidden': ariaHidden,
  ...ariaProps
}) => {
  const classes = `${sizeMap[size]} ${minHeightMap[size]} ${variantMap[variant]} ${className}`;
  
  // Determine if card is interactive (has click handler or is focusable)
  const isInteractive = Boolean(onClick || tabIndex !== undefined);
  
  // aria-hidden should not be used with interactive elements
  // Only include aria-hidden if card is NOT interactive and explicitly set
  const finalAriaHidden = isInteractive ? undefined : ariaHidden;

  return (
    <div
      id={id}
      className={classes}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? (tabIndex ?? 0) : undefined}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      title={tooltip}
      aria-hidden={finalAriaHidden}
      {...ariaProps}
    >
      {children}
    </div>
  );
};

export default Card;
