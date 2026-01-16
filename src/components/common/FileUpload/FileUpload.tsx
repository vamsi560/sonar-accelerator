import React, { useMemo } from 'react';
import '../../../styles/tokens.css';

type FileUploadSize = 'small' | 'medium' | 'large';
type FileUploadVariant = 'default' | 'dashed' | 'outlined';
type AriaLive = 'off' | 'polite' | 'assertive';

interface Props {
  id?: string;
  name?: string;
  className?: string;
  type?: string;
  value?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  accept?: string;
  multiple?: boolean;
  htmlFor?: string;
  tabIndex?: number;
  error?: string;
  size?: FileUploadSize;
  variant?: FileUploadVariant;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-controls'?: string;
  'aria-live'?: AriaLive;
  'aria-required'?: boolean;
}

const FileUpload = ({
  id,
  name,
  className = '',
  type = 'file',
  value,
  label,
  required = false,
  disabled = false,
  readOnly = false,
  accept,
  multiple = false,
  htmlFor,
  tabIndex,
  error,
  size = 'medium',
  variant = 'default',
  fullWidth = false,
  onClick,
  onChange,
  onFocus,
  onBlur,
  tooltip,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-controls': ariaControls,
  'aria-live': ariaLive,
  'aria-required': ariaRequired,
}: Props) => {
  const inputId = id || name || 'file-upload';
  const labelId = htmlFor || inputId;
  const errorId = error ? `${inputId}-error` : undefined;
  const descriptionIds = [ariaDescribedby, errorId, tooltip ? `${inputId}-tooltip` : undefined]
    .filter(Boolean)
    .join(' ');

  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-sm';
      case 'large':
        return 'px-6 py-4 text-lg';
      case 'medium':
      default:
        return 'px-4 py-2 text-base';
    }
  }, [size]);

  const variantClasses = useMemo(() => {
    const baseClasses = 'border rounded-lg transition-colors duration-200';
    switch (variant) {
      case 'dashed':
        return `${baseClasses} border-dashed border-2 border-gray-300 hover:border-gray-400 ${
          error ? 'border-red-500' : ''
        }`;
      case 'outlined':
        return `${baseClasses} border-2 border-gray-400 hover:border-gray-500 ${
          error ? 'border-red-500' : ''
        }`;
      case 'default':
      default:
        return `${baseClasses} border border-gray-300 hover:border-gray-400 ${
          error ? 'border-red-500' : ''
        }`;
    }
  }, [variant, error]);

  const widthClass = fullWidth ? 'w-full' : 'w-auto';

  const disabledClasses = disabled || readOnly ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const combinedInputClassName = [
    'file:mr-4',
    'file:py-2',
    'file:px-4',
    'file:rounded-md',
    'file:border-0',
    'file:text-sm',
    'file:font-semibold',
    'file:bg-blue-50',
    'file:text-blue-700',
    'file:hover:bg-blue-100',
    'file:cursor-pointer',
    sizeClasses,
    variantClasses,
    widthClass,
    disabledClasses,
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    disabled ? 'file:cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={labelId}
          className={`text-sm font-medium ${
            error ? 'text-red-600' : 'text-gray-700'
          } ${required ? 'after:content-["*"] after:ml-1 after:text-red-500' : ''}`}
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        readOnly={readOnly}
        tabIndex={tabIndex}
        title={tooltip}
        className={combinedInputClassName}
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel || label}
        aria-labelledby={ariaLabelledby}
        aria-describedby={descriptionIds || undefined}
        aria-disabled={ariaDisabled || disabled}
        aria-controls={ariaControls}
        aria-live={ariaLive}
        aria-required={ariaRequired || required}
        required={required}
      />

      {tooltip && (
        <span id={`${inputId}-tooltip`} className="text-xs text-gray-500">
          {tooltip}
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

export default FileUpload;
