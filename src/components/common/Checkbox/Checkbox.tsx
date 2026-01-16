import React, { useState } from 'react';

interface CheckboxProps {
  id?: string;
  name?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  'aria-live'?: 'polite' | 'assertive' | 'off';
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
      defaultValue,
      label,
      required = false,
      disabled = false,
      checked,
      defaultChecked = false,
      size = 'md',
      variant = 'primary',
      onClick,
      onChange,
      onInput,
      onFocus,
      onBlur,
      tooltip,
      ...ariaProps
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const variantClasses = {
      primary: 'accent-blue-500 focus:ring-blue-200',
      success: 'accent-green-500 focus:ring-green-200',
      warning: 'accent-yellow-500 focus:ring-yellow-200',
      error: 'accent-red-500 focus:ring-red-200',
      info: 'accent-cyan-500 focus:ring-cyan-200',
    };

    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const tooltipSizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isControlled = checked !== undefined;
      if (!isControlled) {
        setIsChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const finalChecked = checked !== undefined ? checked : isChecked;

    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="flex items-center h-5 mt-1">
          <input
            ref={ref}
            id={id}
            name={name}
            type="checkbox"
            value={value || defaultValue}
            checked={finalChecked}
            required={required}
            disabled={disabled}
            onClick={onClick}
            onChange={handleChange}
            onInput={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`${sizeClasses[size]} ${variantClasses[variant]} border-gray-300 rounded cursor-pointer transition-all duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}
              focus:ring-2 focus:ring-offset-1 focus:outline-none`}
            {...ariaProps}
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          {label && (
            <label
              htmlFor={id}
              className={`font-medium text-gray-700 cursor-pointer select-none flex items-center gap-1 ${labelSizeClasses[size]} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
          )}

          {tooltip && (
            <p
              className={`text-gray-500 ${tooltipSizeClasses[size]}`}
              id={`${id}-tooltip`}
            >
              {tooltip}
            </p>
          )}
        </div>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
