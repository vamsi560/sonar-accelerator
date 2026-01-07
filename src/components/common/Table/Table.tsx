
import React, { useMemo, useState } from 'react';

export type TableSize = 'small' | 'medium' | 'large';
export type TableVariant = 'standard' | 'striped' | 'outlined';

export interface TableColumn<T> {
  id?: string;
  field: keyof T | string;
  headerName?: string;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  sortable?: boolean;
  renderCell?: (row: T) => React.ReactNode;
  tooltip?: React.ReactNode;
  className?: string;
  hide?: boolean;
}

export interface TableProps<T> {
  id?: string;
  className?: string;
  size?: TableSize;
  variant?: TableVariant;

  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaLive?: 'polite' | 'assertive' | 'off';

  columns: TableColumn<T>[];
  rows: T[];

  sortable?: boolean;
  defaultSort?: { field: keyof T | string; order: 'asc' | 'desc' } | null;

  onRowClick?: (row: T) => void;

  stickyHeader?: boolean;
  dense?: boolean;
}

const sizeMap: Record<TableSize, string> = {
  small: 'text-[var(--font-size-small)] py-1 px-2 min-h-[var(--min-height-small)]',
  medium: 'text-[var(--font-size-medium)] py-2 px-3 min-h-[var(--min-height-medium)]',
  large: 'text-[var(--font-size-large)] py-3 px-4 min-h-[var(--min-height-large)]',
};

const Table = <T extends Record<string, unknown>>({
  id,
  className = '',
  size = 'medium',
  variant = 'standard',

  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaLive,

  columns = [],
  rows = [],

  sortable = true,
  defaultSort = null,

  onRowClick,
  stickyHeader = false,
  dense = false,
}: TableProps<T>) => {
  const [sortState, setSortState] = useState<{ field?: string; order?: 'asc' | 'desc' }>(() =>
    defaultSort ? { field: String(defaultSort.field), order: defaultSort.order } : {}
  );

  const handleSort = (field: string) => {
    if (!sortable) return;
    setSortState((prev) =>
      prev.field === field ? { field, order: prev.order === 'asc' ? 'desc' : 'asc' } : { field, order: 'asc' }
    );
  };

  const baseRowClass = `${sizeMap[size]} ${dense ? 'py-1' : ''}`;
  const headerClasses = `${sizeMap[size]} font-semibold bg-[var(--color-primary-light)] text-[var(--color-black)]`;

  const sortedRows = useMemo(() => {
    if (!sortState.field) return rows;

    // Helper function to convert value to string for comparison
    const valueToString = (val: unknown): string => {
      if (typeof val === 'string') return val;
      if (typeof val === 'object') return JSON.stringify(val);
      return String(val);
    };

    // Helper function to compare two values
    const compareValues = (av: unknown, bv: unknown, order: number): number => {
      if (av === bv) return 0;
      if (av == null) return -1 * order;
      if (bv == null) return 1 * order;
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * order;
      if (typeof av === 'boolean' && typeof bv === 'boolean') {
        const getBooleanComparison = (): number => {
          if (av === bv) return 0;
          return av ? 1 : -1;
        };
        return getBooleanComparison() * order;
      }
      if (typeof av === 'object' || typeof bv === 'object') {
        return valueToString(av).localeCompare(valueToString(bv)) * order;
      }
      return valueToString(av).localeCompare(valueToString(bv)) * order;
    };

    const field = sortState.field;
    const order = sortState.order === 'desc' ? -1 : 1;

    return [...rows].sort((a, b) => {
      const av = a[field];
      const bv = b[field];
      return compareValues(av, bv, order);
    });
  }, [rows, sortState]);

  const tableVariantClasses = {
    standard: '',
    striped: 'odd:bg-white even:bg-[var(--color-primary-light)]',
    outlined: 'border border-gray-200',
  } as Record<TableVariant, string>;

  return (
    <div
      id={id}
      className={`w-full overflow-x-auto ${className}`}
    >
      <table 
        className={`min-w-full text-left border-collapse ${tableVariantClasses[variant]} ${dense ? 'text-sm' : ''}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-live={ariaLive}
      >
        <thead className={`${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
          <tr>
            {columns.filter((c) => !c.hide).map((col) => {
              const isCurrentSortField = sortState.field === String(col.field);
              let ariaSort: 'ascending' | 'descending' | undefined;
              if (isCurrentSortField) {
                ariaSort = sortState.order === 'asc' ? 'ascending' : 'descending';
              } else {
                ariaSort = undefined;
              }

              return (
              <th
                key={col.id ?? String(col.field)}
                style={{ width: col.width }}
                className={`px-3 ${headerClasses} ${col.className ?? ''} ${
                  col.align === 'center' ? 'text-center' : ''
                } ${col.align === 'right' ? 'text-right' : ''}`}
                aria-sort={ariaSort}
              >
                <div className="flex items-center gap-2">
                  <span>{col.headerName ?? String(col.field)}</span>

                  {sortable && col.sortable !== false && (
                    <button
                      type="button"
                      className="ml-1 text-gray-500 hover:text-(--color-primary)"
                      onClick={() => handleSort(String(col.field))}
                      aria-label={`Sort by ${col.headerName ?? String(col.field)}`}
                    >
                      <svg
                        className={`w-3 h-3 inline-block transform ${
                          sortState.field === String(col.field) && sortState.order === 'desc'
                            ? 'rotate-180'
                            : ''
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M6 9l6-6 6 6" />
                        <path d="M6 15l6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>
              </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {sortedRows.map((row: T, rowIndex: number) => {
            const rowKey = `row-${Object.values(row).map(val => 
              typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val)
            ).join('-')}`;
            
            const getStripedClass = (): string => {
              if (variant !== 'striped') {
                return '';
              }
              return rowIndex % 2 === 0 ? 'bg-white' : 'bg-(--color-primary-light)';
            };
            
            const stripedClass = getStripedClass();
            
            return (
            <tr
              key={rowKey}
              className={`hover:bg-(--color-primary-light) ${stripedClass} cursor-pointer`}
              onClick={() => onRowClick?.(row)}
            >
              {columns
                .filter((c) => !c.hide)
                .map((col) => (
                  <td
                    key={col.id ?? String(col.field)}
                    className={`px-3 ${baseRowClass} ${col.className ?? ''} ${
                      col.align === 'center' ? 'text-center' : ''
                    } ${col.align === 'right' ? 'text-right' : ''}`}
                  >
                    {col.renderCell
                      ? col.renderCell(row)
                      : String(row[col.field as keyof T] ?? '')}
                  </td>
                ))}
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
