import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

export interface NumberFieldProps {
  id?: string;
  name?: string;
  className?: string;
  value?: number | string;
  defaultValue?: number | string;
  placeholder?: string;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  title?: string;
  error?: boolean;
  size?: 'sm' | 'md' | 'l';
  variant?: 'outlined' | 'filled' | 'standard';
  inputRef?: React.Ref<HTMLInputElement>;
  autoFocus?: boolean;
  autoComplete?: string;
  activeStep?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
}

const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>((props, ref) => {
  const {
    id,
    name,
    className = '',
    value,
    defaultValue,
    placeholder,
    label,
    required,
    disabled,
    readOnly,
    min,
    max,
    step,
    title,
    error = false,
    size = 'md',
    variant = 'outlined',
    inputRef,
    autoFocus,
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
  } = props;

  const innerRef = useRef<HTMLInputElement | null>(null);

  // Expose via forwarded ref
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  // Expose via inputRef prop
  useEffect(() => {
    if (!inputRef) return;
    if (typeof inputRef === 'function') {
      inputRef(innerRef.current);
    }
  }, [inputRef]);

  // Dynamic style utilities
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-[var(--padding-small)] py-1 min-h-[var(--min-height-small)]';
      case 'l':
        return 'text-lg px-[var(--padding-large)] py-3 min-h-[var(--min-height-large)]';
      default:
        return 'text-base px-[var(--padding-medium)] py-2 min-h-[var(--min-height-medium)]';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'filled':
        return 'bg-[var(--color-primary-light)] rounded';
      case 'standard':
        return 'border-b border-[var(--color-divider)]';
      default:
        return 'border border-[var(--color-divider)] rounded';
    }
  };

  const getStateClasses = () => {
    let classes = '';
    if (error) classes += ' ring-1 ring-[var(--color-error)]';
    if (disabled) classes += ' opacity-50 cursor-not-allowed';
    return classes;
  };

  return (
    <div className="flex flex-col" data-active-step={activeStep}>
      {label && (
        <label
          htmlFor={id}
          className="mb-[var(--gap-xsmall)] text-[var(--font-size-small)]"
        >
          {label}
          {required && (
            <span aria-hidden className="ml-1 text-[var(--color-error)]">*</span>
          )}
        </label>
      )}

      <input
        ref={innerRef}
        id={id}
        name={name}
        type="number"
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        step={step}
        title={title}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-disabled={ariaDisabled}
        aria-live={ariaLive}
        aria-invalid={ariaInvalid}
        aria-required={ariaRequired}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`
          ${getSizeClasses()}
          ${getVariantClasses()}
          ${getStateClasses()}
          focus:outline-none
          focus:ring-2
          focus:ring-[var(--color-primary)]
          ${className}
        `}
      />
    </div>
  );
});

NumberField.displayName = 'NumberField';

export default NumberField;
