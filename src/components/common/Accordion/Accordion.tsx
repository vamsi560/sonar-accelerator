import React, { useState } from 'react';
import Button from '../Button/Button';

/**
 * Accordion Component
 * 
 * A collapsible section component that expands/collapses to show/hide content.
 * Features smooth animations, customizable sizing and styling.
 */
export interface AccordionProps {
  id?: string;
  className?: string;
  title?: string;
  expanded?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'elevation' | 'outlined';
  isOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-controls'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-invalid'?: boolean;
  children?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  id,
  className = '',
  title = 'Accordion Title',
  size = 'medium',
  variant = 'outlined',
  isOpen: controlledIsOpen,
  onChange,
  children,
  ...ariaProps
}) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);

  // Support both controlled and uncontrolled modes
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;

  const handleToggle = () => {
    const newState = !isOpen;
    setUncontrolledIsOpen(newState);
    onChange?.(newState);
  };

  // Size classes
  const sizeClasses = {
    small: 'py-2 px-3 text-sm',
    medium: 'py-3 px-4 text-base',
    large: 'py-4 px-5 text-lg',
  };

  // Variant classes
  const variantClasses = {
    elevation: 'border-0 shadow-md',
    outlined: 'border border-gray-300',
  };

  const contentId = `${id || 'accordion'}-content`;

  return (
    <div
      id={id}
      className={`rounded-lg overflow-hidden ${variantClasses[variant]} ${className}`}
      aria-live={ariaProps['aria-live']}
      aria-hidden={ariaProps['aria-hidden']}
      aria-invalid={ariaProps['aria-invalid']}
    >
      {/* Header */}
      <Button
        onClick={handleToggle}
        className={`w-full ${sizeClasses[size]} bg-gray-50 hover:bg-gray-100 border-b border-gray-200 transition-colors flex items-center justify-between font-medium text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset`}
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-label={ariaProps['aria-label'] || title}
        aria-labelledby={ariaProps['aria-labelledby']}
        aria-describedby={ariaProps['aria-describedby']}
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </Button>

      {/* Content */}
      <div
        id={contentId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className={`${sizeClasses[size]} bg-white text-gray-700`}>
          {children || <p>Accordion content goes here.</p>}
        </div>
      </div>
    </div>
  );
};

export default Accordion;