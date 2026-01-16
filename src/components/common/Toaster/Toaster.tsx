import React, { useMemo, useId, useEffect } from 'react';
import '../../../styles/tokens.css';

type ToasterSize = 'small' | 'medium' | 'large';
type ToasterVariant = 'success' | 'error' | 'warning' | 'info';

export interface Props {
  id?: string;
  className?: string;
  endDecorator?: React.ReactNode;
  size?: ToasterSize;
  startDecorator?: React.ReactNode;
  variant?: ToasterVariant;
  onClose?: () => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-live'?: 'polite' | 'assertive';
  message: string;
  autoCloseDuration?: number;
}

const Toaster = ({
  id,
  className = '',
  endDecorator,
  size = 'medium',
  startDecorator,
  variant = 'info',
  onClose,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-live': ariaLive = 'polite',
  message,
  autoCloseDuration = 5000,
}: Props) => {
  const generatedId = useId();
  const toastId = id || `toast-${generatedId}`;
  const messageId = `${toastId}-message`;

  useEffect(() => {
    if (autoCloseDuration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [autoCloseDuration, onClose]);

  const sizeClasses = useMemo(() => {
    const sizes = {
      small: 'px-3 py-2 text-sm gap-2',
      medium: 'px-4 py-3 text-base gap-3',
      large: 'px-5 py-4 text-lg gap-4',
    };
    return sizes[size];
  }, [size]);

  const variantClasses = useMemo(() => {
    const variants = {
      success: 'bg-green-50 border-l-4 border-l-green-500 text-green-900',
      error: 'bg-red-50 border-l-4 border-l-red-500 text-red-900',
      warning: 'bg-yellow-50 border-l-4 border-l-yellow-500 text-yellow-900',
      info: 'bg-blue-50 border-l-4 border-l-blue-500 text-blue-900',
    };
    return variants[variant];
  }, [variant]);

  const iconClasses = useMemo(() => {
    const icons = {
      success: 'text-green-500',
      error: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-blue-500',
    };
    return icons[variant];
  }, [variant]);

  const defaultIconMap: Record<ToasterVariant, React.ReactNode> = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClasses}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClasses}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClasses}
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClasses}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  };

  return (
    <div
      id={toastId}
      role="status"
      className={`flex items-start rounded-lg shadow-lg border transition-all duration-300 ${sizeClasses} ${variantClasses} ${className}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby || messageId}
      aria-live={ariaLive}
    >
      {startDecorator || defaultIconMap[variant]}

      <div className="flex-1">
        <p id={messageId} className="font-medium">
          {message}
        </p>
      </div>

      {endDecorator && <div className="flex-shrink-0">{endDecorator}</div>}

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 text-current hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded p-1"
          aria-label="Close notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Toaster;
