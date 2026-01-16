import React, { useMemo } from 'react';
import type { ReactNode } from 'react';
import '../../../styles/tokens.css';

type CardSize = 'small' | 'medium' | 'large';
type CardVariant = 'default' | 'elevated' | 'outlined';
type AriaLive = 'off' | 'polite' | 'assertive';
type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time';
type AriaHaspopup = boolean | 'listbox' | 'dialog' | 'grid' | 'menu' | 'tree';

interface Props {
  id?: string;
  className?: string;
  tabIndex?: number;
  size?: CardSize;
  variant?: CardVariant;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-current'?: AriaCurrent;
  'aria-live'?: AriaLive;
  'aria-haspopup'?: AriaHaspopup;
  children?: ReactNode;
}

const Card = ({
  id,
  className = '',
  tabIndex,
  size = 'medium',
  variant = 'default',
  onClick,
  onFocus,
  onBlur,
  tooltip,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-hidden': ariaHidden,
  'aria-current': ariaCurrent,
  'aria-live': ariaLive,
  'aria-haspopup': ariaHaspopup,
  children,
}: Props) => {
  const isInteractive = Boolean(onClick);

  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'small':
        return 'p-3 gap-1';
      case 'large':
        return 'p-6 gap-3';
      case 'medium':
      default:
        return 'p-4 gap-3';
    }
  }, [size]);

  const variantClasses = useMemo(() => {
    switch (variant) {
      case 'elevated':
        return 'bg-white shadow-lg hover:shadow-2xl';
      case 'outlined':
        return 'bg-transparent border-2 hover:bg-gray-50';
      case 'default':
      default:
        return 'bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-400';
    }
  }, [variant]);

  const interactiveClasses = isInteractive
    ? 'cursor-pointer transition-all duration-200 hover:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2'
    : '';

  const combinedClassName = [
    'flex flex-col rounded-lg transition-all ease-in-out',
    sizeClasses,
    variantClasses,
    interactiveClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      id={id}
      className={combinedClassName}
      style={{
        '--focus-outline-color': 'var(--color-primary)',
        outlineColor: isInteractive ? 'var(--color-primary)' : undefined,
      } as React.CSSProperties}
      tabIndex={isInteractive ? tabIndex ?? 0 : tabIndex ?? -1}
      title={tooltip}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      role={isInteractive ? 'button' : undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-hidden={ariaHidden}
      aria-current={ariaCurrent}
      aria-live={ariaLive}
      aria-haspopup={ariaHaspopup}
    >
      {children}
    </div>
  );
};

export default Card;
