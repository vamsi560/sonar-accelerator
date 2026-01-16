import React, { useMemo, useId } from 'react';
import '../../../styles/tokens.css';

type PaginationSize = 'small' | 'medium' | 'large';
type PaginationVariant = 'default' | 'compact' | 'minimal';
type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time';
type AriaLive = 'off' | 'polite' | 'assertive';

interface PaginationButtonProps {
  id?: string;
  className?: string;
  value?: number;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
  title?: string;
  tabIndex?: number;
  size?: PaginationSize;
  variant?: PaginationVariant;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  'aria-label'?: string;
  'aria-current'?: AriaCurrent;
  'aria-disabled'?: boolean;
}

export const PaginationButton = ({
  id,
  className = '',
  value,
  label,
  disabled = false,
  selected = false,
  title,
  tabIndex,
  size = 'medium',
  onClick,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
  'aria-disabled': ariaDisabled,
}: PaginationButtonProps) => {
  const sizeClasses = {
    small: 'px-2 py-1 text-sm min-w-8',
    medium: 'px-3 py-2 text-base min-w-10',
    large: 'px-4 py-3 text-lg min-w-12',
  };

  const baseClasses = 'rounded border transition-all duration-200 font-medium';

  const selectedClasses = selected
    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50';

  const disabledClasses = disabled || ariaDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const focusClasses = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

  const combinedClassName = [
    baseClasses,
    sizeClasses[size],
    selectedClasses,
    disabledClasses,
    focusClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      id={id}
      className={combinedClassName}
      disabled={disabled || ariaDisabled}
      title={title}
      tabIndex={tabIndex ?? (disabled || ariaDisabled ? -1 : 0)}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel || label}
      aria-current={selected ? ariaCurrent || 'page' : undefined}
      aria-disabled={ariaDisabled || disabled}
    >
      {label || value}
    </button>
  );
};

export interface Props {
  id?: string;
  className?: string;
  currentPage?: number;
  totalPages?: number;
  disabled?: boolean;
  title?: string;
  tabIndex?: number;
  size?: PaginationSize;
  variant?: PaginationVariant;
  onPageChange?: (page: number) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-controls'?: string;
  'aria-live'?: AriaLive;
  showPreviousNext?: boolean;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  previousLabel?: string;
  nextLabel?: string;
  firstLabel?: string;
  lastLabel?: string;
}

export const Pagination = ({
  id,
  className = '',
  currentPage = 1,
  totalPages = 10,
  disabled = false,
  title,
  size = 'medium',
  variant = 'default',
  onPageChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-controls': ariaControls,
  'aria-live': ariaLive,
  showPreviousNext = true,
  showFirstLast = false,
  maxVisiblePages = 5,
  previousLabel = '← Previous',
  nextLabel = 'Next →',
  firstLabel = '← First',
  lastLabel = 'Last →',
}: Props) => {
  const generatedId = useId();
  const paginationId = id || `pagination-${generatedId}`;

  const getVisiblePages = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const sidePages = Math.floor((maxVisiblePages - 1) / 2);

    if (currentPage <= sidePages + 1) {
      for (let i = 1; i <= maxVisiblePages; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage > totalPages - sidePages - 1) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - sidePages; i <= currentPage + sidePages; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  const containerClasses = {
    default: 'gap-2',
    compact: 'gap-1',
    minimal: 'gap-0',
  };

  const combinedClassName = [
    'flex items-center',
    containerClasses[variant],
    disabled || ariaDisabled ? 'opacity-50' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav
      id={paginationId}
      className={combinedClassName}
      title={title}
      aria-label={ariaLabel || 'Pagination'}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-disabled={ariaDisabled || disabled}
      aria-controls={ariaControls}
      aria-live={ariaLive}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {showFirstLast && (
        <PaginationButton
          label={firstLabel}
          disabled={disabled || currentPage === 1}
          size={size}
          variant={variant}
          onClick={() => onPageChange?.(1)}
          aria-label="Go to first page"
        />
      )}

      {showPreviousNext && (
        <PaginationButton
          label={previousLabel}
          disabled={disabled || currentPage === 1}
          size={size}
          variant={variant}
          onClick={() => onPageChange?.(currentPage - 1)}
          aria-label="Go to previous page"
        />
      )}

      <div className="flex gap-1">
        {getVisiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={`px-2 py-2 text-gray-500 ${
                  size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : 'text-base'
                }`}
                aria-hidden="true"
              >
                …
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <PaginationButton
              key={pageNum}
              value={pageNum}
              label={String(pageNum)}
              disabled={disabled}
              selected={pageNum === currentPage}
              size={size}
              variant={variant}
              onClick={() => onPageChange?.(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            />
          );
        })}
      </div>

      {showPreviousNext && (
        <PaginationButton
          label={nextLabel}
          disabled={disabled || currentPage === totalPages}
          size={size}
          variant={variant}
          onClick={() => onPageChange?.(currentPage + 1)}
          aria-label="Go to next page"
        />
      )}

      {showFirstLast && (
        <PaginationButton
          label={lastLabel}
          disabled={disabled || currentPage === totalPages}
          size={size}
          variant={variant}
          onClick={() => onPageChange?.(totalPages)}
          aria-label="Go to last page"
        />
      )}
    </nav>
  );
};
export default Pagination;
