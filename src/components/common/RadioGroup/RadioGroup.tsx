import React, { forwardRef, useRef, useImperativeHandle } from 'react';

export interface RadioGroupProps {
  id?: string;
  className?: string;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  inputRef?: React.Ref<HTMLDivElement>;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-required'?: boolean;
  'aria-orientation'?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const sizeMap: Record<string, string> = {
  small: 'text-sm gap-2',
  medium: 'text-base gap-3',
  large: 'text-lg gap-4',
};

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const {
    id,
    className = '',
    label,
    required,
    disabled,
    error = false,
    size = 'medium',
    inputRef,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-disabled': ariaDisabled,
    'aria-required': ariaRequired,
    'aria-orientation': ariaOrientation,
    children,
  } = props as RadioGroupProps;  const containerRef = useRef<HTMLDivElement | null>(null);
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => containerRef.current);

  React.useEffect(() => {
    if (!inputRef) return;
    if (typeof inputRef === 'function') inputRef(containerRef.current as HTMLDivElement | null);
  }, [inputRef]);

  const sizeClass = sizeMap[size] ?? sizeMap.medium;
  const errorClass = error ? 'ring-1 ring-[var(--color-error)]' : '';
  const disabledClass = disabled ? 'opacity-50 pointer-events-none' : '';

  // The RadioGroup expects children to be <label><input type="radio" .../></label> or other radio items.
  return (
    <div
      id={id}
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-disabled={ariaDisabled}
      aria-required={ariaRequired}
      aria-orientation={ariaOrientation}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`flex ${className} ${sizeClass} ${errorClass} ${disabledClass}`}
    >
      {label && (
        <div className="mr-4 self-center text-[var(--font-size-medium)]">
          {label}
          {required ? <span className="ml-1 text-[var(--color-error)]">*</span> : null}
        </div>
      )}
      <div className="flex items-center">{children}</div>
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
