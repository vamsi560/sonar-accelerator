import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type SnackbarSize = "small" | "medium" | "large";
export type SnackbarVariant = "filled" | "outlined" | "standard";

export interface SnackbarProps {
  id?: string;
  className?: string; // wraps the outer portal container
  snackbarClassName?: string; // custom classes for the snackbar box
  closeButtonClassName?: string; // custom classes for close button
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
  size?: SnackbarSize;
  variant?: SnackbarVariant;
  autoHideDuration?: number; // ms
  position?:
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
    | "top-right"
    | "top-left"
    | "top-center";
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;

  enterAnimation?: string; // Tailwind classes for enter
  exitAnimation?: string; // Tailwind classes for exit

  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-live"?: "off" | "polite" | "assertive";
}

const sizeClasses: Record<SnackbarSize, string> = {
  small: "text-sm px-3 py-1.5",
  medium: "text-base px-4 py-2",
  large: "text-lg px-6 py-3",
};

const variantClasses: Record<SnackbarVariant, string> = {
  filled: "bg-[var(--color-primary)] text-white",
  outlined: "bg-white border border-[var(--color-primary)] text-[var(--color-primary)]",
  standard: "bg-white text-gray-800 shadow-sm",
};

const positionClasses: Record<string, string> = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
  "top-center": "top-6 left-1/2 -translate-x-1/2",
};

const DEFAULT_ENTER_ANIMATION = "transition-all duration-200 ease-out opacity-100 scale-100";
const DEFAULT_EXIT_ANIMATION = "transition-all duration-200 ease-in opacity-0 scale-95";

export const Snackbar: React.FC<SnackbarProps> = ({
  id,
  className = "",
  snackbarClassName = "",
  closeButtonClassName = "",
  size = "medium",
  variant = "standard",
  position = "bottom-right",
  startDecorator,
  endDecorator,
  autoHideDuration = 3000,
  open = true,
  onClose,
  children,
  enterAnimation = DEFAULT_ENTER_ANIMATION,
  exitAnimation = DEFAULT_EXIT_ANIMATION,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-live": ariaLive = "polite",
}) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true);
    globalThis.setTimeout(() => onClose?.(), 200);
  }, [onClose]);

  // Auto-hide
  useEffect(() => {
    if (!open || isAnimatingOut) return;
    if (autoHideDuration && autoHideDuration > 0) {
      if (timerRef.current) globalThis.clearTimeout(timerRef.current);
      timerRef.current = globalThis.setTimeout(handleClose, autoHideDuration);
    }
    return () => {
      if (timerRef.current) {
        globalThis.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [open, isAnimatingOut, autoHideDuration, handleClose]);

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    globalThis.addEventListener("keydown", handleKey);
    return () => globalThis.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  if (!open && !isAnimatingOut) return null;

  const role = ariaLive === "assertive" ? "alert" : "status";
  const isVisible = open && !isAnimatingOut;

  return createPortal(
    <div className={`fixed inset-0 z-50 pointer-events-none ${className}`}>
      <div
        className={`absolute pointer-events-auto ${positionClasses[position]} ${isVisible ? enterAnimation : exitAnimation}`}
      >
        <div
          id={id}
          role={role}
          aria-live={ariaLive}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          className={`min-w-[260px] max-w-md flex items-center gap-3 rounded-lg shadow-lg
            ${sizeClasses[size]} ${variantClasses[variant]} ${snackbarClassName}`}
        >
          {startDecorator && <span className="flex items-center">{startDecorator}</span>}
          <div className="flex-1 truncate">{children}</div>
          {endDecorator && <span className="flex items-center">{endDecorator}</span>}

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className={`ml-2 inline-flex items-center justify-center rounded-md p-1 hover:bg-gray-200 ${closeButtonClassName}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Snackbar;
