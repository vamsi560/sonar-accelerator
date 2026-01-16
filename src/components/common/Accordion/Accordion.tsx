import React, { useMemo, useId, useState } from 'react';
import '../../../styles/tokens.css';

type AccordionSize = 'small' | 'medium' | 'large';
type AccordionVariant = 'default' | 'outlined' | 'minimal' | 'filled';

export interface Props {
  id?: string;
  className?: string;
  title: string;
  expanded?: boolean;
  size?: AccordionSize;
  variant?: AccordionVariant;
  isOpen?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-controls'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-invalid'?: boolean;
  children: React.ReactNode;
}

const Accordion = ({
  id,
  className = '',
  title,
  expanded = false,
  size = 'medium',
  variant = 'default',
  isOpen = expanded,
  onClick,
  onFocus,
  onBlur,
  tooltip,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-expanded': ariaExpanded,
  'aria-hidden': ariaHidden,
  'aria-controls': ariaControls,
  'aria-live': ariaLive,
  'aria-invalid': ariaInvalid,
  children,
}: Props) => {
  const generatedId = useId();
  const accordionId = id || `accordion-${generatedId}`;
  const contentId = `${accordionId}-content`;
  const triggerId = `${accordionId}-trigger`;

  const [open, setOpen] = useState(isOpen);

  const handleClick = () => {
    setOpen(!open);
    onClick?.();
  };

  const sizeClasses = useMemo(() => {
    const sizes = {
      small: 'px-3 py-2 text-sm',
      medium: 'px-4 py-3 text-base',
      large: 'px-5 py-4 text-lg',
    };
    return sizes[size];
  }, [size]);

  const variantClasses = useMemo(() => {
    const variants = {
      default: 'bg-white border border-gray-300 hover:border-gray-400',
      outlined: 'bg-transparent border-2 border-gray-300 hover:border-gray-400',
      minimal: 'bg-transparent border-b border-gray-200 hover:border-gray-300',
      filled: 'bg-gray-50 border border-gray-200 hover:bg-gray-100',
    };
    return variants[variant];
  }, [variant]);

  const contentClasses = useMemo(() => {
    const variants = {
      default: 'bg-gray-50 border-t border-gray-300',
      outlined: 'bg-gray-50 border-t-2 border-gray-300',
      minimal: 'bg-white border-b border-gray-200',
      filled: 'bg-white border-t border-gray-200',
    };
    return variants[variant];
  }, [variant]);

  const handleTriggerClick = () => {
    handleClick();
  };

  const isExpanded = ariaExpanded !== undefined ? ariaExpanded : open;

  return (
    <div
      id={accordionId}
      className={`overflow-hidden rounded-lg transition-all duration-300 ${className}`}
      aria-hidden={ariaHidden}
    >
      <button
        id={triggerId}
        onClick={handleTriggerClick}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full flex items-center justify-between ${sizeClasses} ${variantClasses} font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
          ariaInvalid ? 'border-red-500 focus-visible:ring-red-500' : ''
        }`}
        aria-expanded={isExpanded}
        aria-controls={ariaControls || contentId}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        title={tooltip}
      >
        <span className="flex items-center gap-2 text-gray-900">
          {title}
        </span>

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
          className={`flex-shrink-0 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : 'rotate-0'
          }`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isExpanded && (
        <div
          id={contentId}
          role="region"
          className={`overflow-hidden transition-all duration-300 ${contentClasses}`}
          aria-live={ariaLive || 'polite'}
        >
          <div className={`${sizeClasses}`}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
