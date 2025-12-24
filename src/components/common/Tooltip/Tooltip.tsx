
import React, { useEffect, useRef, useState } from "react";

export interface TooltipProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
  placement?: "top" | "bottom" | "left" | "right";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  enterDelay?: number;
  leaveDelay?: number;
}


const sizeMap: Record<string, string> = {
  small: "p-[var(--padding-small)] text-[var(--font-size-small)]",
  medium: "p-[var(--padding-medium)] text-[var(--font-size-medium)]",
  large: "p-[var(--padding-large)] text-[var(--font-size-large)]",
};

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  className = "",
  size = "medium",
  placement = "top",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  enterDelay = 100,
  leaveDelay = 100,
}) => {
  const [open, setOpen] = useState(false);
  const [tooltipId] = useState(() => `tooltip-${Math.random().toString(36).slice(2, 9)}`);
  const enterTimer = useRef<number | null>(null);
  const leaveTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (enterTimer.current) globalThis.clearTimeout(enterTimer.current);
      if (leaveTimer.current) globalThis.clearTimeout(leaveTimer.current);
    };
  }, []);

  const show = () => {
    if (leaveTimer.current) globalThis.clearTimeout(leaveTimer.current);
    enterTimer.current = globalThis.setTimeout(() => setOpen(true), enterDelay);
  };

  const hide = () => {
    if (enterTimer.current) globalThis.clearTimeout(enterTimer.current);
    leaveTimer.current = globalThis.setTimeout(() => setOpen(false), leaveDelay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      hide();
    }
  };

  
  const placementClass: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2",
    bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2",
    left: "right-full top-1/2 -translate-y-1/2 -translate-x-2",
    right: "left-full top-1/2 -translate-y-1/2 translate-x-2",
  };


  const arrowClass: Record<string, string> = {
    top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45",
    bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45",
    left: "right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45",
    right: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45",
  };

  // Determine aria-describedby for children based on state
  const childAriaDescribedBy = ariaDescribedby || (open ? tooltipId : undefined);

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={handleKeyDown}
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={open ? ariaDescribedby || tooltipId : ariaDescribedby}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            ...(childAriaDescribedBy ? { "aria-describedby": childAriaDescribedBy } : {}),
            ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
            ...(ariaLabelledby ? { "aria-labelledby": ariaLabelledby } : {}),
          } as Record<string, unknown>)
        : children}

      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className={`
            flex
            z-50 absolute 
            ${placementClass[placement]} 
            ${sizeMap[size]} 
            rounded 
            shadow-[0_4px_10px_rgba(0,0,0,0.15)]
            text-[var(--color-black)] 
            bg-[var(--color-white)]
            max-w-xs
            break-words
            ${className}
          `}
        >
          <span className="inline">{title}</span>

         
          <span
            aria-hidden
            className={`
              absolute w-2 h-2 
              bg-[var(--color-black)]
              ${arrowClass[placement]}
            `}
            style={{ transformOrigin: "center" }}
          />
        </span>
      )}
    </div>
  );
};

export default Tooltip;
