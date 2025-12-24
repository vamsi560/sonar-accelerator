/**
 * CircularProgress Component
 *
 * A circular progress indicator component that displays progress as a rotating circle.
 * Supports both determinate (with value) and indeterminate (animated) variants.
 * Uses design tokens from tokens.css for consistent styling across the application.
 *
 * Props:
 * - id: Unique identifier for the component
 * - className: Additional CSS classes for custom styling
 * - value: Progress value (0-100) for determinate variant
 * - min: Minimum value for the progress range (default: 0)
 * - step: Step increment for progress changes
 * - title: Tooltip or title text displayed on hover
 * - size: Size of the circular progress in pixels (small: 24, medium: 40, large: 56)
 * - variant: 'determinate' | 'indeterminate' - determines animation type
 * - aria-label: Accessibility label for screen readers
 * - aria-labelledby: ID of element that labels this component
 */

import React from 'react';

export interface CircularProgressProps {
  /**
   * Unique identifier for the component
   */
  id?: string;

  /**
   * Additional CSS classes for custom styling
   */
  className?: string;

  /**
   * Progress value (0-100) for determinate variant
   */
  value?: number;

  /**
   * Current progress value for accessibility
   */
  'aria-valuenow'?: number;

  /**
   * Text description of current progress for accessibility
   */
  'aria-valuetext'?: string;

  /**
   * Size of the circular progress - 'small' (24px), 'medium' (40px), 'large' (56px)
   */
  size?: 'small' | 'medium' | 'large' | number;

  /**
   * Progress variant: 'determinate' shows actual value, 'indeterminate' shows animated loading
   */
  variant?: 'determinate' | 'indeterminate';

  /**
   * Color variant using design tokens
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';

  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;

  /**
   * ID of element that labels this component
   */
  'aria-labelledby'?: string;

  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;

  /**
   * Stroke thickness (in pixels)
   */
  thickness?: number;
}

/**
 * Color map using CSS custom properties from tokens.css
 * Maps component color prop values to Tailwind stroke utility classes
 */
const colorMap: Record<string, string> = {
  primary: 'stroke-[var(--color-primary)]',
  secondary: 'stroke-[var(--color-secondary)]',
  error: 'stroke-[var(--color-error)]',
  info: 'stroke-[var(--color-info)]',
  success: 'stroke-[var(--color-success)]',
  warning: 'stroke-[var(--color-warning)]',
  inherit: 'stroke-inherit',
};

/**
 * Size map for responsive sizing using design token sizing
 * Maps size prop values to pixel values for consistent scaling
 */
const sizeMap: Record<string, number> = {
  small: 24,
  medium: 40,
  large: 56,
};

/**
 * CircularProgress Component
 *
 * Renders a circular progress indicator that can display both determinate progress
 * and indeterminate (loading) states. Uses SVG for sharp rendering and supports
 * accessibility attributes for screen readers.
 *
 * @component
 * @example
 * // Determinate progress (50%)
 * <CircularProgress value={50} variant="determinate" size="medium" />
 *
 * @example
 * // Indeterminate loading state
 * <CircularProgress variant="indeterminate" size="large" />
 *
 * @param props - CircularProgressProps
 * @returns JSX.Element
 */
const CircularProgress: React.FC<CircularProgressProps> = ({
  id,
  value = 0,
  size = 'medium',
  variant = 'indeterminate',
  color = 'primary',
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-valuenow': ariaValueNow,
  'aria-valuetext': ariaValueText,
  style,
  thickness = 4,
}) => {
  // Resolve size to numeric value
  const numericSize = typeof size === 'number' ? size : sizeMap[size] || 40;
  const radius = (numericSize - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke dash offset based on variant and value
  const offset =
    variant === 'determinate'
      ? circumference - (value / 100) * circumference
      : circumference * 0.7;

  return (
    <div className="inline-flex">
      {variant === 'determinate' ? (
        <progress
          id={id}
          value={value}
          max={100}
          className={className}
          style={style}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-valuetext={ariaValueText}
        />
      ) : (
        <svg
          id={id}
          width={numericSize}
          height={numericSize}
          className={className}
          style={style}
          role="progressbar"
          aria-valuenow={ariaValueNow}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={ariaValueText}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          viewBox={`0 0 ${numericSize} ${numericSize}`}
        >
          {/* Background circle using secondary-light token */}
          <circle
            cx={numericSize / 2}
            cy={numericSize / 2}
            r={radius}
            fill="none"
            stroke="var(--color-secondary-light)"
            strokeWidth={thickness}
          />

          {/* Progress circle with color token and animation */}
          <circle
            cx={numericSize / 2}
            cy={numericSize / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness}
            className={`${colorMap[color]} ${variant === 'indeterminate' ? 'animate-spin' : ''}`}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
};

export default CircularProgress;
