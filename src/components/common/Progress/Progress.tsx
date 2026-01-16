import React from 'react';

interface ProgressProps {
  id?: string;
  className?: string;
  value: number;
  min?: number;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  type?: 'linear' | 'circular';
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      id,
      className = '',
      value,
      min = 0,
      title,
      size = 'md',
      variant = 'primary',
      type = 'linear',
      ...ariaProps
    },
    ref,
  ) => {
    // Ensure value is within valid range
    const normalizedValue = Math.max(min, Math.min(value, 100));
    const percentage = Math.round(normalizedValue);

    const sizeClasses = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-4',
    };

    const variantClasses = {
      primary: 'bg-blue-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
      info: 'bg-cyan-500',
    };

    const circleVariantClasses = {
      primary: 'text-blue-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      error: 'text-red-500',
      info: 'text-cyan-500',
    };

    const textSizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const getTitleDisplay = () => {
      const percentText = `${percentage}%`;
      if (title) {
        return `${title} - ${percentText}`;
      }
      return percentText;
    };

    const circleSizes = {
      sm: { size: 60, strokeWidth: 4 },
      md: { size: 80, strokeWidth: 5 },
      lg: { size: 120, strokeWidth: 6 },
    };

    const circleSize = circleSizes[size];
    const radius = (circleSize.size - circleSize.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const circleCenter = circleSize.size / 2;

    const progressCircleSVG = (
      <svg
        width={circleSize.size}
        height={circleSize.size}
        className="transform -rotate-90"
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle
          cx={circleCenter}
          cy={circleCenter}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={circleSize.strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={circleCenter}
          cy={circleCenter}
          r={radius}
          stroke="currentColor"
          strokeWidth={circleSize.strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-500 ease-out ${circleVariantClasses[variant]}`}
        />
      </svg>
    );

    const isCircular = type === 'circular';

    // Circular Progress
    if (isCircular) {
      return (
        <div
          ref={ref}
          id={id}
          className={`flex flex-col items-center justify-center ${className}`}
          role="progressbar"
          aria-valuemin={min}
          aria-valuemax={100}
          aria-valuenow={percentage}
          aria-valuetext={getTitleDisplay()}
          {...ariaProps}
        >
          {/* Title */}
          {title && (
            <div className={`mb-4 font-medium text-gray-700 ${textSizeClasses[size]}`}>
              {title}
            </div>
          )}

          {/* SVG Circle */}
          <div className="relative inline-flex items-center justify-center">
            {progressCircleSVG}

            {/* Center text */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`font-bold ${circleVariantClasses[variant]} ${textSizeClasses[size]}`}>
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }

    // Linear Progress (default)
    return (
      <div
        ref={ref}
        id={id}
        className={`w-full ${className}`}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-valuetext={getTitleDisplay()}
        {...ariaProps}
      >
        {/* Title and percentage */}
        {title && (
          <div className="flex items-center justify-between mb-2">
            <label className={`font-medium text-gray-700 ${textSizeClasses[size]}`}>
              {title}
            </label>
            <span className={`font-semibold text-gray-600 ${textSizeClasses[size]}`}>
              {percentage}%
            </span>
          </div>
        )}

        {/* Progress bar container */}
        <div
          className={`w-full ${sizeClasses[size]} bg-gray-200 rounded-full overflow-hidden transition-all duration-300`}
        >
          {/* Progress fill */}
          <div
            className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
            aria-hidden="true"
          />
        </div>

        {/* Percentage text below bar (optional) */}
        {title === undefined && (
          <div className={`mt-1 text-right font-medium text-gray-600 ${textSizeClasses[size]}`}>
            {percentage}%
          </div>
        )}
      </div>
    );
  },
);

Progress.displayName = 'Progress';

export default Progress;
