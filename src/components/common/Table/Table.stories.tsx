
// import React, { useMemo, useState } from 'react';
// import Tooltip from '../Tooltip/Tooltip';

// export type TableSize = 'small' | 'medium' | 'large';
// export type TableVariant = 'standard' | 'striped' | 'outlined' | 'dense';

// export interface TableColumn<T> {
//   id?: string;
//   field: keyof T | string;
//   headerName?: string;
//   align?: 'left' | 'center' | 'right';
//   width?: string | number;
//   sortable?: boolean;
//   renderCell?: (row: T) => React.ReactNode;
//   tooltip?: React.ReactNode;
//   className?: string;
//   hide?: boolean;
// }

// export interface TableProps<T> {
//   id?: string;
//   className?: string;
//   size?: TableSize;
//   variant?: TableVariant;

//   onFocus?: (e: React.FocusEvent) => void;
//   onBlur?: (e: React.FocusEvent) => void;

//   tooltip?: boolean;

//   ariaLabel?: string;
//   ariaLabelledby?: string;
//   ariaDescribedby?: string;
//   ariaLive?: 'polite' | 'assertive' | 'off';
//   'aria-label'?: string;
//   'aria-labelledby'?: string;
//   'aria-describedby'?: string;
//   'aria-live'?: 'polite' | 'assertive' | 'off';

//   columns: TableColumn<T>[];
//   rows: T[];

//   sortable?: boolean;
//   defaultSort?: { field: keyof T | string; order: 'asc' | 'desc' } | null;

//   onRowClick?: (row: T) => void;

//   stickyHeader?: boolean;
//   dense?: boolean;
// }

// const sizeMap: Record<TableSize, string> = {
//   small: 'text-[var(--font-size-small)] py-1 px-2 min-h-[var(--min-height-small)]',
//   medium: 'text-[var(--font-size-medium)] py-2 px-3 min-h-[var(--min-height-medium)]',
//   large: 'text-[var(--font-size-large)] py-3 px-4 min-h-[var(--min-height-large)]',
// };

// const Table = <T extends Record<string, unknown>>({
//   id,
//   className = '',
//   size = 'medium',
//   variant = 'standard',
//   onFocus,
//   onBlur,
//   tooltip = false,

//   ariaLabel,
//   ariaLabelledby,
//   ariaDescribedby,
//   ariaLive = 'polite',
//   'aria-label': ariaLabelHyphen,
//   'aria-labelledby': ariaLabelledHyphen,
//   'aria-describedby': ariaDescribedHyphen,
//   'aria-live': ariaLiveHyphen,

//   columns = [],
//   rows = [],

//   sortable = true,
//   defaultSort = null,

//   onRowClick,
//   stickyHeader = false,
//   dense = false,
// }: TableProps<T>) => {
//   const [sortState, setSortState] = useState<{ field?: string; order?: 'asc' | 'desc' }>(() =>
//     defaultSort ? { field: String(defaultSort.field), order: defaultSort.order } : {}
//   );

//   const handleSort = (field: string) => {
//     if (!sortable) return;
//     setSortState((prev) =>
//       prev.field === field ? { field, order: prev.order === 'asc' ? 'desc' : 'asc' } : { field, order: 'asc' }
//     );
//   };

//   const sortedRows = useMemo(() => {
//     if (!sortState.field) return rows;

//     const field = sortState.field;
//     const order = sortState.order === 'desc' ? -1 : 1;

//     return [...rows].sort((a, b) => {
//       const av = a[field];
//       const bv = b[field];

//       if (av === bv) return 0;
//       if (av == null) return -1 * order;
//       if (bv == null) return 1 * order;
//       if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * order;

//       return String(av).localeCompare(String(bv)) * order;
//     });
//   }, [rows, sortState]);

//   const baseRowClass = `${sizeMap[size]} ${dense ? 'py-1' : ''}`;
//   const headerClasses = `${sizeMap[size]} font-semibold bg-[var(--color-primary-light)] text-[var(--color-black)]`;

//   const tableVariantClasses = {
//     standard: '',
//     striped: 'odd:bg-white even:bg-[var(--color-primary-light)]',
//     outlined: 'border border-gray-200',
//     dense: '',
//   } as Record<TableVariant, string>;

//   return (
//     <div
//       id={id}
//       role="table"
//       aria-label={ariaLabel ?? ariaLabelHyphen}
//       aria-labelledby={ariaLabelledby ?? ariaLabelledHyphen}
//       aria-describedby={ariaDescribedby ?? ariaDescribedHyphen}
//       aria-live={ariaLive ?? ariaLiveHyphen}
//       className={`w-full overflow-x-auto ${className}`}
//       onFocus={onFocus}
//       onBlur={onBlur}
//     >
//       <table className={`min-w-full text-left border-collapse ${tableVariantClasses[variant]} ${dense ? 'text-sm' : ''}`}>
//         <thead className={`${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
//           <tr>
//             {columns.filter((c) => !c.hide).map((col) => (
//               <th
//                 key={col.id ?? String(col.field)}
//                 style={{ width: col.width }}
//                 className={`px-3 ${headerClasses} ${col.className ?? ''} ${
//                   col.align === 'center' ? 'text-center' : ''
//                 } ${col.align === 'right' ? 'text-right' : ''}`}
//                 aria-sort={
//                   sortState.field === String(col.field)
//                     ? sortState.order === 'asc'
//                       ? 'ascending'
//                       : 'descending'
//                     : undefined
//                 }
//               >
//                 <div className="flex items-center gap-2">
//                   {tooltip && col.tooltip ? (
//                     <Tooltip title={col.tooltip}>{col.headerName ?? String(col.field)}</Tooltip>
//                   ) : (
//                     <span>{col.headerName ?? String(col.field)}</span>
//                   )}

//                   {sortable && col.sortable !== false && (
//                     <button
//                       type="button"
//                       className="ml-1 text-gray-500 hover:text-[var(--color-primary)]"
//                       onClick={() => handleSort(String(col.field))}
//                       aria-label={`Sort by ${col.headerName ?? String(col.field)}`}
//                     >
//                       <svg
//                         className={`w-3 h-3 inline-block transform ${
//                           sortState.field === String(col.field) && sortState.order === 'desc'
//                             ? 'rotate-180'
//                             : ''
//                         }`}
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                       >
//                         <path d="M6 9l6-6 6 6" />
//                         <path d="M6 15l6 6 6-6" />
//                       </svg>
//                     </button>
//                   )}
//                 </div>
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {sortedRows.map((row, rowIndex) => (
//             <tr
//               key={rowIndex}
//               className={`hover:bg-(--color-primary-light) ${
//                 variant === 'striped' ? (rowIndex % 2 === 0 ? 'bg-white' : 'bg-(--color-primary-light)') : ''
//               } cursor-pointer`}
//               onClick={() => onRowClick?.(row)}
//             >
//               {columns
//                 .filter((c) => !c.hide)
//                 .map((col) => (
//                   <td
//                     key={col.id ?? String(col.field)}
//                     className={`px-3 ${baseRowClass} ${col.className ?? ''} ${
//                       col.align === 'center' ? 'text-center' : ''
//                     } ${col.align === 'right' ? 'text-right' : ''}`}
//                   >
//                     {col.renderCell
//                       ? col.renderCell(row)
//                       : (() => {
//                           const value = row[col.field];
//                           if (value === null || value === undefined) return '';
//                           if (typeof value === 'object') return JSON.stringify(value);
//                           return String(value);
//                         })()}
//                   </td>
//                 ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
