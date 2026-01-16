import React, { useMemo } from 'react';
import '../../../styles/tokens.css';

type TableSize = 'small' | 'medium' | 'large';
type TableVariant = 'default' | 'striped' | 'bordered' | 'hover';
type AriaLive = 'off' | 'polite' | 'assertive';

interface TableHeaderProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
  sortDirection?: 'asc' | 'desc' | 'none';
}

const TableHeader = ({
  id,
  className = '',
  children,
  scope = 'col',
  sortDirection = 'none',
}: TableHeaderProps) => {
  const headerClasses = [
    'font-bold',
    'text-left',
    'bg-gray-100',
    'text-gray-900',
    'px-4 py-2',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <th
      id={id}
      className={headerClasses}
      scope={scope}
      aria-sort={sortDirection !== 'none' ? `${sortDirection === 'asc' ? 'ascending' : 'descending'}` : 'none'}
    >
      {children}
    </th>
  );
};

interface TableCellProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

const TableCell = ({
  id,
  className = '',
  children,
  align = 'left',
  width,
}: TableCellProps) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  const cellClasses = [
    'px-4 py-2',
    'text-gray-700',
    alignClass,
    width ? `w-${width}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <td id={id} className={cellClasses}>
      {children}
    </td>
  );
};

interface TableRowProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  isHeader?: boolean;
  isStriped?: boolean;
  isHoverable?: boolean;
  index?: number;
}

const TableRow = ({
  id,
  className = '',
  children,
  isHeader = false,
  isStriped = false,
  isHoverable = false,
  index = 0,
}: TableRowProps) => {
  const rowClasses = [
    'border-b border-gray-200',
    isStriped && !isHeader && index % 2 === 1 ? 'bg-gray-50' : '',
    isHoverable && !isHeader ? 'hover:bg-gray-100 transition-colors' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <tr id={id} className={rowClasses}>
      {children}
    </tr>
  );
};

export interface Props {
  id?: string;
  className?: string;
  size?: TableSize;
  variant?: TableVariant;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-live'?: AriaLive;
  caption?: string;
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  dense?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  headers?: string[];
  rows?: Array<{
    id?: string;
    cells: Array<{
      id?: string;
      content: React.ReactNode;
      align?: 'left' | 'center' | 'right';
    }>;
  }>;
}

const Table = ({
  id,
  className = '',
  size = 'medium',
  variant = 'default',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-live': ariaLive,
  caption,
  striped = false,
  bordered = false,
  hoverable = false,
  dense = false,
  fullWidth = true,
  children,
  headers = [],
  rows = [],
}: Props) => {
  const sizeClasses = useMemo(() => {
    const sizes = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };
    return sizes[size];
  }, [size]);

  const variantClasses = useMemo(() => {
    let classes = 'border border-gray-200';
    if (variant === 'striped' || striped) classes += ' [&>tbody>tr:nth-child(odd)]:bg-gray-50';
    if (variant === 'bordered' || bordered) classes += ' border-collapse';
    if (variant === 'hover' || hoverable) classes += ' [&>tbody>tr]:hover:bg-gray-100';
    return classes;
  }, [variant, striped, bordered, hoverable]);

  const tableClasses = [
    'w-full',
    'border-collapse',
    sizeClasses,
    variantClasses,
    'bg-white',
    'rounded-lg',
    'overflow-hidden',
    fullWidth ? 'w-full' : '',
    dense ? 'compact' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const descriptionIds = [ariaLabelledby, ariaDescribedby].filter(Boolean).join(' ');

  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200`}>
      <table
        id={id}
        className={tableClasses}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={descriptionIds || undefined}
        aria-live={ariaLive}
      >
        {caption && (
          <caption className="caption-side px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-50">
            {caption}
          </caption>
        )}

        {(headers.length > 0 || children) && (
          <thead className="bg-gray-100 border-b-2 border-gray-200">
            {headers.length > 0 ? (
              <TableRow isHeader={true}>
                {headers.map((header, index) => (
                  <TableHeader key={index}>{header}</TableHeader>
                ))}
              </TableRow>
            ) : (
              children &&
              React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === 'thead') {
                  return child;
                }
                return null;
              })
            )}
          </thead>
        )}

        <tbody>
          {rows.length > 0
            ? rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id || rowIndex}
                  id={row.id}
                  isStriped={striped || variant === 'striped'}
                  isHoverable={hoverable || variant === 'hover'}
                  index={rowIndex}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell
                      key={`${rowIndex}-${cellIndex}`}
                      id={cell.id}
                      align={cell.align}
                    >
                      {cell.content}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : children &&
              React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === 'tbody') {
                  return child;
                }
                return null;
              })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
