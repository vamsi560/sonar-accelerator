import React, { useMemo } from 'react';
import '../../../styles/tokens.css';

type LinkSize = 'small' | 'medium' | 'large';
type LinkVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time';
type AriaLive = 'off' | 'polite' | 'assertive';

export interface Props {
  id?: string;
  className?: string;
  label?: string;
  to: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  title?: string;
  tabIndex?: number;
  size?: LinkSize;
  variant?: LinkVariant;
  onFocus?: (event: React.FocusEvent<HTMLAnchorElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLAnchorElement>) => void;
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-current'?: AriaCurrent;
  'aria-live'?: AriaLive;
  children?: React.ReactNode;
}

export const Link = ({
  id,
  className = '',
  label,
  to,
  target,
  title,
  tabIndex,
  size = 'medium',
  variant = 'primary',
  onFocus,
  onBlur,
  tooltip,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-current': ariaCurrent,
  'aria-live': ariaLive,
  children,
}: Props) => {
  const linkId = id || `link-${to.replace(/[^a-z0-9]/gi, '-')}`;
  const descriptionIds = [ariaDescribedby, tooltip ? `${linkId}-tooltip` : undefined]
    .filter(Boolean)
    .join(' ');

  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'small':
        return 'text-sm py-1 px-2';
      case 'large':
        return 'text-lg py-3 px-4';
      case 'medium':
      default:
        return 'text-base py-2 px-3';
    }
  }, [size]);

  const variantClasses = useMemo(() => {
    const baseClasses = 'font-medium transition-colors duration-200 outline-none';
    const focusClasses = 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded';

    switch (variant) {
      case 'secondary':
        return `${baseClasses} ${focusClasses} text-gray-600 hover:text-gray-800 hover:underline`;
      case 'success':
        return `${baseClasses} ${focusClasses} text-green-600 hover:text-green-700 hover:underline`;
      case 'error':
        return `${baseClasses} ${focusClasses} text-red-600 hover:text-red-700 hover:underline`;
      case 'warning':
        return `${baseClasses} ${focusClasses} text-yellow-600 hover:text-yellow-700 hover:underline`;
      case 'info':
        return `${baseClasses} ${focusClasses} text-blue-400 hover:text-blue-500 hover:underline`;
      case 'primary':
      default:
        return `${baseClasses} ${focusClasses} text-blue-600 hover:text-blue-800 hover:underline`;
    }
  }, [variant]);

  const disabledClasses = ariaDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  const combinedClassName = [
    'inline-flex items-center gap-1',
    sizeClasses,
    variantClasses,
    disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <a
        id={linkId}
        href={ariaDisabled ? undefined : to}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        title={tooltip || title}
        tabIndex={ariaDisabled ? -1 : tabIndex}
        className={combinedClassName}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel || label}
        aria-labelledby={ariaLabelledby}
        aria-describedby={descriptionIds || undefined}
        aria-disabled={ariaDisabled}
        aria-current={ariaCurrent}
        aria-live={ariaLive}
        onClick={(e) => {
          if (ariaDisabled) {
            e.preventDefault();
          }
        }}
      >
        {children || label}
      </a>

      {tooltip && (
        <span id={`${linkId}-tooltip`} className="sr-only">
          {tooltip}
        </span>
      )}
    </>
  );
};

export default Link;
