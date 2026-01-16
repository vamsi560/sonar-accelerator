import React, { useMemo, useId, useRef, useEffect } from 'react';
import '../../../styles/tokens.css';

type SelectSize = 'small' | 'medium' | 'large';
type SelectVariant = 'default' | 'outlined' | 'filled';
type AriaLive = 'off' | 'polite' | 'assertive';
type AriaOrientation = 'horizontal' | 'vertical';

interface SelectOptionProps {
  id?: string;
  value: string | number;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
}

const SelectOption = ({
  id,
  value,
  label,
  disabled = false,
  selected = false,
  className = '',
}: SelectOptionProps) => {
  return (
    <option
      id={id}
      value={value}
      disabled={disabled}
      selected={selected}
      className={className}
      aria-disabled={disabled}
    >
      {label || value}
    </option>
  );
};

export interface Props {
  id?: string;
  name?: string;
  className?: string;
  type?: string;
  value?: string | number;
  defaultValue?: string | number;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  selected?: boolean;
  htmlFor?: string;
  title?: string;
  expanded?: boolean;
  error?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  autoFocus?: boolean;
  autoComplete?: string;
  onChange?: (value: string | number) => void;
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-selected'?: boolean;
  'aria-controls'?: string;
  'aria-live'?: AriaLive;
  'aria-invalid'?: boolean;
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

const Select = ({
  id,
  name,
  className = '',
  value,
  defaultValue,
  label,
  required = false,
  disabled = false,
  readOnly = false,
  htmlFor,
  title,
  error,
  size = 'medium',
  variant = 'default',
  autoFocus = false,
  autoComplete,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-selected': ariaSelected,
  'aria-controls': ariaControls,
  'aria-live': ariaLive,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
  'aria-orientation': ariaOrientation = 'vertical',
  options = [],
  children,
}: Props) => {
  const generatedId = useId();
  const selectId = id || `select-${generatedId}`;
  const labelId = label ? `${selectId}-label` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const titleId = title ? `${selectId}-title` : undefined;

  const selectRef = useRef<HTMLSelectElement>(null);

  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    if (!readOnly) {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  useEffect(() => {
    if (autoFocus && selectRef.current) {
      selectRef.current.focus();
    }
  }, [autoFocus]);

  const sizeClasses = useMemo(() => {
    const sizes = {
      small: 'px-2 py-1 text-sm h-8',
      medium: 'px-3 py-2 text-base h-10',
      large: 'px-4 py-3 text-lg h-12',
    };
    return sizes[size];
  }, [size]);

  const variantClasses = useMemo(() => {
    const variants = {
      default: 'border border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500',
      outlined:
        'border-2 border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500',
      filled: 'border-b-2 border-gray-300 bg-gray-50 hover:bg-gray-100 focus:border-blue-500',
    };
    return variants[variant];
  }, [variant]);

  const descriptionIds = useMemo(() => {
    return [ariaLabelledby, ariaDescribedby, errorId, titleId]
      .filter(Boolean)
      .join(' ');
  }, [ariaLabelledby, ariaDescribedby, errorId, titleId]);

  const isInvalid = error || ariaInvalid;

  const selectClasses = [
    'w-full',
    'rounded-lg',
    'font-medium',
    'cursor-pointer',
    'transition-all',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-500',
    'focus-visible:ring-offset-2',
    sizeClasses,
    variantClasses,
    isInvalid ? 'border-red-500 focus:border-red-600' : '',
    disabled || ariaDisabled ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`flex flex-col gap-3 w-full ${disabled || ariaDisabled ? 'opacity-50' : ''}`}
      aria-orientation={ariaOrientation}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={htmlFor || selectId}
          className={`text-sm font-medium ${
            isInvalid ? 'text-red-600' : 'text-gray-700'
          } ${required ? 'after:content-["*"] after:ml-1 after:text-red-500' : ''}`}
        >
          {label}
        </label>
      )}

      <select
        ref={selectRef}
        id={selectId}
        name={name}
        value={currentValue}
        defaultValue={defaultValue}
        disabled={disabled || ariaDisabled}
        className={selectClasses}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-labelledby={labelId || ariaLabelledby}
        aria-describedby={descriptionIds || undefined}
        aria-disabled={ariaDisabled || disabled}
        aria-selected={ariaSelected}
        aria-controls={ariaControls}
        aria-live={ariaLive}
        aria-invalid={isInvalid ? 'true' : 'false'}
        aria-required={ariaRequired || required}
        aria-orientation={ariaOrientation}
      >
        {options.length > 0
          ? options.map((option, index) => (
              <SelectOption
                key={option.id || index}
                id={option.id}
                value={option.value}
                label={option.label}
                disabled={option.disabled}
                selected={currentValue === option.value}
              />
            ))
          : children}
      </select>

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

export default Select;
