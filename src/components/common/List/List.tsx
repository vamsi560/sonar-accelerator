import React, { forwardRef, useRef, useImperativeHandle } from 'react';

/**
 * ListProps
 * - A reusable list component modeled after MUI List UX.
 * - Uses tooltip instead of title for better accessibility
 * - The <ul> element has implicit list role, no need to add role="list"
 */
export interface ListProps {
  id?: string;
  className?: string;
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-controls'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  children?: React.ReactNode;
}

const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const {
    id,
    className = '',
    tooltip,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-controls': ariaControls,
    'aria-live': ariaLive = 'off',
    children,
  } = props;

  const innerRef = useRef<HTMLUListElement | null>(null);
  useImperativeHandle<HTMLUListElement | null, HTMLUListElement | null>(ref, () => innerRef.current);

  return (
    <ul
      ref={innerRef}
      id={id}
      className={`list-none p-0 m-0 flex flex-col gap-[var(--gap-xsmall)] bg-[var(--color-white)] rounded border border-[var(--color-divider)] ${className}`}
      title={tooltip}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-controls={ariaControls}
      aria-live={ariaLive}
    >
      {children}
    </ul>
  );
});

List.displayName = 'List';

export default List;
