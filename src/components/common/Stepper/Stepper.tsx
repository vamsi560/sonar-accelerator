/**
 * Stepper Component
 *
 * A visual indicator component that displays progress through a sequence of steps.
 * Supports both horizontal and vertical orientations with customizable styling.
 * Uses design tokens from tokens.css for consistent theming and sizing.
 *
 * Props:
 * - id: Unique identifier for the component
 * - className: Additional CSS classes for custom styling
 * - type: 'linear' | 'non-linear' - determines if steps must be completed in order
 * - value: Current step index
 * - defaultValue: Initial step index (if value is not controlled)
 * - disabled: Disables interaction with the stepper
 * - min: Minimum step index (default: 0)
 * - max: Maximum step index (number of steps - 1)
 * - step: Step increment value (default: 1)
 * - title: Tooltip or title text
 * - activeStep: Currently active/highlighted step
 * - onClick: Callback when a step is clicked
 * - onFocus: Callback when a step receives focus
 * - onBlur: Callback when a step loses focus
 * - aria-label: Accessibility label
 * - aria-labelledby: ID of labeling element
 * - aria-describedby: ID of descriptive element
 * - aria-disabled: Indicates if component is disabled
 * - aria-controls: ID of controlled element
 * - aria-current: Marks the current step
 * - aria-live: Live region updates
 */

import React, { useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';

export interface StepperStep {
  /**
   * Label or title for the step
   */
  label: React.ReactNode;

  /**
   * Content to display for this step
   */
  content?: React.ReactNode;

  /**
   * Indicates if step is completed
   */
  completed?: boolean;

  /**
   * Describes the step (for accessibility)
   */
  description?: React.ReactNode;

  /**
   * Whether step is disabled
   */
  disabled?: boolean;

  /**
   * Optional icon or custom element for the step
   */
  icon?: React.ReactNode;
}

export interface StepperProps {
  /**
   * Array of step objects defining the stepper flow
   */
  steps: StepperStep[];

  /**
   * Unique identifier for the component
   */
  id?: string;

  /**
   * Additional CSS classes for custom styling
   */
  className?: string;

  /**
   * Stepper type: 'linear' requires steps in order, 'non-linear' allows any order
   */
  type?: 'linear' | 'non-linear';

  /**
   * Current step value (controlled)
   */
  value?: number;

  /**
   * Initial step value (uncontrolled)
   */
  defaultValue?: number;

  /**
   * Disables all interactions with the stepper
   */
  disabled?: boolean;

  /**
   * Minimum step index
   */
  min?: number;

  /**
   * Maximum step index
   */
  max?: number;

  /**
   * Step increment value
   */
  step?: number;

  /**
   * Tooltip or title text displayed on hover
   */
  title?: string;

  /**
   * Currently active/highlighted step (for uncontrolled usage)
   */
  activeStep?: number;

  /**
   * Stepper orientation: horizontal or vertical
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Whether to show alternative labels below steps
   */
  alternativeLabel?: boolean;

  /**
   * Connector element between steps
   */
  connector?: React.ReactNode;

  /**
   * Color variant using design tokens
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';

  /**
   * Size variant: small, medium, large
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Callback when a step is clicked
   */
  onClick?: (stepIndex: number) => void;

  /**
   * Callback when a step receives focus
   */
  onFocus?: (stepIndex: number) => void;

  /**
   * Callback when a step loses focus
   */
  onBlur?: (stepIndex: number) => void;

  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;

  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;

  /**
   * ID of element that labels this component
   */
  'aria-labelledby'?: string;

  /**
   * ID of element that describes this component
   */
  'aria-describedby'?: string;

  /**
   * Indicates if component is disabled
   */
  'aria-disabled'?: boolean;

  /**
   * ID of element controlled by this stepper
   */
  'aria-controls'?: string;

  /**
   * Marks the current/active step
   */
  'aria-current'?: 'step' | 'page' | 'location' | 'date' | 'time' | boolean;

  /**
   * Live region announcement mode
   */
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

/**
 * Color map using CSS custom properties from tokens.css
 * Maps component color prop values to Tailwind text utility classes
 */
const colorMap: Record<string, string> = {
  primary: 'text-[var(--color-primary)]',
  secondary: 'text-[var(--color-secondary)]',
  error: 'text-[var(--color-error)]',
  info: 'text-[var(--color-info)]',
  success: 'text-[var(--color-success)]',
  warning: 'text-[var(--color-warning)]',
  inherit: 'text-inherit',
};

/**
 * Background color map for active step using design tokens
 */
const bgColorMap: Record<string, string> = {
  primary: 'bg-[var(--color-primary)]',
  secondary: 'bg-[var(--color-secondary)]',
  error: 'bg-[var(--color-error)]',
  info: 'bg-[var(--color-info)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  inherit: 'bg-inherit',
};

/**
 * Size map for step indicator dimensions
 * Maps size prop values to Tailwind width and height classes
 */
const sizeMap: Record<string, { button: string; text: string; icon: string }> = {
  small: {
    button: 'w-7 h-7',
    text: 'text-xs',
    icon: 'text-sm',
  },
  medium: {
    button: 'w-10 h-10',
    text: 'text-base',
    icon: 'text-lg',
  },
  large: {
    button: 'w-12 h-12',
    text: 'text-lg',
    icon: 'text-2xl',
  },
};

/**
 * Stepper Component
 *
 * A comprehensive stepper component for guiding users through multi-step processes.
 * Supports both controlled and uncontrolled usage with full accessibility features.
 * Integrates with design tokens for colors, sizing, and theming.
 *
 * @component
 * @example
 * // Horizontal stepper with linear flow
 * const steps = [
 *   { label: 'Step 1', description: 'First step' },
 *   { label: 'Step 2', description: 'Second step' },
 *   { label: 'Step 3', description: 'Third step' },
 * ];
 * <Stepper id="main-stepper" steps={steps} value={0} type="linear" />
 *
 * @example
 * // Vertical stepper with non-linear flow
 * <Stepper
 *   steps={steps}
 *   activeStep={1}
 *   orientation="vertical"
 *   type="non-linear"
 *   onClick={(idx) => console.log('Step clicked:', idx)}
 * />
 *
 * @param props - StepperProps
 * @returns JSX.Element
 */
const Stepper: React.FC<StepperProps> = ({
  steps,
  id,
  className,
  type = 'linear',
  value: controlledValue,
  defaultValue = 0,
  disabled = false,
  min = 0,
  max = steps.length - 1,
  step: stepIncrement = 1,
  title,
  activeStep: legacyActiveStep,
  orientation = 'horizontal',
  alternativeLabel = false,
  connector,
  color = 'primary',
  size = 'medium',
  onClick,
  onFocus,
  onBlur,
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-disabled': ariaDisabled,
  'aria-controls': ariaControls,
  'aria-current': ariaCurrent,
  'aria-live': ariaLive = 'polite',
}) => {
  // Determine active step - prioritize controlled value, then legacy prop, then uncontrolled
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(Math.max(min ?? 0, defaultValue));
  const currentStep = isControlled ? Math.min(controlledValue, max ?? steps.length - 1) : (legacyActiveStep ?? uncontrolledValue);

  /**
   * Handle step click with validation and callbacks
   */
  const handleStepClick = (stepIndex: number) => {
    if (disabled || steps[stepIndex]?.disabled) return;

    // Validate step index is within bounds
    const validatedIndex = Math.max(min ?? 0, Math.min(stepIndex, max ?? steps.length - 1));

    // In linear mode, only allow navigating to completed or current/next steps
    if (type === 'linear' && validatedIndex > currentStep) {
      // Check if all previous steps are completed
      const canProceed = steps.slice(0, validatedIndex).every((s) => s.completed);
      if (!canProceed) return;
    }

    if (!isControlled) {
      setUncontrolledValue(validatedIndex);
    }

    onClick?.(validatedIndex);
  };

  /**
   * Handle step focus
   */
  const handleStepFocus = (stepIndex: number) => {
    onFocus?.(stepIndex);
  };

  /**
   * Handle step blur
   */
  const handleStepBlur = (stepIndex: number) => {
    onBlur?.(stepIndex);
  };

  /**
   * Handle keyboard navigation for step increment/decrement
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, stepIndex: number) => {
    if (disabled) return;

    let nextStep: number | null = null;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextStep = Math.min(currentStep + (stepIncrement ?? 1), max ?? steps.length - 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextStep = Math.max(currentStep - (stepIncrement ?? 1), min ?? 0);
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextStep = min ?? 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextStep = max ?? steps.length - 1;
    }

    if (nextStep !== null && nextStep !== stepIndex) {
      handleStepClick(nextStep);
    }
  };

  /**
   * Get accessibility properties for current step
   */
  const getCurrentStepAriaProps = (stepIndex: number) => {
    const isCurrentStep = stepIndex === currentStep;
    return {
      'aria-current': isCurrentStep ? (ariaCurrent || 'step') : undefined,
      'aria-selected': isCurrentStep,
    };
  };

  const stepperContent = (
    <div
      id={id}
      className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} ${
        alternativeLabel && orientation === 'horizontal' ? 'justify-between' : ''
      } gap-4 ${className || ''}`}
      style={style}
      role="tablist"
      aria-orientation={orientation}
      aria-label={ariaLabel || `Stepper with ${steps.length} steps`}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-disabled={ariaDisabled ?? disabled}
      aria-controls={ariaControls}
      aria-live={ariaLive}
    >
      {steps.map((stepData, stepIndex) => {
        const isActive = stepIndex === currentStep;
        const isCompleted = stepData.completed ?? stepIndex < currentStep;
        const isDisabled = disabled || stepData.disabled;
        const canNavigate =
          type === 'non-linear' || stepIndex <= currentStep || (isCompleted && stepIndex === currentStep + 1);

        return (
          <div
            key={stepIndex}
            className={`flex items-center ${
              orientation === 'vertical' ? 'mb-4' : 'relative'
            } ${alternativeLabel && orientation === 'horizontal' ? 'flex-col' : ''}`}
          >
            {/* Step indicator button */}
            <button
              type="button"
              className={`flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                sizeMap[size].button
              } font-semibold ${
                isActive
                  ? `${bgColorMap[color]} text-white border-transparent`
                  : isCompleted
                    ? `bg-[var(--color-success)] text-white border-[var(--color-success)]`
                    : `bg-white border-[var(--color-secondary-light)] ${colorMap[color]}`
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'} ${
                sizeMap[size].icon
              }`}
              aria-label={
                ariaLabel || `${typeof stepData.label === 'string' ? stepData.label : `Step ${stepIndex + 1}`}`
              }
              onClick={() => handleStepClick(stepIndex)}
              onKeyDown={(e) => handleKeyDown(e, stepIndex)}
              onFocus={() => handleStepFocus(stepIndex)}
              onBlur={() => handleStepBlur(stepIndex)}
              disabled={isDisabled || !canNavigate}
              tabIndex={isActive ? 0 : -1}
              {...getCurrentStepAriaProps(stepIndex)}
            >
              {stepData.icon ? (
                stepData.icon
              ) : isCompleted ? (
                <span className="text-lg">✓</span>
              ) : (
                <span>{stepIndex + 1}</span>
              )}
            </button>

            {/* Step label and description */}
            <div className={`${alternativeLabel ? 'mt-2 text-center' : 'ml-3'}`}>
              <p className={`font-semibold ${sizeMap[size].text} ${isActive ? colorMap[color] : 'text-gray-700'}`}>
                {stepData.label}
              </p>
              {stepData.description && (
                <p className={`text-gray-600 text-xs mt-1`}>{stepData.description}</p>
              )}
            </div>

            {/* Connector between steps */}
            {stepIndex < steps.length - 1 && (
              <div
                className={`${
                  orientation === 'vertical'
                    ? 'ml-5 h-8 w-0.5 my-1'
                    : 'absolute top-5 left-full ml-2 h-0.5 w-12'
                } ${isCompleted ? 'bg-[var(--color-success)]' : 'bg-[var(--color-secondary-light)]'}`}
              >
                {connector}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return title ? (
    <Tooltip title={title}>{stepperContent}</Tooltip>
  ) : (
    stepperContent
  );
};

export default Stepper;
