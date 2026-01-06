/**
 * Checkbox Component
 *
 * Purpose: A reusable, accessible Checkbox component using pure React, TailwindCSS, and design tokens.
 * Supports both controlled and uncontrolled modes with full ARIA accessibility.
 *
 * Props:
 * - id, name, className, value, label: Basic HTML attributes
 * - defaultChecked, checked: Control checkbox state
 * - required, disabled: Form validation states
 * - size: small | medium (controls visual size)
 * - variant: outline | filled (visual style)
 * - onChange, onClick, onFocus, onBlur: Event handlers
 * - ARIA fields: aria-label, aria-labelledby, aria-describedby, aria-hidden, aria-disabled, aria-invalid, aria-required, aria-live
 *
 * Behavior:
 * - Renders a native HTML checkbox with custom styling using Tailwind
 * - Supports both controlled and uncontrolled modes
 * - Full keyboard accessibility (Tab, Space, Enter)
 * - Custom checkmark icon with smooth animations
 * - Optional label displayed beside checkbox
 */
import React, { useState } from 'react';

export interface CheckboxProps {
  id?: string;
  name?: string;
  className?: string;
  value?: string | number;
  defaultChecked?: boolean;
  checked?: boolean;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium';
  variant?: 'outline' | 'filled';
  tabIndex?: number;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  // ARIA
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      name,
      className = '',
      value,
      defaultChecked,
      checked,
      label,
      required = false,
      disabled = false,
      size = 'medium',
      variant = 'outline',
      tabIndex,
      onClick,
      onChange,
      onFocus,
      onBlur,
      ...ariaProps
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked || false);

    // Support both controlled and uncontrolled modes
    const isChecked = checked !== undefined ? checked : uncontrolledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setUncontrolledChecked(e.target.checked);
      }
      onChange?.(e);
    };

    // Size classes
    const sizeClasses = {
      small: 'w-4 h-4',
      medium: 'w-5 h-5',
    };

    // Variant classes
    const variantClasses = {
      outline: 'border-2 border-gray-300 hover:border-gray-400',
      filled: 'border-0 bg-gray-100 hover:bg-gray-200',
    };

    const checkboxId = id || 'checkbox';

    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Hidden native checkbox for accessibility */}
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          checked={isChecked}
          disabled={disabled}
          required={required}
          tabIndex={tabIndex}
          onChange={handleChange}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          className="sr-only"
          aria-label={ariaProps['aria-label'] || label}
          aria-labelledby={ariaProps['aria-labelledby']}
          aria-describedby={ariaProps['aria-describedby']}
          aria-hidden={ariaProps['aria-hidden']}
          aria-disabled={ariaProps['aria-disabled'] ?? disabled}
          aria-live={ariaProps['aria-live']}
          aria-invalid={ariaProps['aria-invalid']}
          aria-required={ariaProps['aria-required'] ?? required}
        />

        {/* Custom checkbox display */}
        <label
          htmlFor={checkboxId}
          className={`${sizeClasses[size]} rounded transition-all cursor-pointer flex items-center justify-center ${variantClasses[variant]} ${
            isChecked ? 'bg-blue-500 border-blue-500' : variant === 'filled' ? '' : 'bg-white'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isChecked && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </label>

        {/* Label */}
        {label && (
          <label
            htmlFor={checkboxId}
            className={`select-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
