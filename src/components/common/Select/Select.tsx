import React, { forwardRef, useImperativeHandle, useRef } from 'react';

/**
 * SelectProps
 * - A reusable select component modeled after MUI Select UX but implemented with Tailwind and tokens.
 */
export interface SelectProps {
  id?: string;
  name?: string;
  className?: string;
  value?: string | number;
  defaultValue?: string | number;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  htmlFor?: string;
  title?: string;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'filled' | 'standard';
  inputRef?: React.Ref<HTMLSelectElement>;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
  children?: React.ReactNode;
}

const sizeMap: Record<string, string> = {
  small: 'text-sm px-[var(--padding-small)] py-1',
  medium: 'text-base px-[var(--padding-medium)] py-2',
  large: 'text-lg px-[var(--padding-large)] py-3',
};

const variantMap: Record<string, string> = {
  outlined: 'border border-[var(--color-divider)] rounded',
  filled: 'bg-[var(--color-primary-light)] rounded',
  standard: 'border-b border-[var(--color-divider)]',
};

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    id,
    name,
    className = '',
    value,
    defaultValue,
    label,
    required,
    disabled,
    htmlFor,
    title,
    error = false,
    size = 'medium',
    variant = 'outlined',
    inputRef,
    autoFocus,
    onChange,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-invalid': ariaInvalid,
    'aria-required': ariaRequired,
    children,
    ...rest
  } = props as SelectProps;

  const innerRef = useRef<HTMLSelectElement | null>(null);
  // expose the inner DOM element (may be null when not mounted)
  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(ref, () => innerRef.current);

  React.useEffect(() => {
    if (!inputRef) return;
    if (typeof inputRef === 'function') inputRef(innerRef.current);
    // intentionally do not assign to object refs to avoid mutating props
  }, [inputRef]);

  const sizeClass = sizeMap[size] ?? sizeMap.medium;
  const variantClass = variantMap[variant] ?? variantMap.outlined;
  const errorClass = error ? 'ring-1 ring-[var(--color-error)]' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100';

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={id ?? htmlFor} className="mb-[var(--gap-xsmall)] text-[var(--font-size-small)]">
          {label}
          {required ? <span aria-hidden className="ml-1 text-[var(--color-error)]">*</span> : null}
        </label>
      )}
      <select
        ref={innerRef}
        id={id}
        name={name}
        {...(value === undefined ? {} : { value })}
        {...(value !== undefined ? {} : defaultValue !== undefined ? { defaultValue } : {})}
        required={required}
        disabled={disabled}
        title={title}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
        aria-required={ariaRequired}
        autoFocus={autoFocus}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`${sizeClass} ${variantClass} ${errorClass} ${disabledClass} focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
