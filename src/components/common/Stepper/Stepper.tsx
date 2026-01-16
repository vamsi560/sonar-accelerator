import React from 'react';

interface StepperProps {
  id?: string;
  className?: string;
  type?: 'horizontal' | 'vertical';
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  title?: string;
  activeStep: number;
  onClick?: (step: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: 'step' | 'page' | 'location' | 'date' | 'time' | boolean;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  steps: string[];
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      id,
      className = '',
      type = 'horizontal',
      disabled = false,
      min = 0,
      max,
      title,
      activeStep,
      onClick,
      onFocus,
      onBlur,
      steps = [],
      ...ariaProps
    },
    ref,
  ) => {
    const maxSteps = max !== undefined ? max : steps.length - 1;

    const handleStepClick = (stepIndex: number) => {
      if (!disabled && stepIndex >= min && stepIndex <= maxSteps) {
        onClick?.(stepIndex);
      }
    };

    const getStepStatus = (stepIndex: number): 'completed' | 'active' | 'pending' => {
      const isBeforeCurrent = stepIndex < activeStep;
      const isCurrentStep = stepIndex === activeStep;
      if (isBeforeCurrent) return 'completed';
      if (isCurrentStep) return 'active';
      return 'pending';
    };

    const getStepIndicatorClass = (status: 'completed' | 'active' | 'pending'): string => {
      const baseClasses = 'transition-all duration-200';
      const statusClasses = {
        completed: 'bg-green-500 text-white',
        active: 'bg-blue-500 text-white ring-2 ring-blue-200',
        pending: 'bg-gray-200 text-gray-600',
      };
      return `${baseClasses} ${statusClasses[status]}`;
    };

    const getStepLabelClass = (status: 'completed' | 'active' | 'pending'): string => {
      const statusClasses = {
        completed: 'text-green-600',
        active: 'text-blue-600',
        pending: 'text-gray-600',
      };
      return `${statusClasses[status]}`;
    };

    const getConnectorClass = (status: 'completed' | 'active' | 'pending'): string => {
      const isCompleted = status === 'completed';
      return isCompleted ? 'bg-green-500' : 'bg-gray-200';
    };

    if (type === 'vertical') {
      return (
        <div
          ref={ref}
          id={id}
          className={`space-y-4 ${className}`}
          role="progressbar"
          aria-valuemin={min}
          aria-valuemax={maxSteps}
          aria-valuenow={activeStep}
          {...ariaProps}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
          )}
          {steps.map((stepLabel, index) => {
            const status = getStepStatus(index);
            const isActive = status === 'active';
            const isCompleted = status === 'completed';

            return (
              <div key={stepLabel} className="flex items-start">
                {/* Step indicator */}
                <div
                  className={`flex-shrink-0 mr-4 ${
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${getStepIndicatorClass(status)} ${disabled && isCompleted === false ? 'opacity-50' : ''}`}
                    aria-current={isActive ? ariaProps['aria-current'] : undefined}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                </div>

                {/* Step content */}
                <div className="flex-1 pt-1">
                  <button
                    type="button"
                    onClick={() => handleStepClick(index)}
                    disabled={disabled || index > maxSteps}
                    className={`text-left font-medium transition-colors duration-200 ${getStepLabelClass(status)} ${disabled && isCompleted === false ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {stepLabel}
                  </button>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-4 w-0.5 h-12 mt-12 ${getConnectorClass(status)}`}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Horizontal layout
    return (
      <div
        ref={ref}
        id={id}
        className={`w-full ${className}`}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={maxSteps}
        aria-valuenow={activeStep}
        {...ariaProps}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-8">{title}</h3>
        )}
        <div className="flex items-center">
          {steps.map((stepLabel, index) => {
            const status = getStepStatus(index);
            const isActive = status === 'active';
            const isCompleted = status === 'completed';
            const isNotLast = index < steps.length - 1;

            return (
              <React.Fragment key={stepLabel}>
                {/* Step indicator */}
                <div
                  className={`flex flex-col items-center flex-1 ${
                    isNotLast ? 'mr-2' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleStepClick(index)}
                    disabled={disabled || index > maxSteps}
                    className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold mb-2 ${getStepIndicatorClass(status)} ${disabled && isCompleted === false ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    aria-current={isActive ? ariaProps['aria-current'] : undefined}
                    aria-label={`${stepLabel} - Step ${index + 1} of ${steps.length}`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </button>
                  <span
                    className={`text-xs font-medium text-center transition-colors duration-200 ${getStepLabelClass(status)}`}
                  >
                    {stepLabel}
                  </span>
                </div>

                {/* Connector line */}
                {isNotLast && (
                  <div
                    className={`flex-1 h-1 mx-2 mb-8 transition-colors duration-200 ${getConnectorClass(status)}`}
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  },
);

Stepper.displayName = 'Stepper';

export default Stepper;
