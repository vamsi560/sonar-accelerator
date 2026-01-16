import React, { useMemo, useId } from 'react';
import '../../../styles/tokens.css';

type RadioSize = 'small' | 'medium' | 'large';
type AriaLive = 'off' | 'polite' | 'assertive';
type AriaOrientation = 'horizontal' | 'vertical';

interface RadioOptionProps {
  id?: string;
  value: string | number;
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: RadioSize;
  checked?: boolean;
}

export const RadioOption = ({
  id,
  value,
  label,
  disabled = false,
  className = '',
  size = 'medium',
  checked = false,
}: RadioOptionProps) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };

  const labelSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <div className={`flex items-center gap-2 ${disabled ? 'opacity-50' : ''} ${className}`}>
      <input
        type="radio"
        id={id}
        value={value}
        disabled={disabled}
        checked={checked}
        className={`${sizeClasses[size]} rounded-full border-2 border-gray-300 cursor-pointer accent-blue-600 disabled:cursor-not-allowed`}
        aria-disabled={disabled}
      />
      {label && (
        <label
          htmlFor={id}
          className={`${labelSizeClasses[size]} font-medium text-gray-700 cursor-pointer ${
            disabled ? 'cursor-not-allowed' : ''
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export interface Props {
  id?: string;
  name?: string;
  className?: string;
  value?: string | number;
  defaultValue?: string | number;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  title?: string;
  error?: string;
  size?: RadioSize;
  autoComplete?: string;
  onChange?: (value: string | number) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  'aria-checked'?: boolean;
  'aria-live'?: AriaLive;
  'aria-required'?: boolean;
  'aria-orientation'?: AriaOrientation;
  options?: Array<{
    id?: string;
    value: string | number;
    label?: string;
    disabled?: boolean;
  }>;
  children?: React.ReactNode;
}

export const Radiogroup = ({
  id,
  name,
  className = '',
  value,
  defaultValue,
  label,
  required = false,
  disabled = false,
  readOnly = false,
  title,
  error,
  autoComplete,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-hidden': ariaHidden,
  'aria-disabled': ariaDisabled,
  'aria-checked': ariaChecked,
  'aria-live': ariaLive,
  'aria-required': ariaRequired,
  'aria-orientation': ariaOrientation = 'vertical',
  options = [],
  children,
}: Props) => {
  const generatedId = useId();
  const groupId = id || `radiogroup-${generatedId}`;
  const labelId = label ? `${groupId}-label` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;
  const titleId = title ? `${groupId}-title` : undefined;

  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: string | number) => {
    if (!readOnly) {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const descriptionIds = useMemo(() => {
    return [ariaLabelledby, errorId, titleId].filter(Boolean).join(' ');
  }, [ariaLabelledby, errorId, titleId]);

  const orientationClass = ariaOrientation === 'horizontal' ? 'flex-row' : 'flex-col';

  const containerClasses = [
    'flex',
    orientationClass,
    'gap-3',
    'w-full',
    disabled || ariaDisabled ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`flex flex-col gap-3 ${disabled || ariaDisabled ? 'opacity-50' : ''}`}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {label && (
        <label
          id={labelId}
          className={`text-sm font-medium ${
            error ? 'text-red-600' : 'text-gray-700'
          } ${required ? 'after:content-["*"] after:ml-1 after:text-red-500' : ''}`}
        >
          {label}
        </label>
      )}

      <fieldset
        id={groupId}
        className={containerClasses}
        disabled={disabled || ariaDisabled}
        aria-label={ariaLabel}
        aria-labelledby={labelId || ariaLabelledby}
        aria-describedby={descriptionIds || undefined}
        aria-disabled={ariaDisabled || disabled}
        aria-checked={ariaChecked}
        aria-live={ariaLive}
        aria-required={ariaRequired || required}
        aria-orientation={ariaOrientation}
        aria-hidden={ariaHidden}
      >
        {options.length > 0
          ? options.map((option, index) => (
              <div key={option.id || index} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={option.id || `${groupId}-option-${index}`}
                  name={name}
                  value={option.value}
                  checked={currentValue === option.value}
                  disabled={disabled || option.disabled || ariaDisabled}
                  readOnly={readOnly}
                  onChange={(e) => handleChange(e.target.value as string | number)}
                  autoComplete={autoComplete}
                  className={`w-5 h-5 rounded-full border-2 border-gray-300 cursor-pointer accent-blue-600 disabled:cursor-not-allowed`}
                  aria-label={option.label}
                  aria-disabled={disabled || option.disabled || ariaDisabled}
                />
                {option.label && (
                  <label
                    htmlFor={option.id || `${groupId}-option-${index}`}
                    className={`text-base font-medium text-gray-700 cursor-pointer ${
                      disabled || option.disabled || ariaDisabled ? 'cursor-not-allowed' : ''
                    }`}
                  >
                    {option.label}
                  </label>
                )}
              </div>
            ))
          : children}
      </fieldset>

      {title && (
        <span id={titleId} className="text-xs text-gray-500">
          {title}
        </span>
      )}

      {error && (
        <span id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Radiogroup;
