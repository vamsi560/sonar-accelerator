import React, { useMemo, useId } from 'react';
import '../../../styles/tokens.css';

type ListType = 'ul' | 'ol';
type AriaLive = 'off' | 'polite' | 'assertive';
type AriaOrientation = 'horizontal' | 'vertical';

interface ListItemProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const ListItem = ({ id, className = '', children }: ListItemProps) => {
  const combinedClassName = ['px-3 py-2 hover:bg-gray-50 rounded transition-colors duration-200', className]
    .filter(Boolean)
    .join(' ');

  return (
    <li id={id} className={combinedClassName}>
      {children}
    </li>
  );
};

export interface Props {
  id?: string;
  className?: string;
  title?: string;
  tooltip?: string;
  type?: ListType;
  items?: Array<{
    id?: string;
    label?: string;
    className?: string;
    children?: React.ReactNode;
  }>;
  children?: React.ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-controls'?: string;
  'aria-live'?: AriaLive;
  'aria-orientation'?: AriaOrientation;
}

export const List = ({
  id,
  className = '',
  title,
  tooltip,
  type = 'ul',
  items = [],
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-controls': ariaControls,
  'aria-live': ariaLive,
  'aria-orientation': ariaOrientation,
}: Props) => {
  const generatedId = useId();
  const listId = id || `list-${generatedId}`;
  const titleId = title ? `${listId}-title` : undefined;
  const descriptionIds = [ariaDescribedby, tooltip ? `${listId}-tooltip` : undefined]
    .filter(Boolean)
    .join(' ');

  const listAriaLabelledby = useMemo(() => {
    const ids = [ariaLabelledby, titleId].filter(Boolean);
    return ids.length > 0 ? ids.join(' ') : undefined;
  }, [ariaLabelledby, titleId]);

  const baseListClasses = 'flex flex-col gap-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm';
  const combinedListClassName = [baseListClasses, className].filter(Boolean).join(' ');

  const ListComponent = type === 'ol' ? 'ol' : 'ul';

  return (
    <div className="space-y-2">
      {title && (
        <h3 id={titleId} className="text-sm font-semibold text-gray-700">
          {title}
        </h3>
      )}

      <ListComponent
        id={listId}
        className={combinedListClassName}
        title={tooltip}
        aria-label={ariaLabel}
        aria-labelledby={listAriaLabelledby}
        aria-describedby={descriptionIds || undefined}
        aria-controls={ariaControls}
        aria-live={ariaLive}
        aria-orientation={ariaOrientation}
      >
        {items.length > 0
          ? items.map((item, index) => (
              <ListItem key={item.id || index} id={item.id} className={item.className}>
                {item.children || item.label}
              </ListItem>
            ))
          : children}
      </ListComponent>

      {tooltip && (
        <span id={`${listId}-tooltip`} className="sr-only">
          {tooltip}
        </span>
      )}
    </div>
  );
};

export default List;
