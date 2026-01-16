import React, { useEffect } from 'react';

interface ModalProps {
  id?: string;
  className?: string;
  title?: string;
  isOpen: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  maxHeight?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClose: () => void;
  children?: React.ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-controls'?: string;
  'aria-modal'?: boolean;
  'aria-live'?: 'polite' | 'assertive' | 'off';
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      id,
      className = '',
      title,
      isOpen,
      maxWidth = 'md',
      maxHeight = 'lg',
      onClick,
      onClose,
      children,
      ...ariaProps
    },
    ref,
  ) => {
    // Handle escape key to close modal
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const maxWidthClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'max-w-full',
    };

    const maxHeightClasses = {
      sm: 'max-h-sm',
      md: 'max-h-md',
      lg: 'max-h-lg',
      xl: 'max-h-xl',
      full: 'max-h-full',
    };

    const isBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      return e.target === e.currentTarget;
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isBackdropClick(e)) {
        onClose();
      }
      onClick?.(e);
    };

    const closeButton = (
      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
        aria-label="Close modal"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    );

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
          role="presentation"
        >
          {/* Modal Content */}
          <div
            ref={ref}
            id={id}
            className={`bg-white rounded-lg shadow-xl w-full ${maxWidthClasses[maxWidth]} ${maxHeightClasses[maxHeight]} overflow-y-auto transition-all duration-300 ${className}`}
            {...ariaProps}
            role="dialog"
          >
            {/* Modal Header */}
            {title && (
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                {closeButton}
              </div>
            )}

            {/* Modal Body */}
            <div className="px-6 py-4">{children}</div>
          </div>
        </div>
      </>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
