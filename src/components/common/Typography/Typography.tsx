import React, { useMemo, useId } from 'react';
import '../../../styles/tokens.css';

type TypographySize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label' | 'caption' | 'span' | 'blockquote';

export interface Props {
  id?: string;
  className?: string;
  size?: TypographySize;
  variant?: TypographyVariant;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  children: React.ReactNode;
  htmlFor?: string;
}

const Typography = ({
  id,
  className = '',
  size,
  variant = 'p',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-hidden': ariaHidden = false,
  'aria-live': ariaLive,
  children,
  htmlFor,
}: Props) => {
  const generatedId = useId();
  const elementId = id || `typography-${generatedId}`;

  const sizeClasses = useMemo(() => {
    const sizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    };
    return sizes[size || 'base'];
  }, [size]);

  const variantClasses = useMemo(() => {
    const variants = {
      h1: 'text-4xl font-bold leading-tight tracking-tighter',
      h2: 'text-3xl font-bold leading-tight tracking-tighter',
      h3: 'text-2xl font-bold leading-snug',
      h4: 'text-xl font-semibold leading-snug',
      h5: 'text-lg font-semibold leading-snug',
      h6: 'text-base font-semibold leading-normal',
      p: 'text-base leading-relaxed',
      label: 'text-sm font-medium leading-none',
      caption: 'text-xs leading-tight text-gray-600',
      span: 'text-base leading-normal',
      blockquote: 'text-lg leading-relaxed italic border-l-4 border-l-gray-300 pl-4',
    };
    return variants[variant];
  }, [variant]);

  const Component = (
    variant === 'h1'
      ? 'h1'
      : variant === 'h2'
        ? 'h2'
        : variant === 'h3'
          ? 'h3'
          : variant === 'h4'
            ? 'h4'
            : variant === 'h5'
              ? 'h5'
              : variant === 'h6'
                ? 'h6'
                : variant === 'label'
                  ? 'label'
                  : variant === 'blockquote'
                    ? 'blockquote'
                    : variant === 'span'
                      ? 'span'
                      : 'p'
  ) as React.ElementType;

  const computedClasses = useMemo(() => {
    const baseClasses = 'text-gray-900 font-sans';
    const sizeOverride = size ? sizeClasses : '';
    const variantBase = variantClasses;

    return [baseClasses, sizeOverride || variantBase, className].filter(Boolean).join(' ');
  }, [size, sizeClasses, variantClasses, className]);

  return (
    <Component
      id={elementId}
      className={computedClasses}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-hidden={ariaHidden || undefined}
      aria-live={ariaLive}
      {...(htmlFor && { htmlFor })}
    >
      {children}
    </Component>
  );
};

export default Typography;
