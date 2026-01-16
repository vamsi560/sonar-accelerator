import React, { useMemo, useId, useState, useRef, useEffect } from 'react';
import '../../../styles/tokens.css';

type TooltipSize = 'small' | 'medium' | 'large';
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';

export interface Props {
  className?: string;
  title: string;
  size?: TooltipSize;
  placement?: TooltipPlacement;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  children: React.ReactNode;
  delayShow?: number;
  delayHide?: number;
  disabled?: boolean;
}

const Tooltip = ({
  className = '',
  title,
  size = 'medium',
  placement = 'top',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  children,
  delayShow = 200,
  delayHide = 100,
  disabled = false,
}: Props) => {
  const generatedId = useId();
  const tooltipId = `tooltip-${generatedId}`;
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const showTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const hideTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const sizeClasses = useMemo(() => {
    const sizes = {
      small: 'px-2 py-1 text-xs',
      medium: 'px-3 py-2 text-sm',
      large: 'px-4 py-3 text-base',
    };
    return sizes[size];
  }, [size]);

  const placementClasses = useMemo(() => {
    const placements = {
      top: '-translate-y-full -translate-x-1/2 left-1/2 bottom-full mb-2',
      bottom: 'translate-y-full -translate-x-1/2 left-1/2 top-full mt-2',
      left: '-translate-x-full -translate-y-1/2 right-full top-1/2 mr-2',
      right: 'translate-x-full -translate-y-1/2 left-full top-1/2 ml-2',
      'top-start': '-translate-y-full left-0 bottom-full mb-2',
      'top-end': '-translate-y-full right-0 bottom-full mb-2',
      'bottom-start': 'translate-y-full left-0 top-full mt-2',
      'bottom-end': 'translate-y-full right-0 top-full mt-2',
      'left-start': '-translate-x-full top-0 right-full mr-2',
      'left-end': '-translate-x-full bottom-0 right-full mr-2',
      'right-start': 'translate-x-full top-0 left-full ml-2',
      'right-end': 'translate-x-full bottom-0 left-full ml-2',
    };
    return placements[placement];
  }, [placement]);

  const arrowClasses = useMemo(() => {
    const arrows = {
      top: 'bottom-0 translate-y-full -translate-x-1/2 left-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent',
      bottom: 'top-0 -translate-y-full -translate-x-1/2 left-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent',
      left: 'right-0 translate-x-full -translate-y-1/2 top-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent',
      right: 'left-0 -translate-x-full -translate-y-1/2 top-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent',
      'top-start': 'bottom-0 translate-y-full left-2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent',
      'top-end': 'bottom-0 translate-y-full right-2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent',
      'bottom-start': 'top-0 -translate-y-full left-2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent',
      'bottom-end': 'top-0 -translate-y-full right-2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent',
      'left-start': 'right-0 translate-x-full top-2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent',
      'left-end': 'right-0 translate-x-full bottom-2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent',
      'right-start': 'left-0 -translate-x-full top-2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent',
      'right-end': 'left-0 -translate-x-full bottom-2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent',
    };
    return arrows[placement];
  }, [placement]);

  const handleMouseEnter = () => {
    if (disabled) return;
    
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayShow);
  };

  const handleMouseLeave = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, delayHide);
  };

  const handleFocus = () => {
    if (disabled) return;
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children}
      </div>

      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          className={`absolute z-50 pointer-events-none ${placementClasses} ${sizeClasses} bg-gray-900 text-white rounded-lg shadow-lg whitespace-nowrap transition-opacity duration-200 opacity-100 ${className}`}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
        >
          {title}
          <div
            className={`absolute w-0 h-0 border-gray-900 ${arrowClasses}`}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
