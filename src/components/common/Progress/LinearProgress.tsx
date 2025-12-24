/**
 * LinearProgress Component
 *
 * A linear (horizontal) progress bar component that displays progress as a filled bar.
 * Supports determinate (with value), indeterminate (animated), buffer, and query variants.
 * Uses design tokens from tokens.css for consistent color theming and sizing.
 *
 * Props:
 * - id: Unique identifier for the component
 * - className: Additional CSS classes for custom styling
 * - value: Progress value (0-100) for determinate variant
 * - min: Minimum value for the progress range (default: 0)
 * - title: Tooltip or title text displayed on hover
 * - size: Height of the progress bar - 'small' (4px), 'medium' (8px), 'large' (12px)
 * - variant: 'determinate' | 'indeterminate' | 'buffer' | 'query' - determines animation type
 * - aria-label: Accessibility label for screen readers
 * - aria-labelledby: ID of element that labels this component
 * - color: Color variant using design tokens
 */

import React from 'react';

export interface LinearProgressProps {
  /**
   * Unique identifier for the component
   */
  id?: string;

  /**
   * Progress value (0-100) for determinate variant
   */
  value?: number;

  /**
   * Progress variant type
   */
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';

  /**
   * Color variant using design tokens
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';

  /**
   * Additional CSS classes for custom styling
   */
  className?: string;

  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;

  /**
   * Current progress value for accessibility
   */
  'aria-valuenow'?: number;

  /**
   * Text description of current progress for accessibility
   */
  'aria-valuetext'?: string;

  /**
   * Height of the progress bar - 'small' (4px), 'medium' (8px), 'large' (12px)
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;

  /**
   * ID of element that labels this component
   */
  'aria-labelledby'?: string;
}

/**
 * Color map using CSS custom properties from tokens.css
 * Maps component color prop values to Tailwind background utility classes
 */
const colorMap: Record<string, string> = {
  primary: 'bg-[var(--color-primary)]',
  secondary: 'bg-[var(--color-secondary)]',
  error: 'bg-[var(--color-error)]',
  info: 'bg-[var(--color-info)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  inherit: 'bg-inherit',
};

/**
 * Animation map for progress variants
 * Maps variant types to their corresponding animation classes
 */
const animationMap: Record<string, string> = {
  indeterminate: 'animate-pulse',
  buffer: 'animate-pulse',
  query: 'animate-bounce',
  determinate: '',
};

/**
 * Size map for responsive sizing
 * Maps size prop values to height classes for consistent scaling
 */
const sizeMap: Record<string, string> = {
  small: 'h-1',
  medium: 'h-2',
  large: 'h-3',
};

/**
 * LinearProgress Component
 *
 * Renders a horizontal progress bar with support for multiple variants including
 * determinate (fixed progress value), indeterminate (animated loading),
 * buffer, and query states. Integrates with design tokens for colors and sizing.
 *
 * @component
 * @example
 * // Determinate progress (60%)
 * <LinearProgress value={60} variant="determinate" color="primary" />
 *
 * @example
 * // Indeterminate loading state
 * <LinearProgress variant="indeterminate" size="medium" />
 *
 * @param props - LinearProgressProps
 * @returns JSX.Element
 */
const LinearProgress: React.FC<LinearProgressProps> = ({
  id,
  value = 0,
  variant = 'indeterminate',
  color = 'primary',
  className,
  style,
  size = 'medium',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-valuenow': ariaValueNow,
  'aria-valuetext': ariaValueText,
}) => {
  // Calculate percentage for determinate variant (0-100)
  const percent = Math.min(Math.max(value, 0), 100);

  // Resolve height class from size prop
  const heightClass = sizeMap[size] || 'h-2';

  // Determine animation class based on variant
  const animationClass = animationMap[variant] || '';

  return (
    <div className={`w-full ${className || ''}`}>
      {variant === 'determinate' ? (
        <progress
          id={id}
          value={percent}
          max={100}
          className={`w-full ${heightClass} ${className || ''}`}
          style={style}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-valuetext={ariaValueText}
        />
      ) : (
        <div
          id={id}
          className={`w-full ${heightClass} bg-[var(--color-secondary-light)] rounded overflow-hidden ${className || ''}`}
          style={style}
          role="progressbar"
          aria-valuenow={ariaValueNow}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={ariaValueText}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
        >
          {/* Progress bar using color token */}
          <div
            className={`${colorMap[color]} ${heightClass} transition-all duration-300 ${animationClass}`}
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default LinearProgress;
