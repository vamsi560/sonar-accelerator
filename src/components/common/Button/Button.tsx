import React from 'react';

interface Props {
  id?: string;
  name?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  to?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  formtarget?: string;
  title?: string;
  tabIndex?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  'aria-pressed'?: boolean | 'mixed';
  'aria-controls'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  children?: React.ReactNode;
}

const Button = ({
  id,
  name,
  className = '',
  type = 'button',
  disabled = false,
  to,
  target,
  formtarget,
  title,
  tabIndex,
  size = 'md',
  variant = 'primary',
  onClick,
  onFocus,
  onBlur,
  tooltip,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-hidden': ariaHidden,
  'aria-disabled': ariaDisabled,
  'aria-pressed': ariaPressed,
  'aria-controls': ariaControls,
  'aria-live': ariaLive,
  'aria-haspopup': ariaHaspopup,
  children,
}: Props) => {
  // Base button styles
  const baseStyles = 'font-semibold rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Size styles
  const sizeStyles: Record<string, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant styles
  const variantStyles: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed',
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();
  
  const renderChildren = tooltip ? <span title={tooltip}>{children}</span> : children;

  // If it's a link button
  if (to) {
    return (
      <a
        id={id}
        href={to}
        target={target}
        className={`inline-flex items-center justify-center cursor-pointer no-underline ${combinedClassName}`}
        title={title || tooltip}
        tabIndex={tabIndex}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-hidden={ariaHidden}
        aria-disabled={disabled || ariaDisabled}
        aria-controls={ariaControls}
        aria-live={ariaLive}
        aria-haspopup={ariaHaspopup}
      >
        {renderChildren}
      </a>
    );
  }

  // Standard button element
  return (
    <button
      id={id}
      name={name}
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center cursor-pointer ${combinedClassName}`}
      title={title || tooltip}
      tabIndex={tabIndex}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      formTarget={formtarget}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-hidden={ariaHidden}
      aria-disabled={disabled || ariaDisabled}
      aria-pressed={ariaPressed}
      aria-controls={ariaControls}
      aria-live={ariaLive}
      aria-haspopup={ariaHaspopup}
    >
      {renderChildren}
    </button>
  );
};

export default Button;
