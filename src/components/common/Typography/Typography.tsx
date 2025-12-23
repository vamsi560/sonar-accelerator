
import React from 'react';

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'button'
  | 'inherit';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children?: React.ReactNode; 
  variant?: Variant;


  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaHidden?: boolean;
  ariaLive?: 'off' | 'polite' | 'assertive' | undefined;
}


const variantTagMap: Record<Variant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'p', 
  subtitle2: 'p', 
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  button: 'span',
  inherit: 'span',
};

const variantClassMap: Record<Variant, string> = {
  h1: 'text-[32px] leading-tight font-extrabold',
  h2: 'text-[28px] leading-tight font-bold',
  h3: 'text-[24px] leading-tight font-semibold',
  h4: 'text-[20px] leading-snug font-semibold',
  h5: 'text-[18px] leading-snug font-semibold',
  h6: 'text-[16px] leading-snug font-medium',
  subtitle1: 'text-[16px] leading-snug font-medium text-[var(--color-primary-dark)]',
  subtitle2: 'text-[14px] leading-snug font-medium text-[var(--color-primary-dark)]',
  body1: 'text-[var(--font-size-medium)] leading-relaxed text-[var(--color-black)]',
  body2: 'text-[var(--font-size-small)] leading-relaxed text-[var(--color-black)]',
  caption: 'text-[12px] leading-snug text-[var(--color-black)]',
  overline: 'text-[10px] uppercase tracking-wider text-[var(--color-black)]',
  button: 'text-[14px] uppercase font-medium text-[var(--color-primary)]',
  inherit: '',
};

const Typography: React.FC<TypographyProps> = ({
  id,
  className = '',
  children,
  variant = 'body1',
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaHidden,
  ariaLive,
  ...rest
}) => {
  const ComponentTag = variantTagMap[variant] || 'p';
  const variantClass = variantClassMap[variant] || '';

  const baseClass = `block ${variantClass} ${className}`.trim();

  const props: React.HTMLAttributes<HTMLElement> = {
    id,
    className: baseClass,

   
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    ...rest,
  };

  return React.createElement(ComponentTag as React.ElementType, props, children);
};

export default Typography;
