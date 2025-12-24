import React, { useEffect, useRef } from 'react';

/**
 * BackdropProps
 * - className: additional classes applied to the backdrop element.
 *
 * Note: we avoid inline style objects per project guidelines and prefer Tailwind + token classes.
 */
export interface BackdropProps {
  className?: string;
}

/**
 * ModalProps
 * - isOpen: controlled open state
 * - onClose: called when backdrop clicked or Escape pressed
 * - disableEscapeKeyDown: when true, pressing Escape will not trigger onClose
 * - hideBackdrop: when true, no backdrop is rendered
 * - BackdropProps: pass-through for the backdrop element (className only)
 * - className: additional classes for the modal wrapper
 * - title: modal title/header
 * - slots: named slots for custom content (header, footer, actions)
 */
export interface ModalProps {
  id?: string;
  /** Controlled open state */
  isOpen?: boolean;
  onClose?: (event?: unknown) => void;
  children?: React.ReactNode;
  disableEscapeKeyDown?: boolean;
  hideBackdrop?: boolean;
  BackdropProps?: BackdropProps;
  className?: string;
  title?: React.ReactNode;
  slots?: Record<string, React.ReactNode>;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** max width of the modal content (CSS value, e.g. '600px' or '90vw') */
  maxWidth?: string;
  /** max height of the modal content (CSS value, e.g. '80vh') */
  maxHeight?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-controls'?: string;
  'aria-modal'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

/**
 * Modal
 * A minimal, reusable Modal component following project conventions from
 * `.github/prompts/04-reusable-component.prompt.md`.
 *
 * - Uses Tailwind utility classes and CSS tokens from `tokens.css` (no new tokens added)
 * - Supports `className` for style extension
 * - Keyboard: Escape handling (respects `disableEscapeKeyDown`)
 * - Accessibility: role="dialog" and aria-label support; focuses the container when opened
 */
const Modal: React.FC<ModalProps> = ({
  id,
  isOpen = false,
  onClose,
  children,
  disableEscapeKeyDown = false,
  hideBackdrop = false,
  BackdropProps,
  className = '',
  title,
  slots,
  onClick,
  maxWidth,
  maxHeight,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-controls': ariaControls,
  'aria-modal': ariaModal,
  'aria-live': ariaLive,
}) => {
  const containerRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableEscapeKeyDown && isOpen) {
        onClose?.(undefined);
      }
    };
    globalThis.addEventListener('keydown', onKey);
    return () => globalThis.removeEventListener('keydown', onKey);
  }, [isOpen, disableEscapeKeyDown, onClose]);

  // Focus the dialog container when opened for accessibility.
  useEffect(() => {
    if (isOpen) {
      containerRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const backdropClassName = "absolute inset-0 bg-[var(--color-backdrop)] " + (BackdropProps?.className ?? '');
  const dialogClassName = "relative z-10 w-full max-w-lg p-[var(--padding-medium)] bg-[var(--color-white)] shadow-lg outline-none " + className;

  return (
    <div id={id} className={`fixed inset-0 z-50 flex items-center justify-center`}>
      {!hideBackdrop && (
        <button
          type="button"
          aria-label="close modal"
          onClick={() => onClose?.(undefined)}
          className={backdropClassName}
          style={{ border: 'none', padding: 0, cursor: 'pointer' }}
        />
      )}
      <dialog
        ref={containerRef}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-controls={ariaControls}
        aria-modal={ariaModal}
        aria-live={ariaLive}
        onClick={(e) => onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>)}
        className={dialogClassName}
        data-max-width={maxWidth}
        data-max-height={maxHeight}
      >
        {/* Header */}
        {slots?.header ?? (title ? <div className="mb-[var(--gap-small)] font-medium">{title}</div> : null)}

        {/* Body (scrollable) */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: maxHeight ?? "80vh" }}
        >
          {children}
        </div>

        {/* Footer */}
        {slots?.footer}

        {slots?.actions}

        {/* Close button */}
        {onClose && (
          <button
            type="button"
            aria-label="close"
            onClick={() => onClose?.(undefined)}
            className="absolute top-2 right-2 text-[var(--color-text-secondary)]"
          >
            ×
          </button>
        )}
      </dialog>
    </div>
  );
};

export default Modal;
