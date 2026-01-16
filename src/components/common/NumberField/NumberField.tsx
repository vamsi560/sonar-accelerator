import React, { useMemo, useId } from 'react';
import '../../../styles/tokens.css';

type NumberFieldSize = 'small' | 'medium' | 'large';
type NumberFieldVariant = 'default' | 'outlined' | 'filled';
type AriaLive = 'off' | 'polite' | 'assertive';

export interface Props {
  id?: string;
  name?: string;
  className?: string;
  type?: 'number' | 'tel';
  value?: number | string;
  defaultValue?: number | string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  title?: string;
  error?: string;
  size?: NumberFieldSize;
  variant?: NumberFieldVariant;
  autoFocus?: boolean;
  autoComplete?: string;
  activeStep?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-live'?: AriaLive;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
}

export const NumberField = ({
  id,
  name,
  className = '',
  type = 'number',
  value,
  defaultValue,
  placeholder,
  label,
  required = false,
  disabled = false,
  readOnly = false,
  min,
  max,
  step,
  title,
  error,
  size = 'medium',
  variant = 'default',
  autoFocus = false,
  autoComplete,
  activeStep,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-live': ariaLive,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
}: Props) => {
  const generatedId = useId();
  const inputId = id || name || `number-field-${generatedId}`;
  const labelId = `${inputId}-label`;
  const errorId = error ? `${inputId}-error` : undefined;
  const descriptionIds = [ariaDescribedby, errorId, title ? `${inputId}-tooltip` : undefined]
    .filter(Boolean)
    .join(' ');

  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-sm min-h-8';
      case 'large':
        return 'px-4 py-3 text-lg min-h-12';
      case 'medium':
      default:
        return 'px-3 py-2 text-base min-h-10';
    }
  }, [size]);

  const variantClasses = useMemo(() => {
    const baseClasses = 'transition-colors duration-200 rounded-lg outline-none';

    switch (variant) {
      case 'filled':
        return `${baseClasses} bg-gray-100 border border-gray-300 hover:bg-gray-50 ${
          error ? 'bg-red-50 border-red-400' : ''
        }`;
      case 'outlined':
        return `${baseClasses} bg-white border-2 border-gray-300 hover:border-gray-400 ${
          error ? 'border-red-500' : ''
        }`;
      case 'default':
      default:
        return `${baseClasses} bg-white border border-gray-300 hover:border-gray-400 ${
          error ? 'border-red-500' : ''
        }`;
    }
  }, [variant, error]);

  const disabledClasses = disabled || readOnly ? 'opacity-50 cursor-not-allowed' : 'cursor-text';

  const focusClasses = 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:border-transparent';

  const combinedInputClassName = [
    'w-full',
    'font-medium',
    'text-gray-900',
    'placeholder-gray-400',
    sizeClasses,
    variantClasses,
    disabledClasses,
    focusClasses,
    className,
    'flex items-center justify-between',
    'appearance-none',
    '[&::-webkit-outer-spin-button]:appearance-none',
    '[&::-webkit-inner-spin-button]:appearance-none',
  ]
    .filter(Boolean)
    .join(' ');

  const isInvalid = error || ariaInvalid;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          id={labelId}
          htmlFor={inputId}
          className={`text-sm font-medium ${
            isInvalid ? 'text-red-600' : 'text-gray-700'
          } ${required ? 'after:content-["*"] after:ml-1 after:text-red-500' : ''}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          min={min}
          max={max}
          step={step}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          title={title}
          className={combinedInputClassName}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-label={ariaLabel || label}
          aria-labelledby={ariaLabelledby || (label ? labelId : undefined)}
          aria-describedby={descriptionIds || undefined}
          aria-disabled={ariaDisabled || disabled}
          aria-live={ariaLive}
          aria-invalid={isInvalid ? 'true' : 'false'}
          aria-required={ariaRequired || required}
        />

        {activeStep !== undefined && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-semibold bg-blue-500 text-white px-2 py-1 rounded-full">
            {activeStep}
          </span>
        )}
      </div>

      {title && (
        <span id={`${inputId}-tooltip`} className="text-xs text-gray-500">
          {title}
        </span>
      )}

      {error && (
        <span id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}

      {min !== undefined && max !== undefined && (
        <div className="text-xs text-gray-500">
          Range: {min} - {max}
        </div>
      )}
    </div>
  );
};

export default NumberField;

